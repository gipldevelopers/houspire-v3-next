// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Building2, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   CheckCircle2, 
//   ArrowRight, 
//   ArrowLeft, 
//   ShieldCheck,
//   Package,
//   Star
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// const steps = [
//   { id: 1, title: "Welcome", icon: Star },
//   { id: 2, title: "Business Info", icon: Building2 },
//   { id: 3, title: "Contact", icon: Mail },
//   { id: 4, title: "Categories", icon: Package },
//   { id: 5, title: "Complete", icon: CheckCircle2 }
// ];

// const categories = [
//   "Furniture", "Lighting", "Flooring", "Bath & Sanitary", "Kitchen", "Decor", "Materials", "Hardware"
// ];

// export default function VendorRegister() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     businessName: "",
//     businessType: "Manufacturer",
//     email: "",
//     phone: "",
//     city: "",
//     categories: []
//   });

//   const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

//   const toggleCategory = (cat) => {
//     setFormData(prev => ({
//       ...prev,
//       categories: prev.categories.includes(cat) 
//         ? prev.categories.filter(c => c !== cat) 
//         : [...prev.categories, cat]
//     }));
//   };

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-muted/30 flex items-center justify-center p-4">
//       <div className="max-w-4xl w-full grid md:grid-cols-[300px_1fr] bg-card rounded-2xl shadow-xl border overflow-hidden">
        
//         {/* Left Sidebar - Progress */}
//         <div className="bg-primary p-8 text-primary-foreground hidden md:block">
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-xl font-bold">Vendor Registration</h2>
//               <p className="text-sm opacity-60 mt-1">Join the interior revolution</p>
//             </div>
            
//             <div className="space-y-4">
//               {steps.map((s) => {
//                 const Icon = s.icon;
//                 const isActive = step === s.id;
//                 const isCompleted = step > s.id;
                
