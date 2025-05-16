"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const addItemAction = async (formData: FormData) => {
  const supabase = await createClient();

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const category = formData.get("category")?.toString();
  const imageFile = formData.get("image") as File;

  if (!name || isNaN(price) || isNaN(stock)) {
    return encodedRedirect("error", "/admin", "Invalid item data.");
  }

  let imageUrl = "";

  if (imageFile && imageFile.size > 0) {
    const fileName = `public/${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("menu") // make sure this bucket exists
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Image upload error:", error.message);
      return encodedRedirect("error", "/admin", "Image upload failed.");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("menu").getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { error: insertError } = await supabase.from("items").insert([
    {
      name,
      description,
      price,
      stock,
      category,
      image: imageUrl,
    },
  ]);

  if (insertError) {
    console.error("Insert item failed:", insertError.message);
    return encodedRedirect("error", "/admin/stocks", "Failed to add item.");
  }

  return encodedRedirect("success", "/admin", "Item added successfully!");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const phone = formData.get("phone")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/signup",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        username,
        phone,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/signup", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/signup",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/signin", error.message);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", user?.id)
    .single();

  if (profile?.role === "admin") {
    return redirect("/admin"); // Or "/admin-menu" if you want different routes
  } else {
    return redirect("/menu"); // Change as needed for other roles
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/signin");
};

export const deleteItem = async (itemId: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from("items").delete().eq("id", itemId);

  if (error) {
    console.error("Error deleting item:", error.message);
  } else {
    console.log("Item deleted successfully");
    // Optionally, you may want to refetch the items or update state to reflect the change
  }
};

export async function updateItem(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const stock = parseInt(formData.get("stock") as string);
  const file = formData.get("image") as File;

  // Optional: Handle image upload to Supabase Storage if the file is a new upload
  let imageUrl = null;

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const filePath = `menu/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("menu")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return;
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu/${filePath}`;
  }

  const { data, error } = await supabase
    .from("items") // make sure this is your correct table name
    .update({
      name,
      description,
      price,
      category,
      stock,
      ...(imageUrl && { image: imageUrl }), // only update image if it was uploaded
    })
    .eq("id", id);

  if (error) {
    console.error("Update failed:", error.message);
  }

  return redirect("/admin/stocks");
}

export const saveOrderAction = async ({
  formData,
  cart,
  subtotal,
  shipping,
  tax,
  total,
}: {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  cart: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) => {
  const supabase = await createClient();

  // Generate a unique order code (e.g., timestamp + random string)
  const orderCode = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Insert into orders table
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        order_code: orderCode,
        user_name: formData.name,
        status: "pending", // default status
        total_price: total,
      },
    ])
    .select()
    .single();

  if (orderError || !orderData) {
    console.error("Order insert error:", orderError?.message);
    return { success: false, message: "Failed to save order." };
  }

  type Item = {
    id: string;
    stock: number;
    quantity: number;
  };
  for (const item of cart) {
    // Get current stock
    const { data: itemData, error: fetchError } = await supabase
      .from("items")
      .select("stock")
      .eq("id", item.id)
      .single();

    console.log("To Update:", itemData);

    if (fetchError || !itemData) {
      console.error(
        `Failed to fetch stock for item ${item.name}:`,
        fetchError?.message
      );
      continue;
    }

    const newStock = itemData.stock - item.quantity;
    console.log("newStock: ", newStock);

    // Update stock
    const { data: itemUpdate, error: updateError } = await supabase
      .from("items")
      .update({ stock: newStock })
      .eq("id", item.id) // assuming item.id is a string UUID
      .select(); // ensures we see updated data

    if (updateError) {
      console.error(
        `Failed to update stock for item ID ${item.id}:`,
        updateError.message
      );
    } else if (!itemUpdate || itemUpdate.length === 0) {
      console.warn(`No item found with ID ${item.id}. No rows updated.`);
    } else {
      console.log(`Stock updated for item ID ${item.id}:`, itemUpdate[0]);
    }
    if (itemUpdate?.length === 0) {
      console.warn(`RLS may be blocking the update. No rows returned.`);
    }
  }

  // Prepare order_items
  const orderItems = cart.map((item) => ({
    order_id: orderData.id,
    item_id: item.id,
    item_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  // Insert into order_items table
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Order items insert error:", itemsError.message);
    return { success: false, message: "Failed to save order items." };
  }

  return { success: true, message: "Order placed successfully!" };
};
