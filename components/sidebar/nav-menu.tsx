import React from "react";
import { ChevronRight, Logs, SquareMenu, Coffee } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import TotalItems from "../total-items";

// Define the icons you'll use here
const iconMap: Record<string, React.ElementType> = {
  Logs,
  SquareMenu,
  Coffee,
  ChevronRight,
};

type SidebarLinkProps = {
  title: string;
  url: string;
  icon: string;
};

export function SidebarLink({ title, url, icon }: SidebarLinkProps) {
  const Icon = iconMap[icon] || ChevronRight;
  const isOrders = title === "Orders";

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton tooltip={title} asChild>
        <a href={url} className="font-medium flex items-center gap-2">
          <Icon className="size-4" />
          <span>{title}</span>

          {isOrders && <TotalItems />}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
