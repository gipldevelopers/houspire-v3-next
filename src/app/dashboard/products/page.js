"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  ExternalLink,
  Table as TableIcon,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { vendorProducts } from "@/lib/mock-data";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export default function DashboardProductsPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <h2 className="text-3xl font-black text-foreground tracking-tighter">Inventory Pool</h2>
           <p className="text-sm text-muted-foreground font-medium">Manage and optimize your listed collection</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-accent" />
              <Input placeholder="Search inventory..." className="h-11 pl-9 bg-card border-border shadow-sm rounded-xl" />
           </div>
           <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-border border-2">
              <Filter className="h-4 w-4" />
           </Button>
           <Link href="/dashboard/products/add">
              <Button className="h-11 px-6 rounded-xl bg-accent text-accent-foreground font-black text-xs uppercase tracking-widest gap-2">
                 <Plus className="h-4 w-4" /> Add Product
              </Button>
           </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-card rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
           <div className="flex gap-2 p-1 bg-muted rounded-xl ring-1 ring-border/50">
              <Button size="sm" className="bg-card shadow-sm text-primary font-bold text-[10px] uppercase h-8 px-4 rounded-lg"><TableIcon className="h-3.5 w-3.5 mr-1" /> List View</Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground font-bold text-[10px] uppercase h-8 px-4 rounded-lg"><LayoutGrid className="h-3.5 w-3.5 mr-1" /> Grid View</Button>
           </div>
           <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
              Total Capacity: <span className="text-foreground">24/100</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b bg-muted/10">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 w-[40%]">Product Specifications</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Global Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Views</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorProducts.map((product, i) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }} 
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-xl bg-muted overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ring-1 ring-border/50">
                        {/* Image Placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground opacity-30">IMG</div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">{product.title}</p>
                        <p className="text-xs text-primary font-black mt-1 tabular-nums">{product.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/30">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={`uppercase text-[9px] font-black tracking-widest h-6 px-2.5 border-0 ${product.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-foreground tabular-nums flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-accent" /> {product.views.toLocaleString()}</span>
                       <span className="text-[10px] font-bold text-success/70 mt-0.5">+12.5% this week</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted rounded-xl hover:text-foreground">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-2xl border-border bg-card">
                        <DropdownMenuItem className="p-3 text-sm font-bold gap-3 rounded-xl focus:bg-accent/10 focus:text-accent cursor-pointer">
                          <Edit2 className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-3 text-sm font-bold gap-3 rounded-xl focus:bg-accent/10 focus:text-accent cursor-pointer">
                          <ExternalLink className="h-4 w-4" /> Preview Live
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem className="p-3 text-sm font-bold gap-3 rounded-xl focus:bg-destructive/10 text-destructive cursor-pointer">
                          <Trash2 className="h-4 w-4" /> Remove Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
