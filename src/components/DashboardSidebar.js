"use client";

import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Settings,
  User,
  Plus,
  ArrowUpRight,
  HelpCircle,
  ShieldCheck,
  Building2,
  ChevronRight,
  LogOut,
  Sparkles,
  BarChart3,
  Briefcase,
  Star
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
    badge: "12",
  },
  {
    title: "Inquiries",
    url: "/dashboard/inquiries",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Briefcase,
    badge: "3",
  },
  {
    title: "Traffic",
    url: "/dashboard/traffic",
    icon: BarChart3,
  },
  {
    title: "Reviews",
    url: "/dashboard/reviews",
    icon: Star,
    badge: "4.8",
  },
];

const secondaryItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: HelpCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border bg-sidebar shadow-xl z-50 h-screen w-64 data-[state=collapsed]:w-[48px] shrink-0 transition-all duration-300">
      <SidebarHeader className="p-6 bg-sidebar">
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg shadow-xl shadow-accent/20 group-hover:scale-105 transition-transform duration-300 ring-2 ring-accent/10 shrink-0">
            H
          </div>
          <div className={`transition-all duration-300 ${state === "collapsed" ? "opacity-0 invisible w-0" : "opacity-100 visible"}`}>
            <span className="font-extrabold text-sidebar-foreground text-lg tracking-tight leading-none">Houspire</span>
            <p className="text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-widest mt-0.5">Vendor Hub</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 gap-6 bg-sidebar py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/30 px-2 font-bold uppercase tracking-widest text-[10px] mb-3">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`h-11 rounded-lg transition-all duration-200 ${isActive ? "bg-accent/10 border-accent/20 text-accent font-bold" : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 ${isActive ? "text-accent" : ""}`} strokeWidth={isActive ? 2.5 : 1.5} />
                        <span className="text-sm">{item.title}</span>
                        {item.badge && state !== "collapsed" && (
                          <SidebarMenuBadge className="bg-accent text-accent-foreground rounded-full h-5 min-w-5 shrink-0 ml-auto border-0 text-[10px] font-bold shadow-md shadow-accent/20">
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
           <div className={`px-2 py-6 rounded-2xl bg-gradient-to-br from-primary-foreground/5 to-transparent border border-sidebar-border/50 space-y-3 mb-4 transition-all duration-300 ${state === "collapsed" ? "opacity-0 h-0 p-0 overflow-hidden" : "opacity-100"}`}>
             <div className="flex items-start justify-between">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <Badge className="bg-success/20 text-success text-[8px] font-black tracking-widest px-1.5 h-4 border-0">PREMIUM</Badge>
             </div>
             <div className="space-y-1">
                <p className="text-white font-bold text-xs">Grow Your Reach</p>
                <p className="text-sidebar-foreground/50 text-[10px] leading-relaxed">Upgrade to showcase unlimited products.</p>
             </div>
             <Button size="sm" className="w-full bg-accent text-accent-foreground text-[10px] font-black h-8 rounded-lg shadow-lg shadow-accent/20">UPGRADE PLAN</Button>
           </div>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-sidebar-foreground/30 px-2 font-bold uppercase tracking-widest text-[10px] mb-3">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`h-11 rounded-lg transition-all duration-200 ${isActive ? "bg-sidebar-accent border-sidebar-border" : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" strokeWidth={1.5} />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border bg-sidebar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`w-full flex items-center justify-start p-2 h-14 rounded-xl hover:bg-sidebar-accent/50 transition-all ${state === "collapsed" ? "justify-center" : "gap-3"}`}>
              <div className="h-9 w-9 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold shadow-inner shrink-0">
                 AV
              </div>
              <div className={`text-left min-w-0 flex-1 transition-all duration-300 ${state === "collapsed" ? "opacity-0 invisible w-0" : "opacity-100 visible"}`}>
                <p className="text-xs font-black text-sidebar-foreground truncate uppercase tracking-tighter">Artisan Woodworks</p>
                <p className="text-[10px] text-sidebar-foreground/40 font-bold truncate">Premium Member</p>
              </div>
              {state !== "collapsed" && <ChevronRight className="h-4 w-4 text-sidebar-foreground/20 shrink-0" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 bg-sidebar border-sidebar-border shadow-2xl rounded-2xl animate-in slide-in-from-bottom-4">
            <div className="px-4 py-3 space-y-1">
               <p className="text-xs font-black text-sidebar-foreground uppercase tracking-widest opacity-30">Account ID: #84210</p>
            </div>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <Link href="/dashboard/settings?tab=account">
               <DropdownMenuItem className="p-3 text-sidebar-foreground/70 focus:bg-sidebar-accent focus:text-accent font-semibold text-sm rounded-lg gap-3 cursor-pointer">
                  <User className="h-4 w-4" /> Profile Details
               </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/settings?tab=business">
               <DropdownMenuItem className="p-3 text-sidebar-foreground/70 focus:bg-sidebar-accent focus:text-accent font-semibold text-sm rounded-lg gap-3 cursor-pointer">
                  <Building2 className="h-4 w-4" /> Business Verification
               </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <Link href="/">
               <DropdownMenuItem className="p-3 text-destructive focus:bg-destructive/10 focus:text-destructive font-semibold text-sm rounded-lg gap-3 cursor-pointer">
                  <LogOut className="h-4 w-4" /> Sign Out
               </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
