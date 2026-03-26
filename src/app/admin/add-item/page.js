"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Package, 
  ChevronRight, 
  Save, 
  X, 
  Upload, 
  Globe, 
  ShieldCheck,
  Zap,
  Tag,
  DollarSign,
  Layers,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AddItemContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = React.useRef(null);
  const initialTab = searchParams.get("tab") || "product";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        toast.success("Asset buffered successfully.", {
            description: `${file.name} ready for registry commit.`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newItem = {
      id: activeTab === "product" ? `PRD-${Math.floor(Math.random() * 9000) + 1000}` : `VND-${Math.floor(Math.random() * 9000) + 1000}`,
      name: itemName || (activeTab === "product" ? "Newly Provisioned Product" : "New Legal Entity"),
      brand: activeTab === "product" ? "Vogue Interiors" : "N/A",
      price: 25000,
      stock: 50,
      category: activeTab === "product" ? "Living Room" : "Home Decor",
      status: "Review",
      image: selectedImage,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    const storageKey = activeTab === "product" ? "houspire_products" : "houspire_vendors";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    localStorage.setItem(storageKey, JSON.stringify([newItem, ...existing]));

    toast.promise(new Promise(r => setTimeout(r, 1500)), {
      loading: `Provisioning new ${activeTab} in cluster...`,
      success: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} registered successfully in the global pool.`,
      error: 'Registry injection failed. Check network status.'
    });
    setTimeout(() => {
      router.push(activeTab === "product" ? "/admin/products" : "/admin/vendors");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
               Item Registry <Plus_Icon className="h-5 w-5 text-primary" />
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Asset Provisioning Module</p>
         </div>
         <Button variant="ghost" className="h-10 rounded-xl px-4 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest gap-2" onClick={() => router.back()}>
            <X className="h-4 w-4" /> Cancel Operation
         </Button>
      </div>

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 h-12 bg-white border border-border/60 rounded-xl p-1 shadow-sm mb-8">
          <TabsTrigger value="product" className="rounded-[10px] font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-slate-950 data-[state=active]:text-white transition-all">
            <Package className="h-3.5 w-3.5 mr-2" /> Provision Product
          </TabsTrigger>
          <TabsTrigger value="vendor" className="rounded-[10px] font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-slate-950 data-[state=active]:text-white transition-all">
            <Building2 className="h-3.5 w-3.5 mr-2" /> Register Vendor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <Card className="border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden bg-white">
                    <CardHeader className="p-8 border-b border-border/40 bg-slate-50/50">
                       <CardTitle className="text-sm font-black uppercase tracking-widest italic text-slate-900">Core Specifications</CardTitle>
                       <CardDescription className="text-[9px] font-bold uppercase text-slate-400">Primary metadata for marketplace listing.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Product Title</label>
                             <Input 
                               placeholder="e.g. Minimalist Oak Dining Table" 
                               className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" 
                               value={itemName}
                               onChange={(e) => setItemName(e.target.value)}
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Brand Identification</label>
                             <Select>
                                <SelectTrigger className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs">
                                   <SelectValue placeholder="Select active vendor" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/60 shadow-xl p-1">
                                   <SelectItem value="vogue">Vogue Interiors</SelectItem>
                                   <SelectItem value="stone">Stonecraft India</SelectItem>
                                   <SelectItem value="modular">Modular Hub</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                       </div>

                       <div className="grid grid-cols-3 gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Base Valuation (INR)</label>
                             <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input placeholder="0.00" className="h-10 pl-9 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Stock Units</label>
                             <Input type="number" placeholder="0" className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Category Index</label>
                             <Select>
                                <SelectTrigger className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs">
                                   <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/60 shadow-xl p-1">
                                   <SelectItem value="living">Living Room</SelectItem>
                                   <SelectItem value="kitchen">Kitchen</SelectItem>
                                   <SelectItem value="materials">Materials</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Product Manifest (Description)</label>
                          <Textarea placeholder="Detailed technical specifications and material description..." className="min-h-[120px] rounded-2xl border-border/60 bg-slate-50/50 font-medium text-xs resize-none" />
                       </div>
                    </CardContent>
                 </Card>
              </div>

              <div className="space-y-6">
                 <Card className="border-2 border-border/60 rounded-[2rem] shadow-sm overflow-hidden bg-white">
                    <CardContent className="p-8 space-y-6">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest italic text-slate-400 border-b border-border/20 pb-2 flex items-center gap-2">
                             Visual Assets <Upload className="h-3.5 w-3.5" />
                          </h4>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                          />
                          <div 
                            className="aspect-square rounded-3xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center space-y-3 bg-slate-50 group hover:border-primary/40 transition-all cursor-pointer overflow-hidden relative"
                            onClick={() => fileInputRef.current?.click()}
                          >
                             {selectedImage ? (
                                <img src={selectedImage} alt="Preview" className="h-full w-full object-cover animate-in fade-in zoom-in duration-300" />
                             ) : (
                                <>
                                   <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-border/40 shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                                      <Plus_Icon className="h-6 w-6" />
                                   </div>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DRAG ASSETS HERE</p>
                                </>
                             )}
                             {selectedImage && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Swap Asset</p>
                                </div>
                             )}
                          </div>
                       </div>

                       <div className="space-y-4 pt-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest italic text-slate-400 border-b border-border/20 pb-2 flex items-center gap-2">
                             Listing Rules <ShieldCheck className="h-3.5 w-3.5 text-success" />
                          </h4>
                          <div className="space-y-3">
                             <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-border/40">
                                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-600">Sync to Primary Market</span>
                             </div>
                             <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-border/40">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold text-slate-600">Apply Wholesale Logic</span>
                             </div>
                          </div>
                       </div>

                       <Button className="w-full h-12 rounded-2xl bg-slate-950 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all mt-4" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" /> Commit to Registry
                       </Button>
                    </CardContent>
                 </Card>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
           <Card className="border-2 border-border/60 rounded-[2.5rem] shadow-sm overflow-hidden bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                 <div className="p-10 border-r border-border/40 space-y-8">
                    <div className="space-y-2">
                       <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Business Entity Details</h3>
                       <p className="text-[10px] font-medium text-slate-400 italic">Provisioning of new vendor account in the primary cluster.</p>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Legal Entity Name</label>
                          <Input 
                            placeholder="e.g. Zenith Furniture Works" 
                            className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" 
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Contact Principal</label>
                             <Input placeholder="Full Name" className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Official ID / GSTIN</label>
                             <Input placeholder="GSTXXXXXXXXXXXX" className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic ml-1">Operational Category</label>
                          <Select>
                             <SelectTrigger className="h-10 rounded-xl border-border/60 bg-slate-50/50 font-bold text-xs">
                                <SelectValue placeholder="Select category cluster" />
                             </SelectTrigger>
                             <SelectContent className="rounded-xl border-border/60 shadow-xl p-1">
                                <SelectItem value="decor">Home Decor</SelectItem>
                                <SelectItem value="lighting">Lighting & Electricals</SelectItem>
                                <SelectItem value="modular">Modular Solutions</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                 </div>

                 <div className="p-10 bg-slate-50/30 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-white border border-border/60 shadow-sm space-y-4 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 h-16 w-16 bg-success/10 rounded-full translate-x-8 -translate-y-8 blur-2xl" />
                           <h4 className="text-[10px] font-black text-success uppercase tracking-widest italic flex items-center gap-2">
                             <Zap className="h-3 w-3" /> Automatic Vetting
                           </h4>
                           <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                               This registration will trigger our **KYC AI Engine** for instant background verification. Ensure the GSTIN is accurate to avoid rejection.
                           </p>
                        </div>

                        <div className="space-y-3">
                           <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border/40">
                              <span className="text-[10px] font-bold text-slate-600">Provision Sandbox Access</span>
                              <div className="h-4 w-8 rounded-full bg-primary/20 p-0.5 cursor-pointer">
                                 <div className="h-3 w-3 rounded-full bg-primary translate-x-4 transition-transform" />
                              </div>
                           </div>
                           <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border/40">
                              <span className="text-[10px] font-bold text-slate-600">Enable Priority Discovery</span>
                              <div className="h-4 w-8 rounded-full bg-slate-200 p-0.5 cursor-pointer">
                                 <div className="h-3 w-3 rounded-full bg-white transition-transform" />
                              </div>
                           </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                       <Button className="w-full h-12 rounded-2xl bg-slate-950 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all" onClick={handleSave}>
                          <Building2 className="h-4 w-4 mr-2" /> Finalize Registry
                       </Button>
                       <p className="text-[9px] text-center font-black text-slate-400 uppercase tracking-widest italic opacity-50">Authorized Personnel Only</p>
                    </div>
                 </div>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] text-xs font-black uppercase tracking-widest text-slate-400">Loading Registry Cluster...</div>}>
      <AddItemContent />
    </Suspense>
  );
}

function Plus_Icon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
