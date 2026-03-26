"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Zap, 
  Server, 
  Database, 
  ShieldCheck, 
  Activity, 
  Wifi, 
  Cpu, 
  HardDrive, 
  Clock, 
  Lock, 
  Terminal, 
  Search, 
  Filter, 
  RefreshCcw, 
  ArrowUpRight,
  Monitor,
  Cloud,
  Network
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { id: "NODE-DX-01", location: "Mumbai East (AWS)", status: "Active", load: 12, ping: "24ms", uptime: "99.99%" },
  { id: "NODE-DX-02", location: "Bangalore Cent (GCP)", status: "Active", load: 24, ping: "32ms", uptime: "99.98%" },
  { id: "NODE-DX-03", location: "Delhi North (Azure)", status: "Active", load: 8, ping: "45ms", uptime: "99.95%" },
  { id: "NODE-DX-04", location: "Singapore Edge", status: "Active", load: 45, ping: "12ms", uptime: "100%" },
];

const logs = [
  { time: "12:24:38", type: "INFO", message: "Node DX-01 sync completed successfully." },
  { time: "12:21:12", type: "SEC", message: "Blocked malicious IP attempt: 192.168.1.1" },
  { time: "12:15:00", type: "SYS", message: "Daily backup routine initiated. Progress: 100%" },
  { time: "12:10:45", type: "WARN", message: "Latency spike detected in Bangalore cluster (342ms)." },
  { time: "12:05:30", type: "AUTH", message: "SuperAdmin_RX session extended via token refresh." },
  { time: "12:00:00", type: "INFO", message: "Platform-wide KYC audit routine started." },
];

export default function NetworkStatusPage() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Real-time Health Monitor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Core Cluster", value: "Operational", sub: "Load: 12%", icon: Cloud, color: "text-primary" },
          { label: "Database Cluster", value: "Primary-A", sub: "Sync: 100%", icon: Database, color: "text-success" },
          { label: "Network Bandwidth", value: "1.2 GB/s", sub: "Uptime: 100%", icon: Zap, color: "text-warning" },
          { label: "API Latency", value: "24ms", sub: "P99 Response", icon: Activity, color: "text-primary" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-slate-900 border-2 border-white/5 shadow-2xl rounded-[2.5rem] group hover:border-primary/40 transition-all overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
               <CardContent className="p-8 relative z-10">
                  <div className={cn("h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 shadow-inner", stat.color)}>
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 italic">{stat.label}</p>
                  <h3 className={cn("text-2xl font-black tracking-tighter tabular-nums", stat.color.includes('primary') ? 'text-white' : stat.color.replace('text-', 'text-'))}>{stat.value}</h3>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mt-1 bg-white/5 inline-block px-2 py-0.5 rounded-md italic">{stat.sub}</p>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Node Matrix */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border-2 border-border/60 rounded-[3rem] shadow-sm overflow-hidden h-full">
               <CardHeader className="p-10 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
                        Node Matrix <Globe className="h-5 w-5 text-primary" />
                     </CardTitle>
                     <CardDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Real-time Global Data Clusters</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                     <Badge className="bg-primary/5 text-primary border-primary/20 font-black text-[9px] h-6 px-4 uppercase tracking-[0.2em]">Live Pulse Monitor</Badge>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 border-b border-border/40">
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Cluster Node</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Load Factor</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Activity</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                           {nodes.map((node, i) => (
                              <tr key={node.id} className="group hover:bg-slate-50/50 transition-colors">
                                 <td className="px-10 py-7">
                                    <div className="flex items-center gap-4">
                                       <div className="h-10 w-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                          <Server className="h-5 w-5" />
                                       </div>
                                       <div className="space-y-0.5">
                                          <h4 className="font-black text-slate-900 tracking-tight italic uppercase">{node.id}</h4>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{node.location}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-7">
                                    <div className="w-32 space-y-2">
                                       <div className="flex items-center justify-between text-[10px] font-black text-slate-400 italic uppercase">
                                          <span>Resource Load</span>
                                          <span className="text-slate-900">{node.load}%</span>
                                       </div>
                                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-border/40">
                                          <div 
                                             className={cn("h-full rounded-full transition-all duration-1000", node.load > 40 ? 'bg-warning' : 'bg-primary')} 
                                             style={{ width: `${node.load}%` }} 
                                          />
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-7">
                                    <div className="flex items-center gap-2">
                                       <div className="h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                       <span className="text-xs font-black uppercase italic tracking-widest text-slate-900">{node.status}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-7 text-right">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic leading-none">
                                       Ping: <span className="text-primary">{node.ping}</span><br />
                                       Uptime: <span className="text-success">{node.uptime}</span>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* System Console Log */}
         <div className="space-y-8">
            <Card className="bg-slate-900 rounded-[3rem] shadow-2xl border-2 border-white/5 overflow-hidden flex flex-col h-full">
               <CardHeader className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-2xl">
                        <Terminal className="h-4 w-4" />
                     </div>
                     <span className="text-sm font-black text-white uppercase tracking-widest italic">Node Console</span>
                  </div>
                  <Badge className="bg-success text-white border-0 font-black text-[9px] h-5 tabular-nums uppercase px-4 shadow-[0_0_10px_rgba(34,197,94,0.3)]">SECURE</Badge>
               </CardHeader>
               <CardContent className="p-8 bg-black/40 flex-1 overflow-auto custom-scrollbar font-mono text-[11px]">
                  <div className="space-y-6">
                     {logs.map((log, i) => (
                        <div key={i} className="flex gap-4 group">
                           <span className="text-slate-600 font-bold shrink-0">{log.time}</span>
                           <span className={cn("font-black px-1.5 rounded uppercase tracking-tighter shrink-0",
                              log.type === 'SEC' ? 'bg-destructive/20 text-destructive' :
                              log.type === 'INFO' ? 'bg-primary/20 text-primary' :
                              log.type === 'WARN' ? 'bg-warning/20 text-warning' :
                              'bg-slate-700 text-slate-300'
                           )}>
                              [{log.type}]
                           </span>
                           <span className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed tracking-tight">{log.message}</span>
                        </div>
                     ))}
                  </div>
               </CardContent>
               <div className="p-6 bg-black/20 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest italic px-8">
                  <span>Connection: Encrypted [AES-256]</span>
                  <div className="flex items-center gap-2">
                     <span className="h-2 w-2 rounded-full bg-primary" />
                     <span>Primary Node Active</span>
                  </div>
               </div>
            </Card>

            <Card className="bg-white border-2 border-border/60 rounded-[3rem] p-10 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-32 w-32 text-primary" />
               </div>
               <div className="relative z-10 space-y-6 text-center">
                  <div className="h-16 w-16 rounded-3xl bg-slate-50 border-2 border-border/40 flex items-center justify-center text-primary shadow-inner mx-auto mb-4">
                     <Network className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Cyber Control</h3>
                     <p className="text-xs text-slate-400 font-medium italic">Advanced firewall and node management settings for platform engineers.</p>
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-2 border-border/60 bg-white font-black uppercase text-[10px] tracking-widest shadow-sm">
                     Access Engineering Console
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
