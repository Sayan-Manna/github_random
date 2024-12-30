import * as React from "react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

// This is sample data.
const data = {
  user: {
    name: "Sayan",
    email: "sayan@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Ticket Status",
      url: "/ticket",
      icon: Bot,
    },
    {
      title: "Service Desk",
      url: "/service",
      icon: BookOpen,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const [sidebarWidth, setSidebarWidth] = useState<string>("");
  useEffect(() => {
    if (state === "collapsed") {
      setSidebarWidth("5rem");
    } else {
      setSidebarWidth("");
    }
  }, [state]);
  return (
    <>
      <Sidebar
        collapsible="icon"
        {...props}
        style={{
          width: sidebarWidth,
        }}
      >
        {state === "expanded" && <SidebarRail />}
        <SidebarHeader>
          {state === "collapsed" ? (
            <img
              src="../../../pda.png"
              alt=""
              className="h-12 w-12 mt-5 object-cover mx-auto"
            />
          ) : (
            <img
              src="../../../pda.png"
              alt=""
              className="h-32 w-32 mt-5 object-cover mx-auto"
              loading="lazy"
            />
          )}
        </SidebarHeader>
        <SidebarContent>
          {/* {data.navMain.map((item) => (
          <Link
            to={item.url}
            key={item.title}
            className="flex items-center p-2 space-x-2 text-white hover:bg-gray-800"
          >
            <item.icon />
            {collapsible === "icon" && <span>{item.title}</span>}
          </Link>
        ))} */}
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
