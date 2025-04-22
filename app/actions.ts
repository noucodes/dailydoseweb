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
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data:{
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
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/signin", error.message);
  }

  return redirect("/menu");
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
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
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
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/signin");
};

export const deleteItem = async(itemId: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from("items").delete().eq("id", itemId); // Use the item ID to delete it

  if (error) {
    console.error("Error deleting item:", error.message);
  } else {
    console.log("Item deleted successfully");
    // Optionally, you may want to refetch the items or update state to reflect the change
  }
}

export async function updateItem(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const category = formData.get('category') as string
  const stock = parseInt(formData.get('stock') as string)
  const file = formData.get('image') as File

  // Optional: Handle image upload to Supabase Storage if the file is a new upload
  let imageUrl = null

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const filePath = `menu/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('menu')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError.message)
      return
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu/${filePath}`
  }

  const { data, error } = await supabase
    .from('items') // make sure this is your correct table name
    .update({
      name,
      description,
      price,
      category,
      stock,
      ...(imageUrl && { image: imageUrl }) // only update image if it was uploaded
    })
    .eq('id', id)

  if (error) {
    console.error('Update failed:', error.message)
  }

  return redirect("/signin");
}