//                 return (
//                   <div key={s.id} className="flex items-center gap-4 transition-all duration-300">
//                     <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${
//                       isActive ? 'bg-accent border-accent text-accent-foreground scale-110 shadow-lg' : 
//                       isCompleted ? 'bg-success border-success text-success-foreground' : 'border-primary-foreground/20 text-primary-foreground/40'
//                     }`}>
//                       {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{s.id}</span>}
//                     </div>
//                     <div className={`space-y-0.5 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
//                       <p className="text-xs font-bold uppercase tracking-wider">{s.title}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="pt-8 border-t border-white/10 mt-auto">
//               <div className="flex items-center gap-2 text-xs opacity-70">
//                 <ShieldCheck className="h-4 w-4 text-accent" />
//                 <span>Verified Business Badge</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Content Area - Forms */}
//         <div className="p-8 md:p-12 relative flex flex-col">
//           <AnimatePresence mode="wait">
//             {step === 1 && (
//               <motion.div 
//                 key="step1"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-black text-foreground">Grow your business with Houspire</h1>
//                   <p className="text-muted-foreground">Join 3,200+ verified interior vendors reaching architects, designers, and homeowners across India.</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
//                     <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
//                       <Star className="h-5 w-5" />
//                     </div>
//                     <h3 className="font-bold text-sm">Verified Leads</h3>
//                     <p className="text-xs text-muted-foreground">Direct inquiries from genuine buyers</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
//                     <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
//                       <Package className="h-5 w-5" />
//                     </div>
//                     <h3 className="font-bold text-sm">Digital Showroom</h3>
//                     <p className="text-xs text-muted-foreground">List unlimited products for free</p>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <Button onClick={nextStep} className="w-full h-12 text-base font-bold gap-2 group">
//                     Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div 
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-1">
//                   <h2 className="text-2xl font-bold">Business Information</h2>
//                   <p className="text-sm text-muted-foreground">Tell us about your brand</p>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold opacity-70">Business Showroom Name</label>
//                     <Input 
//                       placeholder="e.g. Royal Furniture Studio" 
//                       value={formData.businessName}
//                       onChange={(e) => setFormData({...formData, businessName: e.target.value})}
//                       className="h-12"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold opacity-70">Registration Type</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       {["Manufacturer", "Retailer", "Distributor", "Importer"].map(type => (
//                         <button
//                           key={type}
//                           onClick={() => setFormData({...formData, businessType: type})}
//                           className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
//                             formData.businessType === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted'
//                           }`}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold">Continue</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 3 && (
//               <motion.div 
//                 key="step3"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-1">
//                   <h2 className="text-2xl font-bold">Contact Details</h2>
//                   <p className="text-sm text-muted-foreground">How should customers reach you?</p>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold opacity-70">Official Email</label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input 
//                         placeholder="business@example.com" 
//                         className="pl-10 h-12"
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold opacity-70">Phone Number</label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input 
//                         placeholder="+91 XXXXX XXXXX" 
//                         className="pl-10 h-12"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-bold opacity-70">Primary City</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input 
//                         placeholder="Search city..." 
//                         className="pl-10 h-12"
//                         value={formData.city}
//                         onChange={(e) => setFormData({...formData, city: e.target.value})}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold">Continue</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 4 && (
//               <motion.div 
//                 key="step4"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-1">
//                   <h2 className="text-2xl font-bold">Select Categories</h2>
//                   <p className="text-sm text-muted-foreground">Choose the categories that best describe your products</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-2">
//                   {categories.map(cat => (
//                     <button
//                       key={cat}
//                       onClick={() => toggleCategory(cat)}
//                       className={`p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
//                         formData.categories.includes(cat) ? 'bg-accent/10 border-accent text-accent font-bold' : 'bg-card hover:bg-muted'
//                       }`}
//                     >
//                       {cat}
//                       {formData.categories.includes(cat) && <CheckCircle2 className="h-4 w-4" />}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90">Complete Registration</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 5 && (
//               <motion.div 
//                 key="step5"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="text-center space-y-6 py-8"
//               >
//                 <div className="h-20 w-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto">
//                   <CheckCircle2 className="h-10 w-10" strokeWidth={3} />
//                 </div>
//                 <div className="space-y-2">
//                   <h2 className="text-3xl font-black">Registration Submitted!</h2>
//                   <p className="text-muted-foreground max-w-sm mx-auto">Thank you for joining Houspire. Our team will review your business details and contact you within 24 hours.</p>
//                 </div>
//                 <div className="pt-4 space-y-3">
//                   <Link href="/dashboard">
//                     <Button className="w-full h-12 font-bold">Go to Dashboard Preview</Button>
//                   </Link>
//                   <Link href="/">
//                     <Button variant="outline" className="w-full h-12 font-bold">Back to Homepage</Button>
//                   </Link>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Building2, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   CheckCircle2, 
//   ArrowRight, 
//   ArrowLeft, 
//   ShieldCheck,
//   Package,
//   Star,
//   FileText,
//   Globe,
//   Briefcase,
//   Store,
//   UploadCloud,
//   UserCheck
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// const steps = [
//   { id: 1, title: "Partnership", desc: "Start journey", icon: Star },
//   { id: 2, title: "Legal Identity", desc: "Tax & Business", icon: Building2 },
//   { id: 3, title: "Operations", desc: "Contact & Reach", icon: MapPin },
//   { id: 4, title: "Showroom", desc: "Catalog Type", icon: Package },
//   { id: 5, title: "Review", desc: "Final Submission", icon: UserCheck }
// ];

// const categories = [
//   "Premium Furniture", "Architectural Lighting", "Italian Flooring", "Modular Kitchen", 
//   "Luxury Decor", "Raw Materials", "Smart Hardware", "Home Automation", "Office Solutions"
// ];

// export default function VendorRegister() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     businessName: "",
//     legalName: "",
//     gstin: "",
//     pan: "",
//     businessType: "Manufacturer",
//     estYear: "",
//     website: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     categories: [],
//     acceptTerms: false
//   });

