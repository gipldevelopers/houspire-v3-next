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
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">Design DNA</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Quick style quiz — we'll match products to your taste.
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {QUESTIONS.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/50" : "bg-muted"}`} />)}
      </div>

      <motion.div key={currentQ} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex-1">
        <p className="text-base font-medium mb-4">{q.question}</p>
        <div className="space-y-3">
          {[q.optionA, q.optionB].map(opt => <button key={opt.value} onClick={() => handleSelect(q.key, opt.value)} className={`w-full py-4 px-5 rounded-xl text-left text-sm font-medium transition-all border ${answers[q.key] === opt.value ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/40 text-foreground"}`}>
              {opt.label}
            </button>)}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-2 mt-4">
        {currentQ > 0 && <button onClick={() => setCurrentQ(currentQ - 1)} className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back
          </button>}
        {allAnswered && <motion.button initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} onClick={handleContinue} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Continue
            <ArrowRight className="w-4 h-4" />
          </motion.button>}
      </div>
    </div>;
};