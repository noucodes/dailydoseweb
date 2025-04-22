// Page.tsx
import { profileColumns } from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/server";

interface User {
  id: string;
  email: string;
}

interface JoinedProfile {
  username: string;
  role: string;
  email: string;
}

async function getAllUserProfiles(): Promise<JoinedProfile[]> {
  const supabase = await createClient();

  // Fetch profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("username, role, email");

  if (error) {
    console.error("Error fetching profiles:", error.message);
    return [];
  }

  return profiles ?? [];
}

export default async function DemoPage() {
  const data = await getAllUserProfiles();

  return (
    <div className="container mx-auto pt-10">
      <DataTable columns={profileColumns} data={data} />
    </div>
  );
}
