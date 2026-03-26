"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Info, 
  CheckCircle2, 
  Trash2, 
  Plus,
  Briefcase,
  Layers,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Identity", icon: Briefcase },
  { id: 2, title: "The Story", icon: Info },
  { id: 3, title: "Visuals", icon: ImageIcon },
];

const categories = [
  "Interior Design",
  "Full Renovation",
  "Furniture Setup",
  "Kitchen Modular",
  "Bathroom Styling",
  "Office Fit-out",
  "Lighting Design",
  "Landscape"
];

const statuses = ["Completed", "Under Construction", "Planned", "Draft"];

export default function AddProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    category: "",
    location: "",
    date: "",
    status: "Completed",
    description: "",
    challenges: "",
    solutions: "",
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const featuredInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFeaturedUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFeaturedImage(url);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setGallery(prev => [...prev, ...newImages].slice(0, 12));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit logic
      router.push("/dashboard/projects");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
               <Zap className="h-3 w-3 fill-primary" /> Showcase Builder
            </div>
            <h2 className="text-3xl font-black tracking-tight">Create New Portfolio</h2>
         </div>
         <Button variant="ghost" className="rounded-xl font-bold h-10 border border-border" onClick={() => router.push("/dashboard/projects")}>
            Cancel & Exit
         </Button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between px-2 overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center gap-4 flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                    isActive ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : 
                    isDone ? "bg-success/10 border-success/30 text-success" : 
                    "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-12 md:w-20 rounded-full ${isDone ? "bg-success/30" : "bg-muted"} mb-6 hidden sm:block`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
        <CardContent className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6 space-y-1">
                     <h3 className="text-xl font-black text-foreground tracking-tight">Project Identity</h3>
                     <p className="text-xs text-muted-foreground font-medium">Basic details that appear on your portfolio card</p>
                  </div>
                  <div className="grid gap-6">
                    <div className="space-y-3">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project Title</Label>
                      <Input 
                        placeholder="e.g. Modern Eco-Villas — Phase 1" 
                        className="h-14 rounded-2xl bg-muted/30 border-0 font-bold text-lg focus-visible:ring-primary" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                          <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                             <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0 font-bold">
                                <SelectValue placeholder="Select Category" />
                             </SelectTrigger>
                             <SelectContent>
                                {categories.map(cat => (
                                   <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Client / Entity Name (Optional)</Label>
                          <Input 
                            placeholder="e.g. Skyline Residency" 
                            className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" 
                            value={formData.client}
                            onChange={(e) => setFormData({...formData, client: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                          <div className="relative">
                             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                             <Input 
                              placeholder="City, State" 
                              className="h-14 rounded-2xl bg-muted/30 border-0 pl-12 font-bold" 
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Completion Date</Label>
                          <div className="relative">
                             <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                             <Input 
                              type="date" 
                              className="h-14 rounded-2xl bg-muted/30 border-0 pl-12 font-bold" 
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-accent pl-6 space-y-1">
                     <h3 className="text-xl font-black text-foreground tracking-tight">The Project Story</h3>
                     <p className="text-xs text-muted-foreground font-medium">Explain the execution and impact of this masterpiece</p>
                  </div>
                  <div className="grid gap-8">
                     <div className="space-y-3">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Executive Summary / Description</Label>
                        <Textarea 
                           placeholder="Describe the overall scope of the project..." 
                           className="rounded-2xl bg-muted/30 border-0 font-medium min-h-[140px] focus-visible:ring-accent" 
                           value={formData.description}
                           onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Key Challenges</Label>
                           <Textarea 
                              placeholder="What were the difficult parts?" 
                              className="rounded-xl bg-muted/30 border-0 font-medium min-h-[100px]" 
                              value={formData.challenges}
                              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                           />
                        </div>
                        <div className="space-y-3">
                           <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Innovations / Solutions</Label>
                           <Textarea 
                              placeholder="How did you solve them?" 
                              className="rounded-xl bg-muted/30 border-0 font-medium min-h-[100px]" 
                              value={formData.solutions}
                              onChange={(e) => setFormData({...formData, solutions: e.target.value})}
                           />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-success pl-6 space-y-1">
                        <h3 className="text-xl font-black text-foreground tracking-tight">Visual Showcase</h3>
                        <p className="text-xs text-muted-foreground font-medium">Upload high-res images to wow your buyers</p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Featured Image (Cover)</Label>
                        <input 
                           type="file" 
                           ref={featuredInputRef} 
                           onChange={handleFeaturedUpload} 
                           accept="image/*" 
                           className="hidden" 
                        />
                        <div 
                           onClick={() => featuredInputRef.current.click()}
                           className="aspect-[21/9] rounded-[2.5rem] border-4 border-dashed border-success/20 bg-success/5 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-success/10 hover:border-success/40 transition-all group overflow-hidden relative"
                        >
                           {featuredImage ? (
                              <>
                                 <img src={featuredImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                       <Upload className="h-6 w-6 text-white" />
                                    </div>
                                 </div>
                                 <Button 
                                    variant="destructive" 
                                    size="icon" 
                                    className="absolute top-4 right-4 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setFeaturedImage(null);
                                    }}
                                 >
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                              </>
                           ) : (
                              <>
                                 <div className="h-16 w-16 rounded-3xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Upload className="h-8 w-8 text-success" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-success">Click to Upload Cover</p>
                                    <p className="text-[9px] text-muted-foreground mt-1 font-bold">1920 x 820 or higher recommended</p>
                                 </div>
                              </>
                           )}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center justify-between ml-1">
                           <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Gallery Assets</Label>
                           <span className="text-[9px] font-black text-muted-foreground uppercase opacity-50">{gallery.length} / 12 Photos</span>
                        </div>
                        <input 
                           type="file" 
                           multiple 
                           ref={galleryInputRef} 
                           onChange={handleGalleryUpload} 
                           accept="image/*" 
                           className="hidden" 
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                           <div 
                              onClick={() => galleryInputRef.current.click()}
                              className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-all group"
                           >
                              <Plus className="h-5 w-5 text-muted-foreground/40 group-hover:text-muted-foreground" />
                           </div>
                           {gallery.map((img, i) => (
                              <div key={i} className="aspect-square rounded-2xl bg-muted/10 border-2 border-border/5 flex items-center justify-center relative group overflow-hidden">
                                 <img src={img} alt={`Gallery ${i}`} className="absolute inset-0 w-full h-full object-cover" />
                                 <button 
                                    onClick={() => setGallery(prev => prev.filter((_, index) => index !== i))}
                                    className="absolute top-2 right-2 h-6 w-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                 >
                                    <Trash2 className="h-3 w-3" />
                                 </button>
                              </div>
                           ))}
                           {Array.from({ length: Math.max(0, 5 - gallery.length) }).map((_, i) => (
                              <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-muted/10 border-2 border-border/5 flex items-center justify-center">
                                 <ImageIcon className="h-6 w-6 text-muted-foreground/10" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2.5rem] flex items-start gap-6">
                     <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10">
                        <Sparkles className="h-6 w-6 text-primary" />
                     </div>
                     <div className="space-y-2">
                        <p className="text-xs font-black text-foreground uppercase tracking-tight">Pro Tip for Showcase</p>
                        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Projects with high-resolution photos and detailed descriptions have a <span className="text-success font-black">40% higher conversion rate</span> from enterprise inquiries. Ensure your location and category are accurate for buyer discovery.</p>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* Footer Actions */}
        <div className="bg-muted/20 p-8 flex border-t items-center justify-between">
           <Button variant="ghost" onClick={handleBack} className={`rounded-xl h-12 px-6 font-bold gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
              <ArrowLeft className="h-4 w-4" /> Go Back
           </Button>
           
           <div className="flex gap-4">
              <Button variant="ghost" className="rounded-xl h-12 px-8 font-bold text-muted-foreground">Save as Draft</Button>
              <Button onClick={handleNext} className="rounded-xl h-12 px-10 bg-primary font-black shadow-xl shadow-primary/20 gap-2 min-w-[160px]">
                 {currentStep === steps.length ? "Publish Portfolio" : "Next Step"} <ArrowRight className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </Card>
      
      <div className="flex justify-center flex-col items-center gap-4 text-center opacity-50">
         <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] font-black">ISO 27001 SECURE</Badge>
            <Badge variant="outline" className="text-[9px] font-black">PORTFOLIO VERIFIED</Badge>
         </div>
      </div>
    </div>
  );
}
