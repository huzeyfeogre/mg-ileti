import { Link, useLocation } from "react-router-dom";
import { Smartphone, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { to: "/urunlerimiz", label: "Ürünlerimiz" },
  { to: "/tamir-ettiklerimiz", label: "Tamir Ettiğimiz Cihazlar" },
  { to: "/satilik-telefonlar", label: "Satılık Telefonlar" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <Smartphone className="w-6 h-6 text-primary" />
          <span>MG İletişim</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="glow-pulse">
            <a href="tel:+905001234567">
              <Phone className="w-4 h-4 mr-1" /> Hemen Ara
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/30 px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="w-full">
            <a href="tel:+905001234567">
              <Phone className="w-4 h-4 mr-1" /> Hemen Ara
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
