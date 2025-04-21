// components/sidebar/SidebarWrapper.tsx (a Server Component)
import { createClient } from "@/utils/supabase/server";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default async function SidebarWrapper() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", user?.id)
    .single();

  const sidebarData = {
    user: {
      name: profile?.username ?? "Guest",
      email: user?.email ?? "unknown@example.com",
      avatar: "/avatars/shadcn.jpg",
      role: profile?.role ?? "user",
    },
    navMain:
      (profile?.role ?? "user") === "admin"
        ? [
            {
              title: "Users",
              url: "/menu",
              icon: "Users",
            },
            {
              title: "Orders",
              url: "/checkout",
              icon: "ListChecks",
            },
            {
              title: "Stock",
              url: "/checkout",
              icon: "Archive",
            },
          ]
        : [
            {
              title: "Menu",
              url: "/menu",
              icon: "SquareMenu",
            },
            {
              title: "Orders",
              url: "/checkout",
              icon: "Logs",
            },
          ],
  };

  return <AppSidebar data={sidebarData} variant="inset" />;
}
