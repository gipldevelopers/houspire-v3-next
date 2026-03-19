"use client";

import { useState } from "react";
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  Plus, 
  LifeBuoy, 
  FileText, 
  ChevronRight, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Hash,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const faqs = [
  {
    category: "Onboarding",
    questions: [
      "How do I verify my GSTIN?",
      "What documents are needed for registration?",
      "How to set up business hours?"
    ]
  },
  {
    category: "Products",
    questions: [
      "How to bulk upload products?",
      "Guidelines for product photography",
      "Managing inventory and stock status"
    ]
  },
  {
    category: "Payments",
    questions: [
      "When do I receive my payouts?",
      "How to change my bank account?",
      "Understanding transaction fees"
    ]
  }
];

const tickets = [
  {
    id: "#TKT-82910",
    subject: "GST Verification Pending for 48 hours",
    status: "open",
    priority: "high",
    date: "14 Mar 2026",
    category: "Account Verification"
  },
  {
    id: "#TKT-82755",
    subject: "Inquiry not loading for some products",
    status: "in-progress",
    priority: "medium",
    date: "12 Mar 2026",
    category: "Technical Issue"
  },
  {
    id: "#TKT-82102",
    subject: "Question about premium membership benefits",
    status: "closed",
    priority: "low",
    date: "08 Mar 2026",
    category: "General Query"
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusStyle = (status) => {
    switch (status) {
      case 'open': return "bg-accent/10 text-accent";
      case 'in-progress': return "bg-warning/10 text-warning";
      case 'closed': return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in-0 duration-500 pb-20">
      {/* Header Search Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-accent/5 border border-accent/10 p-12 md:p-16 text-center space-y-8">
         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <LifeBuoy className="h-64 w-64 rotate-12" />
         </div>
         <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">How can we help you today?</h2>
            <p className="text-muted-foreground font-medium">Search our knowledge base or get in touch with our experts.</p>
            <div className="mt-8 relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
               <Input 
                 placeholder="Search for articles, guides, and tutorials..." 
                 className="h-16 pl-14 pr-6 rounded-2xl bg-card border-2 border-border/50 shadow-xl text-lg font-bold placeholder:font-medium focus-visible:ring-accent"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>
      </div>

      <Tabs defaultValue="help-center" className="space-y-8">
        <TabsList className="bg-muted/50 p-1.5 h-14 rounded-2xl border border-border/50 shadow-sm">
           <TabsTrigger value="help-center" className="h-11 px-8 gap-2"><HelpCircle className="h-4 w-4" /> Help Center</TabsTrigger>
           <TabsTrigger value="tickets" className="h-11 px-8 gap-2"><MessageSquare className="h-4 w-4" /> Support Tickets</TabsTrigger>
           <TabsTrigger value="contact" className="h-11 px-8 gap-2"><Phone className="h-4 w-4" /> Direct Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="help-center" className="space-y-10 focus-visible:outline-none">
           {/* FAQ Categories */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {faqs.map((cat, i) => (
                 <Card key={i} className="rounded-[2rem] border-2 border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden bg-card/60 backdrop-blur-xl">
                    <CardHeader className="bg-muted/30 pb-4 border-b">
                       <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                          {cat.category} <ChevronRight className="h-4 w-4 text-accent/50 group-hover:translate-x-1 transition-transform" />
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-2">
                       {cat.questions.map((q, j) => (
                          <button key={j} className="w-full text-left p-3 rounded-xl hover:bg-accent/5 transition-all group/item flex items-center justify-between">
                             <span className="text-sm font-bold text-foreground/80 group-hover/item:text-foreground">{q}</span>
                             <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-accent" />
                          </button>
                       ))}
                    </CardContent>
                 </Card>
              ))}
           </div>
           
           {/* Featured Guide */}
           <div className="bg-card rounded-[2.5rem] border-2 border-border/50 shadow-xl overflow-hidden group cursor-pointer hover:border-accent/30 transition-all flex flex-col md:flex-row">
               <div className="w-full md:w-[40%] bg-muted/50 p-12 flex items-center justify-center border-b md:border-b-0 md:border-r">
                   <FileText className="h-32 w-32 text-accent/20 group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="flex-1 p-12 space-y-6">
                  <Badge className="bg-accent/10 text-accent text-[10px] uppercase font-black tracking-widest border-0 h-6 px-3">Featured Resource</Badge>
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black text-foreground tracking-tight">The Ultimate Vendor Success Guide</h3>
                     <p className="text-muted-foreground font-medium">Learn how to optimize your storefront, get more inquiries, and manage your payouts effectively.</p>
                  </div>
                  <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest gap-2 border-2 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                     Download Handbook <ExternalLink className="h-4 w-4" />
                  </Button>
               </div>
           </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-8 focus-visible:outline-none">
           <div className="flex items-end justify-between gap-6">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black tracking-tight">Active Tickets</h3>
                 <p className="text-sm text-muted-foreground font-medium">Manage and track your technical or account support requests.</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                   <Button className="h-12 px-8 rounded-xl bg-accent text-accent-foreground font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-accent/20">
                      <Plus className="h-5 w-5" /> Create New Ticket
                   </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="text-3xl font-black tracking-tighter">Support Ticket</DialogTitle>
                    <DialogDescription className="text-base font-bold text-muted-foreground/80">Our specialized team will reach out to you within 4-6 hours.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2.5">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Priority</Label>
                          <Select defaultValue="medium">
                             <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="low">Low PRIO</SelectItem>
                                <SelectItem value="medium">Medium PRIO</SelectItem>
                                <SelectItem value="high">Critical PRIO</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                          <Select>
                             <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0">
                                <SelectValue placeholder="Select Issue" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="billing">Billing & Payouts</SelectItem>
                                <SelectItem value="technical">Technical Bug</SelectItem>
                                <SelectItem value="account">Account Access</SelectItem>
                                <SelectItem value="products">Product Approval</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                    <div className="space-y-2.5">
                       <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</Label>
                       <Input placeholder="Brief title of your issue..." className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                    </div>
                    <div className="space-y-2.5">
                       <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                       <Textarea placeholder="Explain your issue in detail..." className="rounded-2xl bg-muted/30 border-0 min-h-[140px] font-medium" />
                    </div>
                  </div>
                  <DialogFooter className="pt-6">
                    <Button className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20">Submit Ticket</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
           </div>

           <div className="bg-card rounded-[2.5rem] border-2 border-border/50 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full border-collapse">
                    <thead>
                       <tr className="border-b bg-muted/20">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Incident Ref</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Subject</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Status</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Created On</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right w-20"></th>
                       </tr>
                    </thead>
                    <tbody>
                       {tickets.map((ticket, i) => (
                          <tr key={i} className="border-b last:border-0 hover:bg-muted/10 transition-colors group">
                             <td className="px-8 py-6">
                                <span className="text-sm font-black text-foreground tabular-nums">{ticket.id}</span>
                             </td>
                             <td className="px-8 py-6">
                                <div className="space-y-1">
                                   <p className="text-sm font-bold text-foreground line-clamp-1">{ticket.subject}</p>
                                   <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{ticket.category}</p>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <Badge className={`uppercase text-[9px] font-black tracking-widest h-6 px-3 border-0 rounded-full ${getStatusStyle(ticket.status)}`}>
                                   {ticket.status === 'in-progress' ? (
                                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Processing</span>
                                   ) : ticket.status === 'open' ? (
                                      <span className="flex items-center gap-1.5"><AlertCircle className="h-3 w-3" /> New</span>
                                   ) : (
                                      <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" /> Resolved</span>
                                   )}
                                </Badge>
                             </td>
                             <td className="px-8 py-6">
                                <span className="text-sm font-bold text-muted-foreground">{ticket.date}</span>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted rounded-xl hover:text-accent">
                                   <ChevronRight className="h-5 w-5" />
                                </Button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-10 focus-visible:outline-none">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-lg hover:shadow-2xl transition-all bg-card/60 backdrop-blur-xl group cursor-pointer overflow-hidden text-center p-12 space-y-6">
                 <div className="h-20 w-20 rounded-3xl bg-success/10 flex items-center justify-center mx-auto border-2 border-success/10 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-10 w-10 text-success" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">WhatsApp Support</h3>
                    <p className="text-sm text-muted-foreground font-medium">Chat directly with our team for instant replies during business hours.</p>
                 </div>
                 <Button className="w-full h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black uppercase tracking-widest text-xs rounded-2xl gap-3 shadow-xl shadow-success/20">
                    Open WhatsApp <ExternalLink className="h-4 w-4" />
                 </Button>
              </Card>

              <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-lg hover:shadow-2xl transition-all bg-card/60 backdrop-blur-xl group cursor-pointer overflow-hidden text-center p-12 space-y-6">
                 <div className="h-20 w-20 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/10 group-hover:scale-110 transition-transform">
                    <Mail className="h-10 w-10 text-accent" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">Email Support</h3>
                    <p className="text-sm text-muted-foreground font-medium">Send us your detailed query. We respond to all emails within 24 hours.</p>
                 </div>
                 <Button className="w-full h-14 bg-accent text-accent-foreground font-black uppercase tracking-widest text-xs rounded-2xl gap-3 shadow-xl shadow-accent/20">
                    support@houspire.com
                 </Button>
              </Card>

              <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-lg hover:shadow-2xl transition-all bg-card/60 backdrop-blur-xl group cursor-pointer overflow-hidden text-center p-12 space-y-6 md:col-span-2 lg:col-span-1">
                 <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto border-2 border-primary/10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">Account Manager</h3>
                    <p className="text-sm text-muted-foreground font-medium">Reserved for Premium Plan vendors for priority assistance.</p>
                 </div>
                 <Button variant="outline" className="w-full h-14 border-2 font-black uppercase tracking-widest text-xs rounded-2xl gap-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    Call 080-6000-xxxx
                 </Button>
              </Card>
           </div>
           
           <div className="bg-muted/30 border-2 border-border/50 rounded-[3rem] p-12 flex flex-col items-center text-center space-y-6">
               <div className="h-14 w-14 rounded-2xl bg-background flex items-center justify-center border-2 border-border shadow-md">
                   <Info className="h-6 w-6 text-muted-foreground" />
               </div>
               <div className="space-y-2 max-w-xl">
                  <h4 className="text-xl font-black tracking-tight">Helpful Links & Documents</h4>
                  <p className="text-sm text-muted-foreground font-medium">For critical issues or legal queries, please refer to our documentation.</p>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="ghost" className="rounded-xl h-10 px-5 text-[10px] font-black uppercase tracking-widest hover:bg-background border border-transparent hover:border-border transition-all">Privacy Policy</Button>
                  <Button variant="ghost" className="rounded-xl h-10 px-5 text-[10px] font-black uppercase tracking-widest hover:bg-background border border-transparent hover:border-border transition-all">Vendor Agreement</Button>
                  <Button variant="ghost" className="rounded-xl h-10 px-5 text-[10px] font-black uppercase tracking-widest hover:bg-background border border-transparent hover:border-border transition-all">Returns Policy</Button>
               </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
