import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/server";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const supabase = await createClient();
  const { data: products, error } = await supabase.from("items").select("*");
  return products ?? [];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto pt-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
