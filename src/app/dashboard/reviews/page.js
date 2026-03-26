"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const reviews = [
  {
    id: 1,
    customer: "Rohan Sharma",
    rating: 5,
    date: "15 Mar 2026",
    product: "Solid Teak Dining Table",
    comment: "Excellent craftsmanship. The wood grain is beautiful and perfectly seasoned. Delivery was on time and setup was professional.",
    status: "responded",
    reply: "Thank you for your kind words! We take great pride in our teak selection."
  },
  {
    id: 2,
    customer: "Priya Patel",
    rating: 4,
    date: "12 Mar 2026",
    product: "Modern L-Shape Sofa",
    comment: "Very comfortable and fits the room perfectly. Minor scratch on the leg but fixed immediately by the assembly team.",
    status: "new",
    reply: null
  },
  {
    id: 3,
    customer: "Anand Deshmukh",
    rating: 3,
    date: "10 Mar 2026",
    product: "Smart Kitchen Modular Set",
    comment: "Design is good but took longer than expected for installation. Quality of hinges could be better for this price point.",
    status: "new",
    reply: null
  }
];

const ratingsDistribution = [
  { star: 5, count: 124, percentage: 70 },
  { star: 4, count: 32, percentage: 18 },
  { star: 3, count: 12, percentage: 7 },
  { star: 2, count: 5, percentage: 3 },
  { star: 1, count: 3, percentage: 2 },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [localReviews, setLocalReviews] = useState(reviews);
  const [replyText, setReplyText] = useState("");

  const handlePublishResponse = (id) => {
    if (!replyText.trim()) return;

    setLocalReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'responded', reply: replyText } : r
    ));
    
    toast.success("Response Published", {
      description: "Asset committed to public reputation thread."
    });
    setReplyText("");
  };

  const filteredReviews = localReviews.filter(r => {
    const matchesFilter = filter === "all" ? true : (filter === "new" ? r.status === "new" : r.rating <= 3);
    const matchesSearch = r.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header & Overview Section */}
      <div className="flex flex-col xl:flex-row gap-10">
         <div className="flex-1 space-y-2">
            <h2 className="text-4xl font-black text-foreground tracking-tight underline decoration-primary/20 decoration-8 underline-offset-8">Vendor Reputation</h2>
            <div className="text-sm text-muted-foreground font-medium italic">Your public trust score directly impacts your placement in search results.</div>
            
            <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-xl p-8 bg-card/50 flex items-center gap-8 group">
                  <div className="h-20 w-20 rounded-3xl bg-accent/10 flex flex-col items-center justify-center border-2 border-accent/20 group-hover:scale-110 transition-transform duration-500">
                     <span className="text-3xl font-black text-accent tracking-tighter">4.8</span>
                     <div className="flex items-center gap-0.5 mt-[-4px]">
                        {[1,2,3,4].map(i => <Star key={i} className="h-2 w-2 fill-accent text-accent" />)}
                        <Star className="h-2 w-2 text-accent" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Rating</div>
                     <div className="text-sm font-bold text-foreground">Top 5% in Furniture Category</div>
                  </div>
               </Card>

               <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-xl p-8 bg-card/50 flex items-center gap-8 group">
                  <div className="h-20 w-20 rounded-3xl bg-success/10 flex flex-col items-center justify-center border-2 border-success/20 group-hover:scale-110 transition-transform duration-500">
                     <ThumbsUp className="h-10 w-10 text-success" />
                  </div>
                  <div className="space-y-1">
                     <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Customer Love</div>
                     <div className="text-sm font-bold text-foreground">92% Positive Feedback Rate</div>
                  </div>
               </Card>
            </div>
         </div>

         <Card className="xl:w-80 rounded-[2.5rem] border-2 border-border/50 shadow-xl p-8 bg-card/50 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Rating Analysis</h4>
            <div className="space-y-4">
               {ratingsDistribution.map(item => (
                  <div key={item.star} className="space-y-1.5 group cursor-pointer">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">{item.star} <Star className="h-3 w-3 fill-accent text-accent" /> Stars</span>
                        <span className="text-muted-foreground">{item.count}</span>
                     </div>
                     <Progress value={item.percentage} className="h-1.5 rounded-full bg-muted" indicatorClassName="bg-accent" />
                  </div>
               ))}
            </div>
            <Button variant="ghost" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-muted text-primary">Get Verified Badge <ChevronRight className="h-4 w-4 ml-1" /></Button>
         </Card>
      </div>

      <Separator className="bg-border/50" />

      {/* Main Reviews Thread */}
      <div className="space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex bg-muted p-1 rounded-xl w-fit">
               {['all', 'new', 'critical'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                       filter === f ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                     {f} reviews
                  </button>
               ))}
            </div>
            <div className="relative group md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <Input 
                 placeholder="Search within reviews..." 
                 className="h-11 pl-10 rounded-xl bg-card border-border shadow-sm text-xs font-bold" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="grid gap-8">
            {filteredReviews.map((rev, i) => (
               <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
               >
                  <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-lg overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all bg-card/60 backdrop-blur-xl">
                     <CardContent className="p-10 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                           <div className="flex items-center gap-5">
                              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-xl font-black text-muted-foreground/50 border border-border/50">
                                 {rev.customer[0]}
                              </div>
                              <div className="space-y-1">
                                 <h4 className="font-extrabold text-lg text-foreground tracking-tight">{rev.customer}</h4>
                                 <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-0.5">
                                       {[1,2,3,4,5].map(j => (
                                          <Star key={j} className={`h-3 w-3 ${j <= rev.rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`} />
                                       ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                       <Calendar className="h-3 w-3" /> {rev.date}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <Badge className="bg-primary/5 text-primary border-primary/20 font-black text-[9px] h-6 px-3 uppercase tracking-widest rounded-full">{rev.product}</Badge>
                        </div>

                        <div className="space-y-4">
                           <div className="text-foreground/80 font-medium leading-relaxed italic text-lg border-l-4 border-accent/20 pl-6">"{rev.comment}"</div>
                        </div>

                        {rev.reply ? (
                           <div className="bg-success/5 border border-success/10 rounded-2xl p-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                              <div className="flex items-center gap-3">
                                 <Reply className="h-4 w-4 text-success -scale-100" />
                                 <div className="text-[10px] font-black uppercase text-success tracking-widest">Your Response</div>
                              </div>
                              <div className="text-sm font-bold text-foreground pl-7">{rev.reply}</div>
                           </div>
                        ) : (
                           <Dialog>
                              <DialogTrigger asChild>
                                 <Button variant="outline" className="h-12 px-8 rounded-xl border-2 border-primary/20 font-black text-xs uppercase tracking-widest gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                    <Reply className="h-4 w-4 -scale-100" /> Write a Public Response
                                 </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-[2.5rem] border-2">
                                 <DialogHeader className="mb-4">
                                    <DialogTitle className="text-2xl font-black tracking-tight">Responding to {rev.customer}</DialogTitle>
                                    <DialogDescription className="text-sm font-medium">Professional responses help build long-term buyer confidence.</DialogDescription>
                                 </DialogHeader>
                                 <div className="bg-muted/50 p-4 rounded-xl border italic text-sm font-medium mb-4">"{rev.comment}"</div>
                                 <Textarea 
                                   placeholder="Thank the customer or address their concerns professionally..." 
                                   className="min-h-[150px] rounded-2xl bg-muted/40 border-0 focus-visible:ring-primary font-medium"
                                   value={replyText}
                                   onChange={(e) => setReplyText(e.target.value)}
                                 />
                                 <DialogFooter>
                                    <Button 
                                      className="w-full h-14 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
                                      onClick={() => handlePublishResponse(rev.id)}
                                    >
                                      Publish Response
                                    </Button>
                                 </DialogFooter>
                              </DialogContent>
                           </Dialog>
                        )}
                     </CardContent>
                  </Card>
               </motion.div>
            ))}
         </div>
      </div>

      {/* Trust Insight Footer */}
      <div className="bg-muted/30 border-2 border-border/50 rounded-[4rem] p-12 text-center space-y-6 flex flex-col items-center group cursor-pointer hover:bg-muted/50 transition-all">
          <div className="h-20 w-20 rounded-3xl bg-background flex items-center justify-center border-2 border-border shadow-md group-hover:scale-110 transition-transform duration-700">
             <AlertCircle className="h-10 w-10 text-destructive/40" />
          </div>
          <div className="space-y-2 max-w-xl">
             <div className="text-2xl font-black tracking-tight uppercase">Critical Feedback Policy</div>
             <div className="text-sm text-muted-foreground font-medium">Unprofessional or aggressive responses can lead to account suspension. Always maintain a tone of helpfulness even when addressing negative feedback.</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
             <Button variant="outline" className="h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest border-border/50">Response Guidelines</Button>
             <Button variant="outline" className="h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest border-border/50">Report Abusive Review</Button>
          </div>
      </div>
    </div>
  );
}
