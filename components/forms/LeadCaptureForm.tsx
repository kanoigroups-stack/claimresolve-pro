"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

const issueTypes = ["Claim Rejection", "Claim Delay", "Short Settlement", "Mis-selling", "Policy Dispute", "Other"];

// Google Form details
const GOOGLE_FORM_ID = "1FAIpQLSeTkodT19oTHy2ZJeKm_uG1imDMRr_CTrPnlyuVNkYsOD9zFA";
const GOOGLE_FORM_ENTRIES = {
  name: "entry.280581221",
  email: "entry.577275878",
  phone: "entry.1741549894",
  issueType: "entry.1897162496",
  message: "entry.1257999619",
};

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  issueType?: string;
}

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", issueType: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation - Indian mobile: starts with 5-9, followed by 9 digits
    const phoneRegex = /^[5-9][0-9]{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
      isValid = false;
    }

    // Issue type validation
    if (!formData.issueType) {
      newErrors.issueType = "Please select an issue type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);

    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    
    const hiddenForm = document.createElement("form");
    hiddenForm.method = "POST";
    hiddenForm.action = formUrl;
    hiddenForm.target = "hidden-iframe";
    hiddenForm.style.display = "none";

    Object.entries(GOOGLE_FORM_ENTRIES).forEach(([key, entryId]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = entryId;
      input.value = formData[key as keyof typeof formData];
      hiddenForm.appendChild(input);
    });

    let iframe = document.getElementById("hidden-iframe") as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "hidden-iframe";
      iframe.name = "hidden-iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    setTimeout(() => {
      document.body.removeChild(hiddenForm);
    }, 1000);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setErrors({});
      
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-800 via-primary-600 to-accent-500" />
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Get Free Case Evaluation</h3>
        <p className="text-sm text-slate-500">Fill in your details and our experts will reach out</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name Field */}
        <div>
          <input 
            type="text" 
            placeholder="Full Name *" 
            value={formData.name} 
            onChange={(e) => handleChange("name", e.target.value)} 
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"} outline-none transition-all text-sm`}
          />
          {errors.name && (
            <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email & Phone Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              type="email" 
              placeholder="Email Address *" 
              value={formData.email} 
              onChange={(e) => handleChange("email", e.target.value)} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"} outline-none transition-all text-sm`}
            />
            {errors.email && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
          
          <div>
            <input 
              type="tel" 
              placeholder="Phone Number *" 
              maxLength={10}
              value={formData.phone} 
              onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"} outline-none transition-all text-sm`}
            />
            {errors.phone && (
              <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Issue Type Field */}
        <div>
          <select 
            value={formData.issueType} 
            onChange={(e) => handleChange("issueType", e.target.value)} 
            className={`w-full px-4 py-3 rounded-xl border ${errors.issueType ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"} outline-none transition-all text-sm bg-white`}
          >
            <option value="">Select Issue Type *</option>
            {issueTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.issueType && (
            <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.issueType}</span>
            </div>
          )}
        </div>

        {/* Message Field (Optional) */}
        <textarea 
          placeholder="Briefly describe your issue (optional)" 
          rows={3} 
          value={formData.message} 
          onChange={(e) => handleChange("message", e.target.value)} 
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
