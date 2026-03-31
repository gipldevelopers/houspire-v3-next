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
  return <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">Browse Catalog</h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
        Click on any product to instantly preview it in your room setup.
      </p>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {PRODUCTS.map(product => {
        const selected = isSelected(product.id);
        return <motion.div key={product.id} whileHover={{
          scale: 1.02,
          y: -2
        }} onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)} className={`p-4 rounded-[1.5rem] border cursor-pointer transition-all duration-300 shadow-sm ${selected ? "border-teal-500 bg-teal-50 dark:bg-teal-500/10 shadow-teal-500/20" : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 hover:border-teal-400 dark:hover:border-teal-500/50 hover:shadow-lg"}`} onClick={() => handlePreview(product)}>
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex-shrink-0 p-2 shadow-inner">
                  <img src={IMG_MAP[product.image]} alt={product.name} className="w-full h-full object-contain drop-shadow-md mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{product.name}</h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{product.vendor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                      Score: {product.score}
                    </span>
                  </div>
                </div>
              </div>
              {selected && <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <button className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                    <Heart className="w-4 h-4 text-rose-500" /> Save
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20">
                    <MessageSquare className="w-4 h-4" /> Enquire
                  </button>
                </div>}
            </motion.div>;
      })}
      </div>

      {project.selectedProducts.length > 0 && <button onClick={() => setStage("FINAL")} className="mt-6 w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/20 active:scale-95 group">
          Review Selection
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>}
    </div>;
};