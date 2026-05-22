"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <motion.a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20help%20with%20my%20insurance%20claim" target="_blank" rel="noopener noreferrer" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} whileHover={{ scale: 1.1 }} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors" aria-label="Chat on WhatsApp">
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}