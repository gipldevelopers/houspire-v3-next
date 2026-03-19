"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  ShieldCheck, 
  Lock,
  ExternalLink,
  ChevronRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = pathname === "/dashboard" ? "Overview" : 
                    pathname === "/dashboard/products" ? "Products Pool" : 
                    pathname === "/dashboard/inquiries" ? "Customer Inquiries" :
                    pathname === "/dashboard/settings" ? "Settings" : 
                    pathname === "/dashboard/products/add" ? "Add New Product" :
                    pathname === "/dashboard/support" ? "Support Center" : "";

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="overflow-hidden bg-background md:rounded-l-3xl shadow-2xl z-10">
        {/* Header */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b bg-card/95 backdrop-blur-xl px-6 md:px-10 z-50">
          <div className="flex items-center gap-6">
            <SidebarTrigger className="h-10 w-10 text-muted-foreground hover:bg-muted rounded-xl border border-border" />
            <div className="h-8 w-px bg-border/80 hidden md:block" />
            <div className="flex flex-col">
               <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none mb-1">
                 Vendor Central <ChevronRight className="h-2.5 w-2.5" /> {pageTitle}
               </div>
               <h1 className="text-xl font-black text-foreground tracking-tight leading-none">{pageTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Global search..." className="w-64 h-10 pl-9 bg-muted/50 border-0 rounded-xl text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="hidden sm:block">
              <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold text-xs border-accent/20 text-accent hover:bg-accent/5">
                <ExternalLink className="h-3.5 w-3.5" /> Public View
              </Button>
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 bg-card/60 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-2xl bg-success/10 flex items-center justify-center border border-success/10">
                      <ShieldCheck className="h-6 w-6 text-success" />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest leading-none">Status</p>
                      <p className="text-sm font-bold text-foreground flex items-center gap-1.5 whitespace-nowrap">GST Verified <Badge className="bg-success text-white text-[9px] h-4 font-black px-1.5 border-0">ACTIVE</Badge></p>
                   </div>
                </div>
                <div className="h-8 w-px bg-border/50 hidden sm:block" />
                <div className="flex items-center gap-3 flex-1">
                   <div className="h-10 w-10 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/10">
                      <Lock className="h-6 w-6 text-accent" />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest leading-none">Security</p>
                      <p className="text-sm font-bold text-foreground whitespace-nowrap">End-to-End Encrypted</p>
                   </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] font-black tracking-widest uppercase h-10 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 ml-auto" size="sm">
                   <Plus className="h-4 w-4 mr-2" /> New Product
                </Button>
            </div>

            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
