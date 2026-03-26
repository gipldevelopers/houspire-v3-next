"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  ChevronRight,
  ShieldAlert,
  Terminal,
  Cpu,
  UserCheck,
  Plus,
  FileDown,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const pageTitle = pathname === "/admin" ? "Command Center" : 
                    pathname === "/admin/vendors" ? "Vendor Registry" : 
                    pathname === "/admin/products" ? "Product Pool" :
                    pathname === "/admin/verifications" ? "Verification Queue" :
                    pathname === "/admin/leads" ? "Lead Monitor" :
                    pathname === "/admin/analytics" ? "Intelligence" : "";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-slate-50 text-slate-900 shadow-2xl overflow-hidden transition-[margin] duration-200 ease-linear md:peer-data-[state=expanded]:ml-64 md:peer-data-[state=collapsed]:ml-12">
        {/* Top Management Bar - COMPACT */}
        <header className="h-16 shrink-0 border-b border-border/40 bg-white/70 backdrop-blur-3xl flex items-center justify-between px-6 sticky top-0 z-[60]">
          <div className="flex items-center">
            <SidebarTrigger className="h-9 w-9 rounded-lg bg-white border border-border/60 text-slate-600 hover:text-primary hover:bg-slate-50 transition-all shadow-sm" />
            <div className="h-8 w-px bg-slate-200 hidden md:block mx-4" />
            <div className="flex flex-col overflow-hidden">
               <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 italic truncate">
                  Houspire Admin <ChevronRight className="h-2.5 w-2.5" /> {pageTitle}
               </div>
               <div className="flex items-center gap-2">
                  <h1 className="text-base font-black text-slate-900 tracking-tighter leading-none">{pageTitle}</h1>
                  <Badge className="bg-primary/10 text-primary border-0 font-black text-[8px] h-3.5 rounded-full px-1.5">LIVE</Badge>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2.5 bg-slate-100/80 border border-border/40 rounded-xl px-3 h-9 w-64 group focus-within:border-primary/50 transition-all shadow-inner">
               <Search className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
               <Input 
                 placeholder="Quick search..." 
                 className="bg-transparent border-0 h-full text-[10px] text-slate-900 focus-visible:ring-0 placeholder:text-slate-400 font-bold"
               />
               <kbd className="h-5 px-1 rounded bg-white text-[8px] font-black text-slate-400 border border-border/60 shadow-sm uppercase tracking-tighter shrink-0 ring-1 ring-slate-200/50">⌘K</kbd>
            </div>

            <div className="flex items-center gap-2 border-r border-border/40 pr-4">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 font-black shadow-sm ring-1 ring-slate-200/50">
                        <Plus className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/60 p-2 shadow-2xl">
                     <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 p-2 italic tracking-widest">Administrative Actions</DropdownMenuLabel>
                     <DropdownMenuItem 
                      className="rounded-lg h-9 gap-2 group cursor-pointer" 
                      onClick={() => {
                        toast.success("Opening New Vendor Registry Module...");
                        router.push("/admin/add-item?tab=vendor");
                      }}
                     >
                        <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-700">Add New Vendor</span>
                     </DropdownMenuItem>
                     <DropdownMenuItem className="rounded-lg h-9 gap-2 group cursor-pointer" onClick={() => toast.success("Generating Global Data Export Bundle...")}>
                        <FileDown className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-700">Export Global Pool</span>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="rounded-lg h-9 gap-2 group cursor-pointer" onClick={() => toast.promise(new Promise(r => setTimeout(r, 1000)), { loading: 'Syncing Cluster...', success: 'Registry Hub Synced Successfully', error: 'Sync Error'})}>
                        <RefreshCw className="h-4 w-4 text-success group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-xs font-bold text-slate-700">Refresh Registry</span>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>

               <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 relative shadow-sm ring-1 ring-slate-200/50"
                onClick={() => toast.info("No unread encrypted transmissions.")}
               >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-destructive rounded-full border border-white animate-pulse" />
               </Button>
            </div>

            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
               <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-[10px] font-black text-slate-900 leading-none mb-0.5">SuperAdmin_RX</span>
                  <span className="text-[8px] font-black text-success uppercase tracking-widest leading-none opacity-80">Security Level: 0</span>
               </div>
               <div className="h-9 w-9 rounded-xl bg-white border border-border/60 flex items-center justify-center shadow-sm group-hover:border-primary/50 transition-all p-[1.5px] ring-1 ring-slate-200/50">
                  <div className="h-full w-full rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                     <UserCheck className="h-5 w-5 text-primary opacity-80" />
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* System Bar (Internal Stats) - COMPACT */}
        <div className="bg-white border-b border-border/40 px-6 py-1.5 flex items-center justify-between overflow-hidden shadow-sm z-40">
           <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">
                 <Cpu className="h-2.5 w-2.5 text-primary/40" /> Cluster: <span className="text-slate-700">Active (34%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap lg:border-l border-border/40 lg:pl-4">
                 <Terminal className="h-2.5 w-2.5 text-success/60" /> Query: <span className="text-success tracking-widest font-black">GET /V1/ANALYTICS</span>
              </div>
           </div>
           <div className="flex items-center gap-3 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
              <span className="h-1 w-1 rounded-full bg-success animate-pulse" /> UPTIME: 14:32:01.002
           </div>
        </div>

        {/* Main Content Area - MINIMIZED PADDING */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
