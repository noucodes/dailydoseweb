"use client"; // 💥 Required since you're using hooks & client-only components

import { useEffect, useState } from "react";
import { Products, columns } from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/client"; // ✅ Client-side Supabase

export default function Page() {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("items").select("*");
      if (error) {
        console.error("Failed to fetch items:", error.message);
      } else {
        setData(data || []);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  const totalStock = data.reduce((sum, item) => sum + (item.stock || 0), 0);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto pt-10">
      <div className="total-items font-bold text-xl px-4">
        Stock Left: {totalStock}
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
