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
  LayoutGrid,
  TrendingUp,
  AlertCircle,
  Package,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Zap
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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardProductsPage() {
  const [viewMode, setViewMode] = useState('list');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === vendorProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(vendorProducts.map(p => p.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 pb-10 font-sans">
      
      {/* Top Analytics Bar - Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Active</p>
            <p className="text-xl font-black text-slate-900">84 / 100</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Performer</p>
            <p className="text-sm font-black text-slate-900 truncate w-32">Teak Wood Sofa</p>
          </div>
        </div>
        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Low Visibility</p>
            <p className="text-xl font-black text-amber-900">12 Items</p>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-3xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-400 fill-amber-400" />
            <p className="text-xs font-bold text-white uppercase tracking-tight">Boost Ranking</p>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 h-8 text-[9px] font-black uppercase">Start Ad</Button>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight">Catalog Hub</h2>
           <p className="text-slate-500 font-medium italic">Manage bulk pricing, MOQ, and product visibility.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
              <Input placeholder="Search by SKU or Name..." className="h-12 w-full md:w-72 pl-11 rounded-2xl bg-white border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-100" />
           </div>
           <Button variant="outline" className="h-12 px-5 rounded-2xl border-slate-200 font-bold text-slate-600 gap-2">
              <Filter className="h-4 w-4" /> Filters
           </Button>
           <Button asChild className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-500/20 gap-2">
              <Link href="/dashboard/products/add">
                 <Plus className="h-5 w-5" /> Add Product
              </Link>
           </Button>
        </div>
      </div>

      {/* Main Table/Grid Container */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-6">
              <div className="flex gap-1 p-1 bg-slate-200/50 rounded-xl">
                 <button onClick={() => setViewMode('list')} className={`p-2 px-4 rounded-lg flex items-center gap-2 text-xs font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <TableIcon className="h-4 w-4" /> List
                 </button>
                 <button onClick={() => setViewMode('grid')} className={`p-2 px-4 rounded-lg flex items-center gap-2 text-xs font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <LayoutGrid className="h-4 w-4" /> Grid
                 </button>
              </div>
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-2 animate-in slide-in-from-left-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{selectedProducts.length} Selected</span>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-black text-slate-500 uppercase">Change Status</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-black text-red-500 uppercase">Delete Bulk</Button>
                </div>
              )}
           </div>
           <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-slate-500 font-bold gap-2 hover:bg-slate-100">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              <motion.table key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-5 w-10">
                       <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-600" 
                        checked={selectedProducts.length === vendorProducts.length} onChange={toggleSelectAll} />
                    </th>
                    <th className="px-4 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Product & SKU</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Pricing / MOQ</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Performance</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Trust status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {vendorProducts.map((product, i) => (
                    <motion.tr key={product.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} 
                      className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-600" 
                          checked={selectedProducts.includes(product.id)} onChange={() => toggleSelect(product.id)} />
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-5">
                          <div className="h-16 w-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 group-hover:shadow-md transition-all">
                             {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 font-black italic">HS-SKU</div>}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm leading-tight hover:text-blue-600 cursor-pointer transition-colors">{product.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CAT: {product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-sm font-black text-slate-900">₹{product.price.replace(/[^0-9]/g, '')}</p>
                         <p className="text-[10px] font-bold text-slate-500 mt-0.5">MOQ: 10 Units</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900 tabular-nums">{product.views}</span>
                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black h-5">+12%</Badge>
                         </div>
                         <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">Organic Traffic</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col gap-1.5">
                            <Badge className={`w-fit uppercase text-[8px] font-black tracking-widest px-2 ${product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                              {product.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                               <CheckCircle2 className="h-3 w-3 text-blue-500" />
                               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Listed on Marketplace</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                               <Edit2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400">
                                     <MoreVertical className="h-5 w-5" />
                                  </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-slate-100">
                                  <DropdownMenuItem className="p-3 font-bold text-sm rounded-xl cursor-pointer">
                                     <ExternalLink className="mr-3 h-4 w-4" /> Preview Live
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="p-3 font-bold text-sm rounded-xl cursor-pointer">
                                     <Zap className="mr-3 h-4 w-4 text-amber-500" /> Boost Visibility
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="p-3 font-bold text-sm rounded-xl text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                                     <Trash2 className="mr-3 h-4 w-4" /> Delete Product
                                  </DropdownMenuItem>
                               </DropdownMenuContent>
                            </DropdownMenu>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
                {vendorProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                       {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center font-black text-slate-300">NO IMAGE</div>}
                       <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 backdrop-blur shadow-sm text-slate-900 border-none font-black text-[9px] uppercase tracking-widest">{product.status}</Badge>
                       </div>
                       <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <Button size="icon" className="h-12 w-12 rounded-2xl bg-white text-blue-600 hover:bg-white"><Edit2 className="h-5 w-5" /></Button>
                          <Button size="icon" className="h-12 w-12 rounded-2xl bg-white text-blue-600 hover:bg-white"><ArrowUpRight className="h-5 w-5" /></Button>
                       </div>
                    </div>
                    <div className="p-6 space-y-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{product.category}</p>
                          <h4 className="font-black text-slate-900 line-clamp-1">{product.title}</h4>
                       </div>
                       <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                          <div>
                             <p className="text-sm font-black text-slate-900">{product.price}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">Min. Order: 10</p>
                          </div>
                          <div className="text-right">
                             <div className="flex items-center justify-end gap-1">
                                <Eye className="h-3 w-3 text-slate-400" />
                                <span className="text-xs font-black text-slate-900">{product.views}</span>
                             </div>
                             <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">High Interest</p>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="p-8 border-t border-slate-100 flex items-center justify-between text-slate-400">
           <p className="text-xs font-medium">Showing {vendorProducts.length} of 24 listings</p>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-4 border-slate-200 text-xs font-bold">Previous</Button>
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-4 border-slate-200 text-xs font-bold bg-slate-50">Next</Button>
           </div>
        </div>

      </div>
    </div>
  );
}