"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Upload, Info, CheckCircle2, 
  Trash2, Plus, Package, Image as ImageIcon, IndianRupee, 
  ListRestart, X, ShieldCheck, Zap, HelpCircle, Eye,
  Truck, Factory, ShieldAlert, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Listing Info", subtitle: "Basic details & SKU", icon: Package },
  { id: 2, title: "B2B Commercials", subtitle: "Pricing & GST", icon: IndianRupee },
  { id: 3, title: "Supply & Logistics", subtitle: "Capacity & Shipping", icon: Truck },
  { id: 4, title: "Visuals", subtitle: "Product Photos", icon: ImageIcon },
];

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]); 

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    sku: "",
    hsnCode: "",
    description: "",
    priceType: "fixed", // fixed, range, or contact_for_price
    minPrice: "",
    maxPrice: "",
    gstSlab: "18",
    moq: "1",
    moqUnit: "Piece",
    supplyCapacity: "",
    capacityUnit: "Month",
    leadTime: "",
    packagingType: "",
    material: "",
    brand: "Generic",
  });

  // --- Image Handling ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file: file
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 10)); 
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else {
      alert("Product Submitted for Verification!");
      router.push("/dashboard/products");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 font-sans">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add B2B Listing</h1>
          <p className="text-slate-500 text-sm font-medium">List your interior products to reach 50,000+ verified buyers.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <span className="text-xs font-bold text-blue-700 uppercase tracking-tighter">Verified Vendor Mode</span>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex justify-between mb-12 relative px-2 md:px-10 overflow-x-auto gap-4 scrollbar-hide">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2 rounded-xl">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
              currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-400"
            }`}>
              {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-4 w-4" />}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${currentStep >= step.id ? "text-blue-600" : "text-slate-400"}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* STEP 1:Listing Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">Product Title (Keep it Search Friendly)</Label>
                          <Input placeholder="e.g. Premium Teak Wood Modular Kitchen Cabinets" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">Category</Label>
                          <Select><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select Category" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="furniture">Modular Furniture</SelectItem>
                            <SelectItem value="tiles">Vitrified Tiles</SelectItem>
                            <SelectItem value="sanitary">Sanitaryware</SelectItem>
                          </SelectContent></Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">Brand Name</Label>
                          <Input placeholder="e.g. Hafele, Ozone, or Own Brand" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">Full Description</Label>
                          <Textarea placeholder="Details about material, use-case, and warranty..." className="min-h-[120px] rounded-xl" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: COMMERCIALS */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">Pricing Model</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {['fixed', 'range', 'on_request'].map(m => (
                              <button key={m} type="button" onClick={() => setFormData({...formData, priceType: m})} className={`py-3 px-2 rounded-xl border text-[10px] font-black uppercase tracking-tight transition-all ${formData.priceType === m ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-slate-500 hover:border-blue-200'}`}>
                                {m.replace('_', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>
                        {formData.priceType !== 'on_request' && (
                           <div className="space-y-2">
                             <Label className="text-xs font-bold uppercase text-slate-500">Approx Price (INR)</Label>
                             <div className="relative">
                               <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                               <Input placeholder="5000" className="h-12 rounded-xl pl-10 font-bold" />
                             </div>
                           </div>
                        )}
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">GST Percentage</Label>
                          <Select defaultValue="18"><SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="5">5%</SelectItem><SelectItem value="12">12%</SelectItem><SelectItem value="18">18%</SelectItem><SelectItem value="28">28%</SelectItem></SelectContent></Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">HSN Code (Compulsory)</Label>
                          <Input placeholder="8481" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-slate-500">MOQ (Min. Order Quantity)</Label>
                          <div className="flex gap-2">
                            <Input placeholder="10" className="h-12 rounded-xl w-1/2" />
                            <Select defaultValue="Piece"><SelectTrigger className="h-12 rounded-xl w-1/2"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="Piece">Piece</SelectItem><SelectItem value="Set">Set</SelectItem><SelectItem value="Box">Box</SelectItem></SelectContent></Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SUPPLY & LOGISTICS */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase text-slate-500">Production Capacity (per month)</Label>
                            <Input placeholder="e.g. 500 Units" className="h-12 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase text-slate-500">Delivery Lead Time (Days)</Label>
                            <Input placeholder="e.g. 7-10 Days" className="h-12 rounded-xl" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label className="text-xs font-bold uppercase text-slate-500">Packaging Details</Label>
                            <Input placeholder="e.g. Corrugated Box with Bubble Wrap" className="h-12 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase text-slate-500">Ships From (City/State)</Label>
                            <Input placeholder="e.g. Morbi, Gujarat" className="h-12 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase text-slate-500">Sample Policy</Label>
                            <Select><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select Policy" /></SelectTrigger>
                            <SelectContent><SelectItem value="free">Free Sample</SelectItem><SelectItem value="paid">Paid Sample</SelectItem><SelectItem value="none">No Samples</SelectItem></SelectContent></Select>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* STEP 4: VISUALS */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-all"
                          >
                            <Plus className="h-6 w-6 text-blue-600" />
                            <p className="text-[9px] font-black text-blue-600 uppercase">Add Photo</p>
                            <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                          </div>

                          {images.map((img, idx) => (
                            <div key={img.id} className="relative aspect-square rounded-2xl border overflow-hidden group">
                               <img src={img.url} className="w-full h-full object-cover" />
                               <button type="button" onClick={() => removeImage(img.id)} className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                                 <X className="h-3 w-3" />
                               </button>
                               {idx === 0 && <span className="absolute bottom-2 left-2 bg-blue-600 text-[8px] text-white px-2 py-0.5 rounded font-black uppercase">Main</span>}
                            </div>
                          ))}
                       </div>
                       
                       <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
                          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                             <p className="text-xs font-black text-amber-900 uppercase">Image Guidelines</p>
                             <p className="text-[10px] text-amber-700 font-medium">Clear photos with white backgrounds get 3x more inquiries. Avoid watermarks or contact numbers on images.</p>
                          </div>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>

            <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-100">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))} 
                className={`rounded-xl font-bold gap-2 ${currentStep === 1 ? 'invisible' : ''}`}
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              
              <div className="flex gap-3">
                 <Button variant="outline" className="rounded-xl font-bold border-slate-200 text-slate-500">Save Draft</Button>
                 <Button onClick={handleNext} className="rounded-xl px-8 bg-blue-600 hover:bg-blue-700 font-black gap-2 shadow-lg shadow-blue-500/20 shadow-blue-500/10">
                    {currentStep === 4 ? "Submit Listing" : "Continue"} <ArrowRight className="h-4 w-4" />
                 </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="rounded-[2rem] border-blue-100 bg-blue-50/30 p-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> B2B Listing Score
              </h3>
              <div className="space-y-4">
                 <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(currentStep/4)*100}%` }} />
                 </div>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">
                   Complete all steps to get a <span className="text-blue-600 font-black">TrustSeal</span> badge. Buyers prefer listings with HSN codes and clear Lead Times.
                 </p>
              </div>
           </Card>

           <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                 <FileText className="h-4 w-4" />
                 <span className="text-xs font-bold uppercase">Listing Agreement</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic">
                By submitting, you agree that your product complies with India's Trade & Tax policies. False HSN codes can lead to account suspension.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}