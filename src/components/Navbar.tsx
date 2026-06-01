import { Link, useLocation } from "react-router-dom";
import { Smartphone, Phone, Menu, ChevronDown, Wrench, ShoppingBag, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo.png";

const mainLinks = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
];

const dropdownGroups = [
  {
    label: "Hizmetler",
    items: [
      { to: "/hizmetlerimiz", label: "Hizmetlerimiz", icon: Wrench, desc: "Tamir & bakım hizmetleri" },
      { to: "/tamir-ettiklerimiz", label: "Tamir Ettiğimiz Cihazlar", icon: Monitor, desc: "Desteklenen marka ve modeller" },
    ],
  },
  {
    label: "Mağaza",
    items: [
      { to: "/urunlerimiz", label: "Ürünlerimiz", icon: ShoppingBag, desc: "Aksesuar & yedek parça" },
      { to: "/satilik-telefonlar", label: "Satılık Telefonlar", icon: Smartphone, desc: "Garantili ikinci el telefonlar" },
    ],
  },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: { to: string }[]) => items.some((i) => location.pathname === i.to);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Hm Ekran Dünyası" className="w-14 h-14 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-heading font-bold text-lg tracking-tight">Hm Ekran Dünyası</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {mainLinks.slice(0, 1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted/50 hover:text-foreground ${
                isActive(link.to) ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {dropdownGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(group.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted/50 hover:text-foreground flex items-center gap-1 ${
                  isGroupActive(group.items) ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {group.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === group.label ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === group.label && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="rounded-xl bg-card border border-border/50 shadow-xl shadow-black/20 p-2 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 group/item ${
                          isActive(item.to) ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isActive(item.to) ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {mainLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted/50 hover:text-foreground ${
                isActive(link.to) ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="text-sm">
            <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" className="glow-pulse text-sm">
            <a href="tel:+905344205735">
              <Phone className="w-4 h-4 mr-1.5" /> Hemen Ara
            </a>
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm p-0 bg-background border-border/40 flex flex-col">
            <SheetHeader className="px-5 py-4 border-b border-border/30">
              <SheetTitle className="flex items-center gap-2.5 text-left">
                <img src={logo} alt="Hm Ekran Dünyası" className="w-14 h-14 object-contain" />
                <span className="font-heading font-bold text-lg tracking-tight">Hm Ekran Dünyası</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {mainLinks.slice(0, 1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to) ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted/40"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {dropdownGroups.map((group) => (
                <div key={group.label} className="pt-2">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.to) ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="pt-2">
                {mainLinks.slice(1).map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.to) ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border/30 space-y-2">
              <Button asChild size="sm" variant="outline" className="w-full">
                <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" className="w-full">
                <a href="tel:+905344205735">
                  <Phone className="w-4 h-4 mr-1.5" /> Hemen Ara
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
