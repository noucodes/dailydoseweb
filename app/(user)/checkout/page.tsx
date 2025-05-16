// app/checkout/page.tsx
import { createClient } from "@/utils/supabase/server";
import CheckoutPage from "@/components/user/checkout";
import { redirect } from "next/navigation";

export default async function CheckoutPageWrapper() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, email, phone")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error("Profile not found");
  }

  return <CheckoutPage profile={profile} />;
}
