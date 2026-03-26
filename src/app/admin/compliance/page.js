"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldX, 
  Flag, 
  AlertTriangle, 
  Fingerprint, 
  Lock, 
  Eye, 
  Trash2, 
  Clock, 
  Zap, 
  FileWarning, 
  UserMinus, 
  AlertCircle,
  Activity,
  ChevronRight,
  ShieldIcon
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
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const reports = [
  { id: "REP-9901", target: "Cheap Wood Pro", type: "Vendor", reason: "Deceptive Pricing", severity: "Critical", reporter: "Rajesh S.", date: "2m ago" },
  { id: "REP-8802", target: "Velvet Sofa XL", type: "Product", reason: "Duplicate Listing", severity: "Low", reporter: "System Sync", date: "15m ago" },
  { id: "REP-7703", target: "Houspire Logistics", type: "Review", reason: "Harassment", severity: "Medium", reporter: "Animesh P.", date: "1h ago" },
  { id: "REP-6604", target: "Luxe Stone Tiles", type: "Product", reason: "Inaccurate Category", severity: "Low", reporter: "Sonia V.", date: "3h ago" },
  { id: "REP-5505", target: "Stonecraft India", type: "Vendor", reason: "Expired GSTIN", severity: "Critical", reporter: "Platform Bot", date: "5h ago" },
];

const stats = [
  { label: "Critical Flags", value: "12", icon: ShieldAlert, color: "text-destructive" },
  { label: "Pending Reports", value: "24", icon: Flag, color: "text-warning" },
  { label: "Automated Checks", value: "45k", icon: Activity, color: "text-success" },
  { label: "System Health", value: "Optimal", icon: ShieldCheck, color: "text-primary" },
];

export default function ComplianceGovernancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(r => 
    r.target.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-3xl group hover:border-primary/40 transition-all">
               <CardContent className="p-8">
                <div className={cn("h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-border/40 mb-6", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            <Card className="bg-white border-2 border-border/60 rounded-[3rem] shadow-sm overflow-hidden">
               <CardHeader className="p-10 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter italic uppercase">
                        Compliance Control <ShieldIcon className="h-5 w-5 text-destructive" />
                     </CardTitle>
                     <CardDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">Governance Hub for Ecosystem Integrity</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                           placeholder="Filter by target or reason..." 
                           className="h-12 pl-12 bg-slate-50 border-border/60 rounded-2xl text-xs font-bold focus-visible:ring-primary shadow-inner"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                     <Button variant="outline" className="h-12 w-12 rounded-2xl border-2 border-border/60 bg-white p-0 shrink-0">
                        <Filter className="h-4 w-4 text-slate-400" />
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 border-b border-border/40">
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Moderation Target</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Severity</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Incident Code</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Action matrix</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                           <AnimatePresence>
                              {filteredReports.map((report, i) => (
                                 <motion.tr 
                                    key={report.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                 >
                                    <td className="px-10 py-7">
                                       <div className="flex items-center gap-4">
                                          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs border border-transparent transition-all",
                                             report.type === 'Vendor' ? 'bg-primary/5 text-primary' :
                                             report.type === 'Product' ? 'bg-orange-500/5 text-orange-500' :
                                             'bg-teal-500/5 text-teal-500'
                                          )}>
                                             {report.type === 'Vendor' ? <Lock className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                                          </div>
                                          <div className="space-y-0.5">
                                             <h4 className="font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight italic uppercase">{report.target}</h4>
                                             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                                Reason: <span className={cn(report.severity === 'Critical' ? 'text-destructive' : 'text-slate-500')}>{report.reason}</span>
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-10 py-7">
                                       <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 h-6 border-0 shadow-sm",
                                          report.severity === 'Critical' ? 'bg-destructive text-white shadow-destructive/10' :
                                          report.severity === 'Medium' ? 'bg-orange-500 text-white shadow-orange-500/10' :
                                          'bg-slate-200 text-slate-500'
                                       )}>
                                          {report.severity}
                                       </Badge>
                                    </td>
                                    <td className="px-10 py-7">
                                       <div className="space-y-0.5">
                                          <p className="text-xs font-black text-slate-900 tabular-nums uppercase">{report.id}</p>
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{report.date} · via {report.reporter}</p>
                                       </div>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                       <div className="flex items-center justify-end gap-2">
                                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100">
                                             <Eye className="h-4 w-4" />
                                          </Button>
                                          <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-border/40 transition-all">
                                                   <MoreVertical className="h-4 w-4" />
                                                </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 border-border/40 shadow-xl">
                                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3">
                                                   <ShieldCheck className="h-4 w-4 text-success" /> Mark as Resolved
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 text-warning hover:bg-warning/5">
                                                   <FileWarning className="h-4 w-4" /> Issue Formal Warning
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 text-destructive hover:bg-destructive/5">
                                                   <UserMinus className="h-4 w-4" /> Suspend Account
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-bold text-sm flex items-center gap-3 text-destructive hover:bg-destructive/5">
                                                   <ShieldX className="h-4 w-4" /> Terminate Listing
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
               </CardContent>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               <div className="relative z-10 space-y-6 text-center lg:text-left">
                  <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner mx-auto lg:mx-0">
                     <Fingerprint className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black text-white uppercase tracking-widest italic">Node Integrity</h3>
                     <p className="text-slate-400 text-sm font-medium italic">All verification clusters are operational. Automated scanning has flagged <span className="text-primary font-black">243 potential duplicates</span> today.</p>
                  </div>
                  <Button className="w-full lg:w-fit h-12 rounded-2xl bg-white text-slate-900 font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all px-8">
                     Node Health Monitor
                  </Button>
               </div>
            </Card>

            <Card className="bg-white border-2 border-border/60 rounded-[3rem] p-10 shadow-sm space-y-8">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Ecosystem Safety</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Moderator Productivity Index</p>
               </div>
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 border border-border/40 rounded-2xl">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clearance Rate</p>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums">94%</h4>
                     </div>
                     <div className="p-4 bg-slate-50 border border-border/40 rounded-2xl">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums">42m</h4>
                     </div>
                  </div>
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-3">
                     <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <span className="text-xs font-black text-primary uppercase tracking-widest">Incident Alert</span>
                     </div>
                     <p className="text-[11px] text-slate-600 font-bold leading-relaxed italic">High volume of reports coming from "Modular Hardware" segment in the last hour.</p>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
