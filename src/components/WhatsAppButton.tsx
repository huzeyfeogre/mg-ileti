import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/905344205735"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="WhatsApp ile iletişime geçin"
  >
    <MessageCircle className="w-7 h-7 text-background" fill="currentColor" />
  </a>
);

export default WhatsAppButton;
