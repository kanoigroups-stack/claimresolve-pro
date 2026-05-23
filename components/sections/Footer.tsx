import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  company: [{ label: "About Us", href: "/about" }, { label: "Our Team", href: "/team" }, { label: "Careers", href: "/careers" }, { label: "Media Coverage", href: "/media" }],
  services: [{ label: "Claim Rejection", href: "/services/claim-rejection" }, { label: "Claim Delay", href: "/services/claim-delay" }, { label: "Mis-selling", href: "/services/mis-selling" }, { label: "Short Settlement", href: "/services/short-settlement" }],
  resources: [{ label: "Knowledge Center", href: "/blog" }, { label: "Case Studies", href: "/success-stories" }, { label: "IRDAI Guidelines", href: "/irdai" }, { label: "Ombudsman Info", href: "/ombudsman" }],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-main px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
              <div className="flex flex-col"><span className="font-heading font-bold text-xl text-white leading-none">ClaimResolve</span><span className="text-[10px] font-semibold tracking-widest uppercase text-accent-500">Pro</span></div>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">India's most trusted platform for resolving insurance complaints. We help policyholders recover rightful claims through expert dispute resolution.</p>
            <div className="space-y-3">
              <a href="tel:+919321152524" className="flex items-center gap-3 text-sm hover:text-white transition-colors"><Phone className="w-4 h-4 text-accent-500" />+919321152524</a>
              <a href="mailto:help@tatkalclaims" className="flex items-center gap-3 text-sm hover:text-white transition-colors"><Mail className="w-4 h-4 text-accent-500" />help@tatkalclaims.com</a>
              <div className="flex items-start gap-3 text-sm"><MapPin className="w-4 h-4 text-accent-500 mt-0.5" /><span>84, Bakol street, Laudin Villa, Bhayander West, Mumbai - 401101</span></div>
            </div>
          </div>
          <div><h4 className="text-white font-semibold mb-4">Company</h4><ul className="space-y-3">{footerLinks.company.map((link) => <li key={link.label}><Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link></li>)}</ul></div>
          <div><h4 className="text-white font-semibold mb-4">Services</h4><ul className="space-y-3">{footerLinks.services.map((link) => <li key={link.label}><Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link></li>)}</ul></div>
          <div><h4 className="text-white font-semibold mb-4">Resources</h4><ul className="space-y-3">{footerLinks.resources.map((link) => <li key={link.label}><Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link></li>)}</ul></div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container-main px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Tatkal Claims. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => <a key={i} href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"><Icon className="w-4 h-4" /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
