export default function ContactPage() {
  return (
    <div className="min-h-screen pt-40 px-6 md:px-16 lg:px-24 bg-background text-foreground">
      <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8">Start a Conversation</h1>
      <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed mb-16">
        Whether you are planning a massive commercial complex or a bespoke residential space, our team is ready to listen.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
        <div>
          <form className="flex flex-col gap-8">
            <input type="text" placeholder="YOUR NAME" className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm" />
            <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm" />
            <textarea placeholder="PROJECT DETAILS" rows={4} className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors font-light tracking-widest uppercase text-sm resize-none"></textarea>
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
