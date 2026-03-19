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
  ChevronRight
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
                    pathname === "/dashboard/inquiries" ? "Customer Inquiries" : "";

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-background">
        {/* Dashboard Header */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-card/95 backdrop-blur-xl px-6 md:px-10 shadow-sm shadow-black/5">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <Input placeholder="Global search..." className="w-64 h-10 pl-9 bg-muted/50 border-0 focus-visible:ring-offset-0 focus-visible:ring-accent font-medium text-xs placeholder:text-muted-foreground/40 rounded-xl" />
            </div>
            
            <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted rounded-xl relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted rounded-xl">
                    <HelpCircle className="h-5 w-5" />
                 </Button>
            </div>
            <div className="h-6 w-px bg-border/80 hidden xs:block" />
            <Link href="/" className="hidden sm:block">
              <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold text-xs border-accent/20 text-accent hover:bg-accent/5">
                <ExternalLink className="h-3.5 w-3.5" /> Public View
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex flex-1 flex-col p-6 md:p-10 bg-muted/30 min-h-0">
          <div className="max-w-[1600px] mx-auto w-full space-y-8">
            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 bg-card border border-primary/5 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="h-9 w-9 rounded-xl bg-success/10 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-success" />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Verification Status</p>
                      <p className="text-sm font-bold text-foreground flex items-center gap-1.5">GST Verified <Badge className="bg-success text-white text-[8px] h-4 font-black px-1.5 border-0">ACTIVE</Badge></p>
                   </div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div className="flex items-center gap-3">
                   <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-accent" />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Account Privacy</p>
                      <p className="text-sm font-bold text-foreground">End-to-End Encrypted</p>
                   </div>
                </div>
                <Button className="ml-auto bg-primary text-primary-foreground text-[10px] font-black tracking-widest uppercase h-9 rounded-lg" size="sm">
                   <Plus className="h-4 w-4 mr-1.5" /> New Product
                </Button>
            </div>

            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