//   const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

//   const toggleCategory = (cat) => {
//     setFormData(prev => ({
//       ...prev,
//       categories: prev.categories.includes(cat) 
//         ? prev.categories.filter(c => c !== cat) 
//         : [...prev.categories, cat]
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8">
//       <div className="max-w-6xl w-full grid lg:grid-cols-[350px_1fr] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
//         {/* Left Sidebar - High End Branding */}
//         <div className="bg-[#0f172a] p-10 text-white hidden lg:flex flex-col justify-between relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
//           <div className="relative z-10">
//             <div className="flex items-center gap-2 mb-12">
//               <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
//                 <Store className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold tracking-tight">Houspire<span className="text-primary text-4xl leading-none">.</span></span>
//             </div>

//             <div className="space-y-10">
//               {steps.map((s) => {
//                 const Icon = s.icon;
//                 const isActive = step === s.id;
//                 const isCompleted = step > s.id;
                
//                 return (
//                   <div key={s.id} className="flex items-start gap-4">
//                     <div className={`mt-1 h-10 w-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
//                       isActive ? 'bg-primary border-primary text-white scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
//                       isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 text-slate-500'
//                     }`}>
//                       {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
//                     </div>
//                     <div>
//                       <p className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>{s.title}</p>
//                       <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="relative z-10 pt-10 border-t border-slate-800">
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
//               <ShieldCheck className="h-8 w-8 text-primary" />
//               <div>
//                 <p className="text-xs font-bold">Secure Onboarding</p>
//                 <p className="text-[10px] text-slate-400">ISO 27001 Certified Environment</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Content Area */}
//         <div className="p-8 lg:p-16 bg-white overflow-y-auto max-h-[90vh]">
//           <AnimatePresence mode="wait">
//             {step === 1 && (
//               <motion.div 
//                 key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//                 className="space-y-8"
//               >
//                 <div className="space-y-3">
//                   <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-4 py-1">Vendor Portal</Badge>
//                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">Scale your trade <br />business nationally.</h1>
//                   <p className="text-slate-500 text-lg">Join India's most exclusive network of interior suppliers and manufacturers.</p>
//                 </div>
                
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   {[
//                     { title: "Direct RFQs", desc: "Get high-intent bulk quotes from architects.", icon: FileText, color: "text-blue-500" },
//                     { title: "Smart Logistics", desc: "Integrated shipping for heavy materials.", icon: Package, color: "text-orange-500" }
//                   ].map((item, i) => (
//                     <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-primary/20 transition-colors">
//                       <item.icon className={`h-8 w-8 ${item.color}`} />
//                       <h3 className="font-bold text-slate-900">{item.title}</h3>
//                       <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <Button onClick={nextStep} className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 group">
//                   Begin Registration <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div 
//                 key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//                 className="space-y-8"
//               >
//                 <div className="space-y-1 text-center lg:text-left">
//                   <h2 className="text-3xl font-bold text-slate-900">Legal Identity</h2>
//                   <p className="text-slate-500 text-sm">Official details for tax and invoicing purposes</p>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-2 md:col-span-2">
//                     <label className="text-sm font-semibold text-slate-700">Registered Business Name (as per GST)</label>
//                     <Input placeholder="Enter legal business name" className="h-12 bg-slate-50/50" 
//                       value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-700">GSTIN Number</label>
//                     <Input placeholder="22AAAAA0000A1Z5" className="h-12 bg-slate-50/50 uppercase" 
//                        value={formData.gstin} onChange={(e) => setFormData({...formData, gstin: e.target.value})} />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-700">PAN Number</label>
//                     <Input placeholder="ABCDE1234F" className="h-12 bg-slate-50/50 uppercase" 
//                        value={formData.pan} onChange={(e) => setFormData({...formData, pan: e.target.value})} />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-700">Year of Establishment</label>
//                     <Input type="number" placeholder="YYYY" className="h-12 bg-slate-50/50" />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-700">Website (Optional)</label>
//                     <div className="relative">
//                       <Globe className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
//                       <Input placeholder="www.yourbrand.com" className="h-12 bg-slate-50/50 pl-10" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 pt-4 border-t border-slate-100">
//                   <Button variant="outline" onClick={prevStep} className="h-12 px-8 rounded-xl">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 rounded-xl font-bold">Continue to Operations</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 3 && (
//               <motion.div 
//                 key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//                 className="space-y-8"
//               >
//                 <div className="space-y-1">
//                   <h2 className="text-3xl font-bold text-slate-900">Operations & Contact</h2>
//                   <p className="text-slate-500 text-sm">Where do you operate from?</p>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold text-slate-700 text-slate-700">Primary Contact Email</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
//                         <Input placeholder="orders@yourbusiness.com" className="pl-10 h-12" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold text-slate-700">Contact Number</label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
//                         <Input placeholder="+91 99999 99999" className="pl-10 h-12" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-700">Warehouse/Showroom Address</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
//                       <Input placeholder="Full street address, industrial area, etc." className="pl-10 h-12" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <Input placeholder="City" className="h-12" />
//                     <Input placeholder="State" className="h-12" />
//                     <Input placeholder="Pincode" className="h-12" />
//                   </div>
//                 </div>

//                 <div className="flex gap-4 pt-4">
//                   <Button variant="outline" onClick={prevStep} className="h-12 px-8 rounded-xl">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 rounded-xl font-bold">Category Selection</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 4 && (
//               <motion.div 
//                 key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//                 className="space-y-8"
//               >
//                 <div className="space-y-1">
//                   <h2 className="text-3xl font-bold text-slate-900">Merchant Categories</h2>
//                   <p className="text-slate-500 text-sm">Identify your core product groups for correct indexing.</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   {categories.map(cat => (
//                     <button
//                       key={cat}
//                       onClick={() => toggleCategory(cat)}
//                       className={`p-4 rounded-2xl border text-sm transition-all text-left flex flex-col justify-between h-28 ${
//                         formData.categories.includes(cat) 
//                         ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary' 
//                         : 'bg-white hover:border-slate-300'
//                       }`}
//                     >
//                       <span className="font-bold">{cat}</span>
//                       {formData.categories.includes(cat) ? (
//                         <CheckCircle2 className="h-6 w-6 self-end" />
//                       ) : (
//                         <div className="h-6 w-6 border-2 border-slate-200 rounded-full self-end" />
//                       )}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
//                    <div className="flex items-center gap-3">
//                       <UploadCloud className="h-6 w-6 text-primary" />
//                       <div>
//                         <p className="text-sm font-bold">Catalog Document</p>
//                         <p className="text-xs text-slate-400">PDF, XLS or CSV allowed (Max 10MB)</p>
//                       </div>
//                    </div>
//                    <Button size="sm" variant="secondary">Upload File</Button>
//                 </div>

//                 <div className="flex gap-4 pt-4">
//                   <Button variant="outline" onClick={prevStep} className="h-12 px-8 rounded-xl">Back</Button>
//                   <Button onClick={nextStep} className="flex-1 h-12 rounded-xl font-bold bg-primary hover:bg-primary/90">Review Details</Button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 5 && (
//               <motion.div 
//                 key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
//                 className="text-center space-y-8 py-4"
//               >
//                 <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto rotate-3">
//                   <ShieldCheck className="h-12 w-12" strokeWidth={2.5} />
//                 </div>
//                 <div className="space-y-3">
//                   <h2 className="text-4xl font-black text-slate-900">Verification in Progress</h2>
//                   <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
//                     Our compliance team will verify your GSTIN and Business credentials. You'll receive a confirmation on your email within 24 working hours.
//                   </p>
//                 </div>

//                 <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100 space-y-4">
//                    <h4 className="text-sm font-bold uppercase text-slate-400 tracking-widest">Next Steps</h4>
//                    <div className="space-y-3">
//                       <div className="flex items-center gap-3 text-sm text-slate-700">
//                         <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">1</div>
//                         Account manager assignment
//                       </div>
//                       <div className="flex items-center gap-3 text-sm text-slate-700">
//                         <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">2</div>
//                         Product catalog mapping
//                       </div>
//                       <div className="flex items-center gap-3 text-sm text-slate-700">
//                         <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">3</div>
//                         Live digital showroom launch
//                       </div>
//                    </div>
//                 </div>

//                 <div className="pt-4 flex flex-col sm:flex-row gap-3">
//                   <Link href="/dashboard" className="flex-1">
//                     <Button className="w-full h-14 font-bold rounded-xl">Go to Partner Dashboard</Button>
//                   </Link>
//                   <Link href="/" className="flex-1">
//                     <Button variant="outline" className="w-full h-14 font-bold rounded-xl">Marketplace Home</Button>
//                   </Link>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Package,
  Globe,
  FileText,
  BadgeCheck,
  Briefcase,
  Store,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const steps = [
  { id: 1, title: "Identity", desc: "Basic Details", icon: Users },
  { id: 2, title: "Business", desc: "Legal & Type", icon: Building2 },
  { id: 3, title: "Verification", desc: "GST & Documents", icon: ShieldCheck },
  { id: 4, title: "Portfolio", desc: "Categories", icon: Package },
  { id: 5, title: "Success", desc: "Review", icon: CheckCircle2 }
];

const categories = [
  "Modular Furniture", "Architectural Glass", "Premium Lighting", 
  "Natural Stone", "Smart Home Tech", "Bath Fittings", "Hardware", "Textiles"
];

export default function VendorRegister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "Manufacturer",
    gstNumber: "",
    panNumber: "",
    yearEstablished: "",
    website: "",
    city: "",
    address: "",
    categories: [],
    employeeCount: "1-10"
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-[350px_1fr] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        
        {/* Left Sidebar: Branding & Progress */}
        <div className="bg-[#0f172a] p-10 text-white relative flex flex-col justify-between overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-12">
            <div>
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center mb-4">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Houspire Seller</h2>
              <p className="text-slate-400 text-sm mt-2">The largest B2B ecosystem for Interior Infrastructure in India.</p>
            </div>
            
            <div className="space-y-8">
              {steps.slice(0, 4).map((s) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                
                return (
                  <div key={s.id} className="flex items-center gap-5">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      isActive ? 'bg-primary border-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
                      isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-slate-700 bg-slate-800/50'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-slate-500'}`}>{s.title}</p>
                      <p className="text-sm font-medium text-slate-300">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm text-white">Trust Seal Verified</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upon completion, your business will undergo a verification process to receive the Houspire Gold Supplier badge.
            </p>
          </div>
        </div>

        {/* Right Content: Form Fields */}
        <div className="p-8 md:p-16 bg-white overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <motion.div key="st1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Step 01</span>
                  <h1 className="text-4xl font-black text-slate-900">Create your account</h1>
                  <p className="text-slate-500 text-lg">Enter the primary contact person details for this business.</p>
                  <p className="text-sm font-medium">Already have a seller account? <Link href="/signin" className="text-primary font-extrabold hover:underline">Sign In</Link></p>
                </div>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Full Name</Label>
                    <Input placeholder="John Doe" className="h-14 rounded-xl border-slate-200 focus:ring-primary" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Mobile Number</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
                        <Input className="h-14 pl-14 rounded-xl" placeholder="98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Work Email</Label>
                      <Input placeholder="john@company.com" className="h-14 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                </div>

                <Button onClick={nextStep} className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
                  Continue to Business Details <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* STEP 2: Business Info (IndiaMart Inspired) */}
            {step === 2 && (
              <motion.div key="st2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Step 02</span>
                  <h2 className="text-3xl font-black text-slate-900">Business Profile</h2>
                  <p className="text-slate-500">Helping buyers understand your manufacturing/trading capacity.</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Company Name (As per GST)</Label>
                    <Input placeholder="Acme Furniture Pvt Ltd" className="h-14 rounded-xl" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold">Primary Business Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Manufacturer", "Wholesaler", "Retailer", "Service Provider"].map(type => (
                        <button key={type} onClick={() => setFormData({...formData, businessType: type})} 
                          className={`p-4 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                            formData.businessType === type ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}>
                          <Store className="h-5 w-5" />
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Year Established</Label>
                      <Input type="number" placeholder="e.g. 1995" className="h-14 rounded-xl" value={formData.yearEstablished} onChange={e => setFormData({...formData, yearEstablished: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Company Website (Optional)</Label>
                      <Input placeholder="https://www.example.com" className="h-14 rounded-xl" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="h-14 px-8 rounded-xl">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">Next: Verification</Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Verification (The "Robust" Part) */}
            {step === 3 && (
              <motion.div key="st3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Step 03</span>
                  <h2 className="text-3xl font-black text-slate-900">KYC & Verification</h2>
                  <p className="text-slate-500">Verified vendors get 10x more inquiries than unverified ones.</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4">
                  <FileText className="text-amber-600 h-6 w-6 shrink-0" />
                  <p className="text-sm text-amber-800">Please provide valid tax identification. We will run a real-time check against the GST portal.</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold uppercase text-xs">GSTIN Number</Label>
                    <Input placeholder="22AAAAA0000A1Z5" className="h-14 rounded-xl font-mono uppercase" value={formData.gstNumber} onChange={e => setFormData({...formData, gstNumber: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold uppercase text-xs">Permanent Account Number (PAN)</Label>
                    <Input placeholder="ABCDE1234F" className="h-14 rounded-xl font-mono uppercase" value={formData.panNumber} onChange={e => setFormData({...formData, panNumber: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold uppercase text-xs">Registered City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input className="h-14 pl-12 rounded-xl" placeholder="Mumbai, Maharashtra" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="h-14 px-8 rounded-xl">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">Submit for Review</Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Product Portfolio */}
            {step === 4 && (
              <motion.div key="st4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase">Step 04</span>
                  <h2 className="text-3xl font-black text-slate-900">What do you sell?</h2>
                  <p className="text-slate-500">Select categories to list your products in the right marketplace sections.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => toggleCategory(cat)} 
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        formData.categories.includes(cat) ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                      }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{cat}</span>
                        {formData.categories.includes(cat) && <CheckCircle2 className="h-5 w-5 fill-primary text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="outline" onClick={prevStep} className="h-14 px-8 rounded-xl">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30">Finalize Registration</Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Success (IndiaMart Style Review Message) */}
            {step === 5 && (
              <motion.div key="st5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-8">
                <div className="relative inline-block">
                  <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <BadgeCheck className="h-12 w-12" />
                  </div>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-1 -right-1 h-8 w-8 bg-primary rounded-full border-4 border-white flex items-center justify-center text-[10px] font-bold text-white">
                    PRO
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Application Under Review</h2>
                  <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                    Our catalog team is currently reviewing your GST information (**{formData.gstNumber}**). 
                    You will receive a call from your dedicated account manager within **2 working hours**.
                  </p>
                </div>

                <div className="grid gap-4 max-w-sm mx-auto pt-6">
                  <Link href="/seller/dashboard">
                    <Button className="w-full h-14 font-bold text-lg rounded-xl">Enter Seller Dashboard</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full h-14 font-bold text-slate-500 hover:text-slate-900">Return to Homepage</Button>
                  </Link>
                </div>
                
                <p className="text-xs text-slate-400">Reference ID: HS-{Math.floor(Math.random() * 900000 + 100000)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}