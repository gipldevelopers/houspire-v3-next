import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { ShoppingBag, Gavel } from "lucide-react";
export const ModeStep = () => {
  const {
    setMode,
    setStage
  } = useProject();
  const handleBrowse = () => {
    setMode("browse");
    setStage("BROWSE");
  };
  const handleAuction = () => {
    setMode("auction");
    setStage("AUCTION");
  };
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">Choose Mode</h2>
      <p className="text-sm text-muted-foreground mb-8">
        How would you like to find products?
      </p>

      <div className="flex-1 flex flex-col gap-4 justify-center">
        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} onClick={handleBrowse} className="p-6 rounded-xl border-2 border-border hover:border-primary bg-card text-left transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display text-base font-semibold mb-1">Browse Products</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Explore curated products at your own pace. Preview them in your room instantly.
          </p>
        </motion.button>

        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} onClick={handleAuction} className="p-6 rounded-xl border-2 border-border hover:border-primary bg-card text-left transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Gavel className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display text-base font-semibold mb-1">Start Auction</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Let vendors compete for your room. Get the best deals through live bidding.
          </p>
        </motion.button>
      </div>
    </div>;
};