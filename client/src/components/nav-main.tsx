import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import Link from react-router-dom

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const { state } = useSidebar();
  const location = useLocation(); // Get the current location

  return (
    <div className={state === "collapsed" ? "mx-auto" : ""}>
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                to={item.url}
                key={item.title}
                className={`flex items-center p-2 space-x-2 text-white rounded-lg ${
                  isActive ? "bg-[#0A0A0B]" : "hover:bg-[#614B14]"
                }`} // Apply active styles
              >
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-transparent"
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
