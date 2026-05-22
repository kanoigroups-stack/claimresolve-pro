"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";

const articles = [
  { title: "How to Deal With Insurance Claim Rejection: A Complete Guide", excerpt: "Learn the step-by-step process to challenge a rejected claim, from internal review to approaching the Ombudsman.", category: "Claim Rejection", readTime: "5 min read", author: "Legal Team", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop" },
  { title: "What to Do If Your Insurer Delays Your Claim Settlement", excerpt: "Delayed claims cost you money and peace of mind. Discover regulatory deadlines and pressure tactics that work.", category: "Claim Delay", readTime: "4 min read", author: "Insurance Expert", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" },
  { title: "Insurance Mis-selling Explained: How to Identify and Report", excerpt: "Was your policy sold as a 'fixed deposit' or 'free insurance'? Know your rights and recovery options.", category: "Mis-selling", readTime: "6 min read", author: "Consumer Rights", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop" },
];

export default function KnowledgeSection() {
  return (
    <SectionWrapper id="blog">
      <SectionHeader title="Knowledge Center" subtitle="Expert insights to help you understand your rights and navigate insurance disputes" />
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.article key={article.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8 }} className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 cursor-pointer">
            <div className="relative h-48 overflow-hidden"><img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute top-4 left-4 bg-primary-800 text-white text-xs font-semibold px-3 py-1 rounded-full">{article.category}</div></div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span><span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">{article.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center text-primary-700 font-semibold text-sm group-hover:gap-3 gap-2 transition-all">Read Article <ArrowRight className="w-4 h-4" /></div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}