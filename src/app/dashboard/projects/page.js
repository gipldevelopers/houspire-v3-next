"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  MoreVertical,
  Camera,
  Layers,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Eco-Friendly Mod Kitchen",
    location: "Worli, Mumbai",
    date: "Feb 2026",
    category: "Interior Design",
    status: "Completed",
    image: "/modern_modular_kitchen_portfolio_1773926646832.png",
    tags: ["Modular", "Sustainable"]
  },
  {
    id: 2,
    title: "Minimalist Living Room",
    location: "Indiranagar, Bangalore",
    date: "Jan 2026",
    category: "Furniture Setup",
    status: "Completed",
    image: "/minimalist_living_room_portfolio_1773926667293.png",
    tags: ["Modern", "Minimal"]
  },
  {
    id: 3,
    title: "Heritage Villa Restoration",
    location: "Jaipur, Rajasthan",
    date: "Dec 2025",
    category: "Full Renovation",
    status: "Draft",
    image: "/heritage_villa_renovation_portfolio_1773926685187.png",
    tags: ["Luxury", "Traditional"]
  }
];

export default function DashboardProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
           <h2 className="text-4xl font-black text-foreground tracking-tight underline decoration-primary/20 decoration-8 underline-offset-8">Project Portfolio</h2>
           <div className="text-sm text-muted-foreground font-medium">Showcase your best execution to potential buyers</div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <div className="relative group min-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                 placeholder="Search by project name or category..." 
                 className="h-14 pl-12 rounded-2xl bg-card border-2 border-border/50 shadow-sm text-sm font-bold focus-visible:ring-primary"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <Link href="/dashboard/projects/new">
             <Button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Plus className="h-5 w-5" /> Showcase Project
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
               <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
               >
                  <Card className="rounded-[3rem] border-2 border-border/50 shadow-xl overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all bg-card/50 backdrop-blur-xl">
                     <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                         <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                        <div className="absolute top-6 right-6 z-10">
                           <Badge className={`uppercase text-[9px] font-black tracking-widest h-6 px-3 border-0 rounded-full shadow-lg ${
                              project.status === 'Completed' ? 'bg-success text-white' : 'bg-warning text-white'
                           }`}>
                              {project.status}
                           </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                           <Button size="sm" className="w-fit bg-white/20 backdrop-blur-md text-white border border-white/20 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black">
                              <ExternalLink className="h-3 w-3 mr-2" /> View Full Case Study
                           </Button>
                        </div>
                     </div>

                     <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                           <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                 <h4 className="font-black text-xl text-foreground tracking-tight line-clamp-1">{project.title}</h4>
                                 <div className="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</div>
                              </div>
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground rounded-xl shrink-0">
                                       <MoreVertical className="h-5 w-5" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl bg-card border-2">
                                    <Link href="/dashboard/projects/new">
                                       <DropdownMenuItem className="p-3 text-sm font-bold gap-3 rounded-xl cursor-pointer">
                                          <Edit3 className="h-4 w-4" /> Edit Project
                                       </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem className="p-3 text-sm font-bold gap-3 rounded-xl cursor-pointer text-destructive focus:bg-destructive/10">
                                       <Trash2 className="h-4 w-4" /> Delete Portfolio
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>

                           <div className="flex flex-wrap gap-2">
                              {project.tags.map(tag => (
                                 <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground/80 font-bold text-[9px] uppercase tracking-widest border-0">
                                    {tag}
                                 </Badge>
                              ))}
                           </div>
                        </div>

                        <div className="pt-6 border-t flex items-center justify-between text-muted-foreground">
                           <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                              <MapPin className="h-3.5 w-3.5" /> {project.location}
                           </div>
                           <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                              <Calendar className="h-3.5 w-3.5" /> {project.date}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            ))}

            {/* Empty State / Add Card */}
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div className="aspect-[16/22] rounded-[3rem] border-4 border-dashed border-border flex flex-col items-center justify-center p-8 text-center space-y-6 hover:bg-muted/30 hover:border-primary/20 transition-all group cursor-pointer">
                  <div className="h-20 w-20 rounded-3xl bg-muted/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                     <Camera className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <p className="text-lg font-black tracking-tight">Expand Portfolio</p>
                     <div className="text-xs font-medium text-muted-foreground px-6">Upload photos of your latest delivery to attract more enterprise leads.</div>
                  </div>
                  <Link href="/dashboard/projects/new">
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all">Upload Now</Button>
                  </Link>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Pro Tips Section */}
      <div className="bg-primary/5 border border-primary/10 rounded-[4rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-10">
         <div className="h-24 w-24 rounded-3xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
         </div>
         <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight">Pro Tip: Portfolios close more deals!</h3>
            <div className="text-muted-foreground font-medium leading-relaxed max-w-2xl">Vendors with at least <span className="text-foreground font-black">5 completed projects</span> in their hub receive <span className="text-success font-black">2.4x more inquiries</span> on high-value items. Make sure to tag your materials and location precisely.</div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
               <Badge className="bg-primary/10 text-primary border-0 font-bold px-3">Case Studies</Badge>
               <Badge className="bg-primary/10 text-primary border-0 font-bold px-3">High-Res Photos</Badge>
               <Badge className="bg-primary/10 text-primary border-0 font-bold px-3">Verified Badges</Badge>
            </div>
         </div>
         <Button className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black shadow-xl shadow-primary/20">Learn Optimization</Button>
      </div>
    </div>
  );
}
