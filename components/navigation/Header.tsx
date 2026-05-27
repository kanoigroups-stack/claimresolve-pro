"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#trust", label: "Why Us" },
  { href: "#testimonials", label: "Success Stories" },
  { href: "#faq", label: "FAQs" },
  { href: "/blog", label: "Blog" }, // ← ADDED BLOG LINK
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-100" : "bg-transparent"
        }`}
      >
        <div className="container-main px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-800/20 group-hover:shadow-primary-800/30 transition-shadow">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
  <span className="font-heading font-bold text-xl leading-none text-primary-800">
    Tatkal Claims
  </span>
  <span className="text-[10px] font-semibold tracking-widest uppercase text-accent-500">
    Pro
  </span>
</div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary-600 text-slate-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+919321152524" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-700 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <Link href="#contact" className="btn-primary text-sm py-2.5 px-5">
                Submit Case
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-800 py-3 border-b border-slate-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#contact" className="btn-primary mt-4 text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Submit Your Case
              </Link>
              <a href="tel:+919321152524" className="flex items-center justify-center gap-2 text-primary-700 font-medium mt-2">
                <Phone className="w-5 h-5" />
                Call: +91 9321152524
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
