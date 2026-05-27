"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const issueTypes = ["Claim Rejection", "Claim Delay", "Short Settlement", "Mis-selling", "Policy Dispute", "Other"];

// Your Google Form details
const GOOGLE_FORM_ID = "1HSb7GgqJ666hRy1hv6Vbnm4-ILMAMVj8VkhvIYEqDCY";
const GOOGLE_FORM_ENTRIES = {
  name: "entry.645206340",
  email: "entry.1018981908",
  phone: "entry.311686043",
  issueType: "entry.303539375",
  message: "entry.228827174",
};

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", issueType: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const iframeRef = useRef<<HTMLIFrameElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build the Google Form submission URL with all data
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    const params = new URLSearchParams();
    params.append(GOOGLE_FORM_ENTRIES.name, formData.name);
    params.append(GOOGLE_FORM_ENTRIES.email, formData.email);
    params.append(GOOGLE_FORM_ENTRIES.phone, formData.phone);
    params.append(GOOGLE_FORM_ENTRIES.issueType, formData.issueType);
    params.append(GOOGLE_FORM_ENTRIES.message, formData.message);

    // Submit via hidden iframe (this mimics a real browser form submission)
    if (iframeRef.current) {
      iframeRef.current.src = `${formUrl}?${params.toString()}`;
    }

    // Show success after a short delay (giving iframe time to load)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Clear form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", issueType: "", message: "" });
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 shadow-float border border-slate-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600">Our experts will contact you within 24 hours to discuss your case.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-slate-100 relative overflow-hidden">
      {/* Hidden iframe for Google Form submission */}
      <iframe 
        ref={iframeRef} 
        name="google-form-iframe" 
        style={{ display: "none" }} 
        title="Google Form Submission"
      />
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-800 via-primary-600 to-accent-500" />
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Get Free Case Evaluation</h3>
        <p className="text-sm text-slate-500">Fill in your details and our experts will reach out</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4" target="google-form-iframe">
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm" 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm" 
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            required 
            pattern="[0-9]{10}" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm" 
          />
        </div>
        
        <select 
          required 
          value={formData.issueType} 
          onChange={(e) => setFormData({ ...formData, issueType: e.target.value })} 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm bg-white"
        >
          <option value="">Select Issue Type</option>
          {issueTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        
        <textarea 
          placeholder="Briefly describe your issue (optional)" 
          rows={3} 
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm resize-none" 
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full btn-primary py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</>
          ) : (
            <><Send className="w-5 h-5 mr-2" />Get Expert Help Now</>
          )}
        </button>
        
        <p className="text-xs text-center text-slate-400 mt-4">
          By submitting, you agree to our privacy policy. We respect your data.
        </p>
      </form>
    </div>
  );
}
