"use client";

import { 
  LayoutDashboard, 
  Users, 
  Box, 
  MessageSquare, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Zap,
  Lock,
  Flag,
  Globe,
  Terminal,
  Activity
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const menuItems = [
  { group: "Platform", items: [
    { title: "Command Center", icon: LayoutDashboard, url: "/admin" },
    { title: "Vendor Registry", icon: Users, url: "/admin/vendors", badge: "12" },
    { title: "Product Pool", icon: Box, url: "/admin/products", badge: "45" },
  ]},
  { group: "Governance", items: [
    { title: "Verification Queue", icon: ShieldCheck, url: "/admin/verifications", badge: "3" },
    { title: "Leads & Inquiries", icon: MessageSquare, url: "/admin/leads" },
    { title: "Compliance", icon: Flag, url: "/admin/compliance" },
  ]},
  { group: "Intelligence", items: [
    { title: "Global Analytics", icon: BarChart3, url: "/admin/analytics" },
    { title: "Network Status", icon: Globe, url: "/admin/network" },
  ]},
  { group: "System", items: [
    { title: "Admin Settings", icon: Settings, url: "/admin/settings" },
    { title: "System Logs", icon: Terminal, url: "/admin/logs" },
  ]}
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-[#0A0C10] text-slate-300 border-r border-white/5 shadow-2xl">
      <SidebarHeader className="h-16 flex items-center px-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform shrink-0">
            <Lock className="h-4 w-4 text-white" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-[11px] font-black text-white tracking-[0.2em] uppercase italic leading-none mb-1">Houspire</h2>
            <p className="text-[9px] text-primary font-black uppercase tracking-tighter leading-none">Admin Terminal</p>
          </div>
        </div>
      </SidebarHeader>

      <div className="px-5 py-3 border-b border-white/5">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            placeholder="Quick Cmd..." 
            className="w-full h-8 pl-8 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <SidebarContent className="px-4 py-6 custom-scrollbar">
        {menuItems.map((group) => {
          const filteredItems = group.items.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          if (filteredItems.length === 0) return null;

          return (
            <SidebarGroup key={group.group} className="mb-6">
              <SidebarGroupLabel className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={cn(
                          "h-12 px-4 rounded-xl transition-all group relative overflow-hidden",
                          pathname === item.url 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : "hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Link href={item.url} onClick={() => isMobile && setOpenMobile(false)}>
                          <item.icon className={cn(
                            "h-5 w-5 mr-3 transition-colors",
                            pathname === item.url ? "text-primary" : "text-slate-500 group-hover:text-slate-300"
                          )} />
                          <span className="font-bold text-xs tracking-tight">{item.title}</span>
                          {item.badge && (
                            <Badge className="ml-auto bg-primary/20 text-primary border-0 font-black text-[9px] h-5 min-w-[20px] rounded-full flex items-center justify-center">
                              {item.badge}
                            </Badge>
                          )}
                          {pathname === item.url && (
                            <motion.div 
                              layoutId="active"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/5 space-y-4 bg-[#080A0D]">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5">
           <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                 <Zap className="h-4 w-4 text-orange-500" />
              </div>
              <p className="text-[10px] font-black uppercase text-white tracking-widest leading-tight">Server Load: 12%</p>
           </div>
           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[12%] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
           </div>
        </div>

        <Link href="/admin/login" className="w-full">
          <Button variant="ghost" className="w-full justify-start h-12 rounded-xl text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all gap-3 px-4">
            <LogOut className="h-5 w-5" />
            <span className="font-black text-xs uppercase tracking-widest">Terminate Session</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
