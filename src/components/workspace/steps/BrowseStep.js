import { useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { ArrowRight, Heart, MessageSquare } from "lucide-react";
const PRODUCTS = [{
  id: 1,
  name: "Walnut Platform Bed",
  price: 18000,
  image: "product-bed.png",
  zone: "bed",
  vendor: "WoodCraft",
  score: 8.5
}, {
  id: 2,
  name: "Grey Modern Sofa",
  price: 15000,
  image: "product-sofa.png",
  zone: "sofa",
  vendor: "ComfortPlus",
  score: 9.0
}, {
  id: 3,
  name: "Brass Floor Lamp",
  price: 4500,
  image: "product-lamp.png",
  zone: "lighting",
  vendor: "LightHouse",
  score: 7.8
}, {
  id: 4,
  name: "Velvet Accent Chair",
  price: 8500,
  image: "product-chair.png",
  zone: "chair",
  vendor: "SeatCo",
  score: 8.2
}];
import productBed from "@/assets/product-bed.png";
import productSofa from "@/assets/product-sofa.png";
import productLamp from "@/assets/product-lamp.png";
import productChair from "@/assets/product-chair.png";
const IMG_MAP = {
  "product-bed.png": productBed.src,
  "product-sofa.png": productSofa.src,
  "product-lamp.png": productLamp.src,
  "product-chair.png": productChair.src
};
export const BrowseStep = () => {
  const {
    project,
    addSelectedProduct,
    setStage
  } = useProject();
  const [hoveredId, setHoveredId] = useState(null);
  const isSelected = id => project.selectedProducts.some(p => p.id === id);
  const handlePreview = product => {
    if (isSelected(product.id)) return;
    addSelectedProduct(product);
  };
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">Browse Products</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Click a product to preview in your room.
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {PRODUCTS.map(product => {
        const selected = isSelected(product.id);
        return <motion.div key={product.id} whileHover={{
          scale: 1.01
        }} onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)} className={`p-3 rounded-xl border cursor-pointer transition-all ${selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`} onClick={() => handlePreview(product)}>
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img src={IMG_MAP[product.image]} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">{product.vendor}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-primary">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Score: {product.score}/10
                    </span>
                  </div>
                </div>
              </div>
              {selected && <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3" /> Saved
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Request Quote
                  </button>
                </div>}
            </motion.div>;
      })}
      </div>

      {project.selectedProducts.length > 0 && <button onClick={() => setStage("FINAL")} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          Review Selection
          <ArrowRight className="w-4 h-4" />
        </button>}
    </div>;
};