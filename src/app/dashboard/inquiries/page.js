"use client";

import { 
  Search, 
  MessageSquare, 
  MoreVertical, 
  Mail, 
  Phone, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { recentInquiries } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function DashboardInquiriesPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
           <h2 className="text-3xl font-black text-foreground tracking-tighter">Customer Lead Pool</h2>
           <p className="text-sm text-muted-foreground font-medium">Capture and track high-intent inquiries from the marketplace</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="relative group min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-accent" />
              <Input placeholder="Search within leads..." className="h-11 pl-9 bg-card border-border shadow-sm rounded-xl" />
           </div>
           <Button variant="outline" className="h-11 px-4 rounded-xl border-border border-2 font-bold text-xs gap-2">
              <Filter className="h-4 w-4" /> Filters
           </Button>
           <Button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest gap-2">
              Export CSV
           </Button>
        </div>
      </div>

      {/* Inquiry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentInquiries.map((inquiry, i) => (
          <motion.div 
            key={inquiry.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-3xl border shadow-sm hover:shadow-xl transition-all p-6 group relative overflow-hidden flex flex-col h-full"
          >
            {/* Status Indicator */}
            <div className={`absolute top-0 right-0 h-1.5 w-full ${inquiry.status === 'new' ? 'bg-accent' : inquiry.status === 'responded' ? 'bg-success' : 'bg-muted'}`} />
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {inquiry.customerName[0]}
                </div>
                <div>
                   <h3 className="font-black text-foreground tracking-tight">{inquiry.customerName}</h3>
                   <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> Received {inquiry.date}
                   </p>
                </div>
              </div>
              <Badge className={`uppercase text-[9px] font-black tracking-widest h-6 px-2.5 border-0 ${inquiry.status === 'new' ? 'bg-accent/10 text-accent' : inquiry.status === 'responded' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                {inquiry.status}
              </Badge>
            </div>

            <div className="space-y-4 flex-1">
               <div className="p-3 bg-muted/30 rounded-xl border border-border/30">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1.5 opacity-60">Interested In</p>
                  <p className="text-xs font-bold text-foreground line-clamp-1">{inquiry.product}</p>
               </div>
               <div className="space-y-2">
                 <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Customer Message</p>
                 <p className="text-xs text-foreground/80 font-medium leading-relaxed italic border-l-2 border-accent/20 pl-3">
                    "{inquiry.message}"
                 </p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                     <Mail className="h-3.5 w-3.5" strokeWidth={2} /> Email
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                     <Phone className="h-3.5 w-3.5" strokeWidth={2} /> Call
                  </div>
               </div>
               <Button size="sm" className="bg-accent text-accent-foreground font-black text-[10px] uppercase tracking-widest h-9 rounded-lg gap-2 group/btn">
                  Respond Lead <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
               </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
