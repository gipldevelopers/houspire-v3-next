import { useEffect, useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Star, Trophy } from "lucide-react";
const FAKE_BIDS = [{
  vendor: "WoodCraft Studios",
  product: "Modern Platform Bed",
  price: 18000,
  score: 8.5,
  productId: 101
}, {
  vendor: "LuxHome India",
  product: "Luxury King Bed",
  price: 22000,
  score: 9.1,
  productId: 102
}, {
  vendor: "UrbanNest",
  product: "Scandinavian Bed",
  price: 16500,
  score: 7.9,
  productId: 103
}, {
  vendor: "ComfortZone",
  product: "Upholstered Bed",
  price: 19500,
  score: 8.8,
  productId: 104
}];
export const AuctionStep = () => {
  const {
    setBids,
    selectBid,
    setStage,
    project
  } = useProject();
  const [phase, setPhase] = useState("waiting");
  const [countdown, setCountdown] = useState(10);
  const [selectedBidIdx, setSelectedBidIdx] = useState(null);
  useEffect(() => {
    if (phase === "waiting" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === "waiting" && countdown === 0) {
      setBids(FAKE_BIDS);
      setPhase("bidding");
    }
  }, [phase, countdown, setBids]);
  const handleSelect = idx => {
    setSelectedBidIdx(idx);
    selectBid(FAKE_BIDS[idx]);
  };
  if (phase === "waiting") {
    return <div className="flex flex-col h-full items-center justify-center text-center">
        <motion.div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6" animate={{
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <Clock className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="font-display text-xl font-semibold mb-2">Live Auction</h2>
        <p className="text-sm text-muted-foreground mb-6">Waiting for vendor bids…</p>
        <div className="text-4xl font-display font-bold text-primary">{countdown}s</div>
        <p className="text-xs text-muted-foreground mt-2">Vendors are placing bids</p>
      </div>;
  }
  return <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h2 className="font-display text-xl font-semibold">Bids Received</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {FAKE_BIDS.length} vendors competed for your room.
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto">
        <AnimatePresence>
          {FAKE_BIDS.map((bid, i) => <motion.div key={i} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: i * 0.15
        }} onClick={() => handleSelect(i)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedBidIdx === i ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-semibold">{bid.vendor}</h4>
                  <p className="text-xs text-muted-foreground">{bid.product}</p>
                </div>
                {i === 0 && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    Best Value
                  </span>}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-foreground">
                  ₹{bid.price.toLocaleString("en-IN")}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-sm font-medium">{bid.score}</span>
                </div>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>

      {selectedBidIdx !== null && <motion.button initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} onClick={() => setStage("FINAL")} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          Confirm Selection
          <ArrowRight className="w-4 h-4" />
        </motion.button>}
    </div>;
};