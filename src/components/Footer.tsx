import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40">
    <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div>
        © {new Date().getFullYear()} <span className="font-heading font-bold text-foreground">HM Ekran Dünyası</span> — Sultanbeyli, İstanbul
      </div>
      <div className="flex items-center gap-4">
        <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" />
        </a>
        <a href="https://instagram.com/hmekrandunyasi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
