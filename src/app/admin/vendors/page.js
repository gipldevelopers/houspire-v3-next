"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert, 
  UserX, 
  Mail, 
  Phone,
  Building2,
  Calendar,
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  Plus,
  AlertTriangle,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

const vendors = [
  { id: "VND-8821", name: "Vogue Interiors", owner: "Rajesh Kumar", email: "info@vogue.com", category: "Full Home Decor", status: "Verified", risk: "Low", joined: "12 Mar 2024", products: 124, projects: 12 },
  { id: "VND-9922", name: "Stonecraft India", owner: "Amit Shah", email: "amit@stonecraft.in", category: "Flooring & Tiles", status: "Pending", risk: "Medium", joined: "18 Mar 2024", products: 45, projects: 4 },
  { id: "VND-4433", name: "Cheap Wood Pro", owner: "Suresh Gupta", email: "gupta@cheapwood.com", category: "Furniture", status: "Rejected", risk: "High", joined: "15 Mar 2024", products: 0, projects: 0 },
  { id: "VND-1102", name: "Luxe Lightings", owner: "Sonia Verma", email: "hello@luxelights.com", category: "Electricals", status: "Verified", risk: "Low", joined: "05 Jan 2024", products: 567, projects: 45 },
  { id: "VND-7788", name: "Green Space Landscaping", owner: "Vikram Singh", email: "vikram@greenspace.com", category: "Outdoor", status: "Verified", risk: "Low", joined: "22 Feb 2024", products: 32, projects: 8 },
  { id: "VND-2211", name: "Modular Hub", owner: "Priyanka Roy", email: "p.roy@modularhub.in", category: "Kitchen Hardware", status: "Pending", risk: "Low", joined: "19 Mar 2024", products: 89, projects: 2 },
];

const stats = [
  { label: "Active Vendors", value: "1,248", change: "+14.2%", icon: Users, color: "text-primary" },
  { label: "Compliance Rate", value: "98.4%", change: "+0.5%", icon: ShieldCheck, color: "text-success" },
  { label: "Pending KYC", value: "42", change: "-8%", icon: Clock, color: "text-warning" },
  { label: "Banned Registry", value: "12", change: "+2", icon: UserX, color: "text-destructive" },
];

