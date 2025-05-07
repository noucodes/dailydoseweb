"use client"; // 💥 Required since you're using hooks & client-only components

import { useEffect, useState } from "react";
import { Products, columns } from "./columns";
import { DataTable } from "./data-table";
import { RecentTable } from "./recent-table";
import { createClient } from "@/utils/supabase/client"; // ✅ Client-side Supabase

export default function Page() {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });
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
  const recentItems = data.slice(0, 5);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto pt-10">
      <div className="total-items font-bold text-xl px-4">
        Stock Left: {totalStock}
      </div>
      <DataTable columns={columns} data={data} />
      <div>
        <h2 className="text-xl font-semibold mb-2">Recently Added</h2>
        <RecentTable columns={columns} data={recentItems} />
      </div>
    </div>
  );
}
