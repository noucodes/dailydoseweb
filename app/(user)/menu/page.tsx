import Menu from "@/components/user/menu";
import { createClient } from "@/utils/supabase/server";

export default async function MenuPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase.from("items").select("*");

  return <Menu products={products ?? []} />;
}
