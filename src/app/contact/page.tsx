"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) {
      alert("Please fill out all fields.");
      return;
    }

    const subject = `New Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Details:\n${formData.project}`;
    
    // Direct Gmail compose link - redirecting in the same tab to ensure it isn't blocked
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=palani.m@admiregrp.in&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = gmailLink;
  };

  return (
    <div className="min-h-screen pt-40 px-6 md:px-16 lg:px-24 bg-background text-foreground">
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">
        Our Motto: Modern Luxury Architecture
      </p>
      <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8">Start a Conversation</h1>
      <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed mb-16">
        Whether you are planning a massive commercial complex or a bespoke residential space, our team is ready to listen.
      </p>
      
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl">
        {/* Vertical Divider for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />
        
        <div>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm" 
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm" 
            />
            <textarea 
              placeholder="PROJECT DETAILS" 
              rows={4} 
              required
              value={formData.project}
              onChange={(e) => setFormData({...formData, project: e.target.value})}
              className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm resize-none"
            ></textarea>
            <button type="submit" className="self-start px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">
              Submit Inquiry
            </button>
          </form>
        </div>
        
        <div className="flex flex-col gap-12 lg:pl-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-muted-foreground">Email</h3>
            <a href="mailto:palani.m@admiregrp.in" className="text-xl md:text-2xl font-light hover:text-muted-foreground transition-colors">palani.m@admiregrp.in</a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-muted-foreground">Phone</h3>
            <a href="tel:9448370989" className="text-xl md:text-2xl font-light hover:text-muted-foreground transition-colors">9448370989</a>
          </div>
        </div>
      </div>
    </div>
  );
}
