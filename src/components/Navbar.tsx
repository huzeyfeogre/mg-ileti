import { Link, useLocation } from "react-router-dom";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const sectionLinks = [
  { hash: "#services", label: "Hizmetler" },
  { hash: "#why", label: "Neden Biz?" },
  { hash: "#reviews", label: "Yorumlar" },
  { hash: "#contact", label: "İletişim" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const linkHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border/60"
          : "bg-background/40 backdrop-blur-md border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center font-heading font-extrabold text-lg sm:text-xl tracking-tight">
          <span className="text-primary">HM</span>
          <span className="ml-1.5">Ekran Dünyası</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {sectionLinks.map((l) => (
            <a
              key={l.hash}
              href={linkHref(l.hash)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex">
          <Button asChild size="sm" className="btn-glow bg-whatsapp hover:bg-whatsapp text-white">
            <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-1.5" fill="currentColor" />
              WhatsApp'tan Yaz
            </a>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted/40 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm p-0 bg-background border-border/60 flex flex-col">
            <SheetHeader className="px-5 py-4 border-b border-border/40">
              <SheetTitle className="font-heading font-extrabold text-lg text-left">
                <span className="text-primary">HM</span> Ekran Dünyası
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {sectionLinks.map((l) => (
                <a
                  key={l.hash}
                  href={linkHref(l.hash)}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="p-4 border-t border-border/40">
              <Button asChild size="sm" className="w-full bg-whatsapp hover:bg-whatsapp text-white">
                <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-1.5" fill="currentColor" />
                  WhatsApp'tan Yaz
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
