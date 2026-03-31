import { useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const QUESTIONS = [{
  key: "style",
  question: "What vibe speaks to you?",
  optionA: {
    label: "✨ Modern",
    value: "modern"
  },
  optionB: {
    label: "🏛️ Classic",
    value: "classic"
  }
}, {
  key: "tone",
  question: "Light or mood?",
  optionA: {
    label: "☀️ Light & Airy",
    value: "light"
  },
  optionB: {
    label: "🌙 Dark & Cozy",
    value: "dark"
  }
}, {
  key: "density",
  question: "How much is too much?",
  optionA: {
    label: "🫧 Minimal",
    value: "minimal"
  },
  optionB: {
    label: "💎 Luxury",
    value: "luxury"
  }
}, {
  key: "palette",
  question: "Color temperature?",
  optionA: {
    label: "🔥 Warm Tones",
    value: "warm"
  },
  optionB: {
    label: "❄️ Cool Tones",
    value: "cool"
  }
}];
export const DNAStep = () => {
  const {
    setDesignDNA,
    setStage
  } = useProject();
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const handleSelect = (key, value) => {
    const newAnswers = {
      ...answers,
      [key]: value
    };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    }
  };
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const handleContinue = () => {
    setDesignDNA(answers);
    setStage("ZONES");
  };
  const q = QUESTIONS[currentQ];
  return <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">Design DNA</h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
        Quick style quiz — we'll match products perfectly to your unique taste.
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8 px-1">
        {QUESTIONS.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < currentQ ? "bg-teal-500" : i === currentQ ? "bg-teal-300 dark:bg-teal-600" : "bg-slate-200 dark:bg-slate-700"}`} />)}
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
        <p className="text-lg font-bold text-slate-800 dark:text-white mb-4 px-1">{q.question}</p>
        <div className="space-y-4 px-1">
          {[q.optionA, q.optionB].map(opt => <button key={opt.value} onClick={() => handleSelect(q.key, opt.value)} className={`w-full py-5 px-6 rounded-2xl text-left text-sm font-bold tracking-wide transition-all duration-300 border-2 ${answers[q.key] === opt.value ? "border-teal-500 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 shadow-[0_4px_20px_-4px_rgba(20,184,166,0.3)] scale-[1.02]" : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/20 hover:border-teal-400 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:shadow-lg hover:-translate-y-1 text-slate-700 dark:text-slate-300"}`}>
              {opt.label}
            </button>)}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        {currentQ > 0 && <button onClick={() => setCurrentQ(currentQ - 1)} className="px-5 py-4 rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Back
          </button>}
        {allAnswered && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleContinue} className="flex-1 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/20 active:scale-95 group">
            Proceed to Zones
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>}
      </div>
    </div>;
};