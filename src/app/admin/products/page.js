"use client";

import React, { useState } from "react";
import { 
  Box, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  ArrowUpRight,
  ShoppingCart,
  Layers,
  Tag,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  LayoutGrid,
  List,
  Image as ImageIcon,
  DollarSign,
  Package
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
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const products = [
  { id: "PRD-1021", name: "Premium Velvet Sofa", brand: "Vogue Interiors", price: 45000, stock: 12, category: "Living Room", status: "Published", image: null },
  { id: "PRD-2032", name: "Modern Kitchen Island", brand: "Modular Hub", price: 85000, stock: 5, category: "Kitchen", status: "Review", image: null },
  { id: "PRD-3043", name: "Smart LED Chandelier", brand: "Luxe Lightings", price: 12500, stock: 24, category: "Lighting", status: "Published", image: null },
  { id: "PRD-4054", name: "Teak Wood Dining Table", brand: "Earthly Elements", price: 32000, stock: 8, category: "Dining Room", status: "Flagged", image: null },
  { id: "PRD-5065", name: "Geometric Floor Rug", brand: "Vogue Interiors", price: 8500, stock: 45, category: "Decor", status: "Published", image: null },
  { id: "PRD-6076", name: "Ceramic Bathroom Tiles", brand: "Stonecraft India", price: 450, stock: 1200, category: "Materials", status: "Published", image: null },
];

const stats = [
  { label: "Total Products", value: "48,230", icon: Package, color: "text-primary" },
  { label: "Needs Review", value: "156", icon: Clock, color: "text-warning" },
  { label: "Active Brands", value: "1,248", icon: Layers, color: "text-success" },
  { label: "Flagged Content", value: "24", icon: AlertCircle, color: "text-destructive" },
];

export default function ProductPoolPage() {
  const router = useRouter();
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [localProducts, setLocalProducts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("houspire_products");
      return saved ? [...JSON.parse(saved), ...products] : products;
    }
    return products;
  });

  const handleDelete = (id) => {
    const updated = localProducts.filter(p => p.id !== id);
    setLocalProducts(updated);
    if (typeof window !== "undefined") {
      const onlyAdded = updated.filter(u => !products.some(p => p.id === u.id));
      localStorage.setItem("houspire_products", JSON.stringify(onlyAdded));
    }
    toast.error("Operation Complete", {
      description: `Asset ${id} flagged and purged from the global pool.`
    });
  };

  const filteredProducts = localProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-white border-2 border-border/60 shadow-sm rounded-2xl group hover:border-primary/40 transition-all overflow-hidden relative">
               <div className="absolute -top-2 -right-2 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <stat.icon className="h-12 w-12" />
               </div>
               <CardContent className="p-5">
                <div className={cn("h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-border/40 mb-3", stat.color)}>
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-0.5 leading-none">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Product List/Grid Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         <div className="flex bg-white rounded-xl p-1 border border-border/60 shadow-sm w-fit">
            <Button 
               variant={view === "grid" ? "default" : "ghost"} 
               size="sm" 
               onClick={() => setView("grid")}
               className={cn("h-8 px-5 rounded-lg text-[9px] font-black uppercase tracking-widest", view === "grid" ? "shadow-lg shadow-primary/20" : "text-slate-400")}
            >
               <LayoutGrid className="h-3.5 w-3.5 mr-2" /> Grid
            </Button>
            <Button 
               variant={view === "list" ? "default" : "ghost"} 
               size="sm" 
               onClick={() => setView("list")}
               className={cn("h-8 px-5 rounded-lg text-[9px] font-black uppercase tracking-widest", view === "list" ? "shadow-lg shadow-primary/20" : "text-slate-400")}
            >
               <List className="h-3.5 w-3.5 mr-2" /> List
            </Button>
         </div>

         <div className="lg:col-span-2 flex items-center gap-3">
            <div className="relative flex-1 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
               <Input 
                  placeholder="Analyze product ID or title..." 
                  className="h-10 pl-9 bg-white border border-border/60 rounded-xl text-[10px] font-bold focus-visible:ring-primary shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Button 
                variant="outline" 
                className="h-10 px-4 rounded-xl border border-border/60 bg-white font-black text-[9px] uppercase tracking-widest shadow-sm gap-2"
                onClick={() => toast.info("Syncing inventory filter nodes...")}
            >
               <Filter className="h-4 w-4 text-slate-400" /> Filter
            </Button>
            <Link href="/admin/add-item">
                              <Button className="h-10 px-5 rounded-xl bg-primary text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                                 <Plus className="h-4 w-4" /> Add Item
                              </Button>
                           </Link>
         </div>
      </div>

      {view === "list" ? (
         <Card className="bg-white border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden mb-8">
            <CardContent className="p-0">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50 border-b border-border/40">
                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Product Base</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Economics</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-center">Supply</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">State</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right">Admin Control</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                     <AnimatePresence>
                        {filteredProducts.map((product, i) => (
                           <motion.tr 
                              key={product.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="group hover:bg-slate-50/50 transition-colors"
                           >
                               <td className="px-8 py-3.5">
                                 <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-slate-100 border border-border/40 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                       {product.image ? (
                                          <img src={product.image} className="h-full w-full object-cover" />
                                       ) : (
                                          <ImageIcon className="h-4 w-4 text-slate-300" />
                                       )}
                                    </div>
                                    <div className="space-y-0.5">
                                       <h4 className="font-bold text-xs text-slate-900 leading-tight tracking-tight group-hover:text-primary transition-colors">{product.name}</h4>
                                       <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest italic">
                                          ID: <span className="text-primary tracking-normal">{product.id}</span>
                                          <span className="h-0.5 w-0.5 rounded-full bg-slate-200" />
                                          {product.brand}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-success/5 flex items-center justify-center border border-success/10">
                                       <DollarSign className="h-4 w-4 text-success" />
                                    </div>
                                    <span className="text-sm font-black text-slate-900 tabular-nums">₹{product.price.toLocaleString()}</span>
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-center">
                                 <div className="flex flex-col items-center">
                                    <span className="text-sm font-black text-slate-900 tabular-nums">{product.stock}</span>
                                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Units</span>
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 h-6 border-0 shadow-sm",
                                    product.status === 'Published' ? 'bg-success text-white' :
                                    product.status === 'Review' ? 'bg-warning text-white' :
                                    'bg-destructive text-white'
                                 )}>
                                    {product.status}
                                 </Badge>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100" onClick={() => toast.info(`Viewing Asset: ${product.id}`)}>
                                       <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-success hover:bg-success/5" onClick={() => toast.info(`Editing Asset: ${product.id}`)}>
                                       <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-destructive hover:bg-destructive/5" onClick={() => handleDelete(product.id)}>
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </td>
                           </motion.tr>
                        ))}
                     </AnimatePresence>
                  </tbody>
               </table>
            </CardContent>
         </Card>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence>
               {filteredProducts.map((product, i) => (
                  <motion.div
                     key={product.id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.05 }}
                  >
                     <Card className="bg-white border-2 border-border/60 rounded-[2.5rem] shadow-sm overflow-hidden group hover:border-primary/40 transition-all cursor-pointer">
                         <div className="aspect-[4/3] bg-slate-50 border-b-2 border-border/20 flex items-center justify-center relative overflow-hidden">
                            {product.image ? (
                               <img src={product.image} className="h-full w-full object-cover" />
                            ) : (
                               <ImageIcon className="h-12 w-12 text-slate-200" />
                            )}
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <Button className="rounded-full bg-white text-primary font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={() => toast.info(`Viewing Asset: ${product.id}`)}>Quick View</Button>
                            </div>
                            <Badge className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-slate-900 border-border/40 font-black text-[9px] h-6 px-3">
                               {product.category}
                            </Badge>
                         </div>
                        <CardContent className="p-8 space-y-4">
                           <div className="space-y-1">
                              <h4 className="text-lg font-black text-slate-900 tracking-tighter leading-tight italic">{product.name}</h4>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</p>
                           </div>
                           <div className="flex items-center justify-between pt-4 border-t border-border/20">
                              <div className="space-y-0.5">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pricing</p>
                                 <p className="text-xl font-black text-primary tracking-tighter tabular-nums">₹{product.price.toLocaleString()}</p>
                              </div>
                              <div className="text-right space-y-0.5">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory</p>
                                 <p className="text-sm font-black text-slate-900 tabular-nums">{product.stock} Units</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      )}

      {/* Analytics Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
            <div className="absolute -right-12 -bottom-12 h-64 w-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
            <div className="relative z-10 flex flex-col gap-6">
               <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                  <ArrowUpRight className="h-8 w-8" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-widest italic uppercase">Marketplace Insights</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                     Category <span className="text-primary font-black">"Lighting"</span> has seen a 24% surge in inquiries this week. Suggest vendors to restock.
                  </p>
               </div>
               <Button 
                className="w-fit h-12 rounded-2xl bg-white text-slate-900 font-black uppercase text-[10px] tracking-[0.2em] px-8 hover:scale-105 active:scale-95 transition-all"
                onClick={() => {
                    toast.success("Synchronizing Marketplace Intelligence...");
                    router.push("/admin/analytics");
                }}
               >
                  Deep Analytics
               </Button>
            </div>
         </Card>
         
         <Card className="bg-white border-2 border-border/60 rounded-[3rem] p-10 flex items-center justify-center">
            <div className="text-center space-y-4">
               <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center border-2 border-border/40 mx-auto">
                  <Tag className="h-8 w-8 text-slate-300" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Category Management</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Configure marketplace taxonomy and attributes.</p>
               </div>
               <Button 
                variant="outline" 
                className="h-10 px-8 rounded-xl border-border/60 font-black text-[10px] uppercase tracking-widest shadow-sm"
                onClick={() => toast.info("Opening Taxonomy Configuration Manager...")}
               >
                  Manage Categories
               </Button>
            </div>
         </Card>
      </div>
    </div>
  );
}
