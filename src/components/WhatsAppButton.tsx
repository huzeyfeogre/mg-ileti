import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/905344205735"
    target="_blank"
    rel="noopener noreferrer"
    className="group fixed bottom-6 right-6 z-50 flex items-center gap-2"
    aria-label="WhatsApp ile iletişime geçin"
  >
    <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-lg border border-border/60 shadow-lg">
      Fiyat sormak için tıkla
    </span>
    <span className="wa-pulse w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
      <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
    </span>
  </a>
);

export default WhatsAppButton;
