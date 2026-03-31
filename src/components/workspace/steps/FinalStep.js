import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { CheckCircle, Package, IndianRupee } from "lucide-react";
export const FinalStep = () => {
  const {
    project
  } = useProject();
  const total = project.selectedProducts.reduce((s, p) => s + p.price, 0);
  return <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-success" />
        <h2 className="font-display text-xl font-semibold">Final Selection</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Review your selections before confirming.
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {project.selectedProducts.map(product => <motion.div key={product.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="text-xs text-muted-foreground">{product.vendor}</p>
              </div>
              <span className="text-sm font-semibold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>
          </motion.div>)}

        {project.selectedProducts.length === 0 && <div className="text-center py-8">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No products selected yet</p>
          </div>}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-accent/50 border border-primary/20">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">Total Cost</span>
          <span className="text-lg font-display font-bold text-foreground">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
        {project.budget && <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Budget</span>
            <span className={`text-xs font-medium ${total <= project.budget ? "text-success" : "text-destructive"}`}>
              ₹{project.budget.toLocaleString("en-IN")}
              {total <= project.budget ? " ✓ Under budget" : " ✗ Over budget"}
            </span>
          </div>}
      </div>

      <button className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity animate-pulse-gold">
        <IndianRupee className="w-4 h-4" />
        Confirm & Continue
      </button>
    </div>;
};