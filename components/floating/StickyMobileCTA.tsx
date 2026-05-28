"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToForm } from "../sections/HeroSection";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const handleScroll = () => setIsVisible(window.scrollY > 600); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-lg lg:hidden">
          <button type="button" onClick={scrollToForm} className="btn-primary w-full text-base py-3.5 group">Submit Your Case Now<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
