"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
  { name: "Ravi Anjania", location: "Mumbai, Maharashtra", claimType: "Health Insurance Rejection", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 5, text: "My Daughter's cancer claim was rejected citing a pre-existing condition. Tatkal Claims team found a loophole in the insurer's reasoning and got us ₹8.5 lakhs within 3 months. Life-changing!" },
  { name: "Suryakant Sharma", location: "Ponda, Goa", claimType: "Motor Total Loss", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating: 5, text: "After my car accident, the insurance offered only 60% of the value. These experts negotiated and I received 95% of the insured amount. Professional, responsive, and truly caring." },
  { name: "Nidhi Bajaj", location: "Kolkata, West Bengal", claimType: "Mis-sold ULIP Policy", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "I was sold a policy as a 'fixed deposit' by my bank. ClaimResolve helped me file a complaint with IRDAI and recover my entire premium of ₹5 lakhs plus interest. Highly recommended!" },
  { name: "Dr. Rajeev Agarwal", location: "Delhi NCR", claimType: "Claim Delay - 8 Months", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", rating: 4, text: "My home insurance claim was stuck for 8 months. Within 2 weeks of hiring ClaimResolve, the insurer released ₹12 lakhs. Their regulatory pressure approach works wonders." },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 5000); return () => clearInterval(timer); }, []);

  return (
    <SectionWrapper id="testimonials" className="bg-slate-50/50">
      <SectionHeader title="Success Stories From Real Clients" subtitle="Join thousands of policyholders who recovered their rightful claims" />
      <div className="max-w-4xl mx-auto relative">
        <button onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors z-10"><ChevronLeft className="w-6 h-6 text-primary-800" /></button>
        <button onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors z-10"><ChevronRight className="w-6 h-6 text-primary-800" /></button>
        <div className="relative bg-white rounded-3xl shadow-card p-8 md:p-12 min-h-[400px] flex items-center">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-100" />
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="w-full">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative">
                  <div className="relative">
  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-800 flex items-center justify-center ring-4 ring-primary-100">
    <span className="text-white text-2xl font-bold">{testimonials[current].name.split(' ').map(n => n[0]).join('')}</span>
  </div>
  <div className="absolute -bottom-2 -right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{testimonials[current].claimType}</div>
</div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900">{testimonials[current].name}</h4>
                  <p className="text-slate-500 text-sm">{testimonials[current].location}</p>
                  <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < testimonials[current].rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />)}</div>
                </div>
              </div>
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed italic text-center md:text-left">"{testimonials[current].text}"</blockquote>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">{testimonials.map((_, index) => <button key={index} onClick={() => setCurrent(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === current ? "bg-primary-700 w-8" : "bg-slate-300 hover:bg-slate-400"}`} />)}</div>
      </div>
    </SectionWrapper>
  );
}
