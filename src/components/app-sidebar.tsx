"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Brain, 
  Users,
  Building2,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Tasks", icon: CheckSquare, href: "/tasks" },
  { title: "Calendar", icon: Calendar, href: "/calendar" },
  { title: "Memory", icon: Brain, href: "/memory" },
  { title: "Team", icon: Users, href: "/team" },
  { title: "Office", icon: Building2, href: "/office" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-zinc-800 bg-zinc-950">
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">Mission Control</h1>
            <p className="text-xs text-zinc-500">AI Command Center</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-zinc-500 px-2 py-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full rounded-lg px-3 py-2.5 transition-all duration-200
                        ${isActive 
                          ? "bg-zinc-800 text-zinc-100" 
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                        }
                      `}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={`h-4 w-4 ${isActive ? "text-violet-400" : ""}`} />
                        <span className="font-medium">{item.title}</span>
                        {isActive && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-zinc-700">
            <AvatarFallback className="bg-zinc-800 text-sm font-semibold text-violet-400">
              R
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-100 truncate">Ron</p>
            <p className="text-xs text-zinc-500 truncate">Main Agent • Active</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