export default function VendorRegistryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [localVendors, setLocalVendors] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("houspire_vendors");
      return saved ? [...JSON.parse(saved), ...vendors] : vendors;
    }
    return vendors;
  });

  const handleDelete = (id) => {
    const updated = localVendors.filter(v => v.id !== id);
    setLocalVendors(updated);
    if (typeof window !== "undefined") {
      const onlyAdded = updated.filter(u => !vendors.some(v => v.id === u.id));
      localStorage.setItem("houspire_vendors", JSON.stringify(onlyAdded));
    }
    toast.error("Cluster Purged", {
      description: `Entity ${id} has been terminated from the primary registry.`
    });
  };

  const filteredVendors = localVendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-2xl group hover:border-primary/40 transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-border/40", stat.color)}>
                    <stat.icon className="h-4.5 w-4.5" />
                  </div>
                  <Badge className={cn("bg-slate-50 border-0 font-black text-[9px] uppercase tracking-widest px-2 h-5", 
                    stat.change.includes('+') ? 'text-success' : 'text-destructive'
                  )}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-0.5 leading-none">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Registry Table */}
      <Card className="bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden">
        <CardHeader className="p-8 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-0.5">
            <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2.5 tracking-tighter uppercase italic">
              Registry Base <Users className="h-4 w-4 text-primary" />
            </CardTitle>
            <CardDescription className="text-slate-400 text-[10px] font-medium italic">Administrative control of platform business entities.</CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Fast Search..." 
                className="pl-9 h-10 bg-slate-50 border-border/60 rounded-xl text-xs focus-visible:ring-primary shadow-inner font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-10 px-4 rounded-xl border-border/60 font-black text-[9px] uppercase tracking-widest bg-white shadow-sm flex items-center gap-2" onClick={() => toast.info("Initializing registry filter protocols...")}>
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
            <Button className="h-10 px-5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 font-black text-[9px] uppercase tracking-widest shadow-sm flex items-center gap-2" onClick={() => toast.success("Compiling Global Vendor DB ...")}>
              <Download className="h-3.5 w-3.5" /> Export DB
            </Button>
            <Link href="/admin/add-item?tab=vendor">
              <Button className="h-10 px-5 rounded-xl bg-primary text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                <Plus className="h-3.5 w-3.5" /> Add Vendor
              </Button>
            </Link>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-border/40">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Business Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Network Entry</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-center">Portfolio</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Risk</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <AnimatePresence>
                  {filteredVendors.map((vendor, index) => (
                    <motion.tr 
                      key={vendor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 border border-border/40 flex items-center justify-center font-black text-xs text-slate-500 overflow-hidden shrink-0">
                             {vendor.name.charAt(0)}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-xs text-slate-900 group-hover:text-primary transition-colors flex items-center gap-1.5 tracking-tight leading-none">
                              {vendor.name}
                              {vendor.status === "Verified" && <CheckCircle2 className="h-3 w-3 text-success fill-success/10" />}
                            </h4>
                            <div className="flex flex-col text-[8px] text-slate-400 font-black uppercase tracking-tighter leading-none">
                               <span>ID: <span className="text-primary">{vendor.id}</span></span>
                               <span>Owner: {vendor.owner}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 h-6 border-0",
                          vendor.status === 'Verified' ? 'bg-success/10 text-success' :
                          vendor.status === 'Pending' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        )}>
                          {vendor.status}
                        </Badge>
                      </td>
                      <td className="px-10 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 tracking-tight">
                            <Calendar className="h-3 w-3 text-slate-400" /> {vendor.joined}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 italic">
                             {vendor.category}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div className="flex flex-col items-center">
                           <span className="text-sm font-black text-slate-900 tabular-nums">{vendor.products}</span>
                           <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Products</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2">
                           <div className={cn("h-2 w-2 rounded-full", 
                             vendor.risk === 'Low' ? 'bg-success' : 
                             vendor.risk === 'Medium' ? 'bg-warning' : 'bg-destructive'
                           )} />
                           <span className="text-xs font-black uppercase tracking-widest italic">{vendor.risk}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 border border-transparent hover:border-border/40 transition-all">
                             <ExternalLink className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-border/40 transition-all">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-border/40 shadow-xl overflow-hidden">
                              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 cursor-pointer" onClick={() => toast.success(`Verifying Identity for ${vendor.name}...`)}>
                                <ShieldCheck className="h-4 w-4 text-primary" /> Verify Identity
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 cursor-pointer" onClick={() => toast.info(`Initializing secure channel to ${vendor.email}...`)}>
                                <Mail className="h-4 w-4" /> Contact Owner
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 cursor-pointer" onClick={() => toast.info(`Auditing subscription tier for ${vendor.name}...`)}>
                                <Building2 className="h-4 w-4" /> View Subscriptions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 text-destructive hover:bg-destructive/5 hover:text-destructive transition-colors cursor-pointer" onClick={() => handleDelete(vendor.id)}>
                                <UserX className="h-4 w-4" /> Terminate Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-border/40 bg-slate-50/30 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 italic">Showing {filteredVendors.length} in primary registry cluster.</p>
              <div className="flex items-center gap-1.5">
                 {[1, 2, 3].map(p => (
                   <Button key={p} variant={p === 1 ? "default" : "outline"} className={cn("h-8 w-8 rounded-lg font-black text-[10px]", p === 1 ? "shadow-lg shadow-primary/20" : "border-border/40")}>{p}</Button>
                 ))}
                 <Button variant="outline" className="h-8 px-3 rounded-lg border-border/40 flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 ml-1">Next <ChevronRight className="h-3 w-3" /></Button>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
