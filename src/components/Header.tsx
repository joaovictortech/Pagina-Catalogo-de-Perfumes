import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Gostaria de falar sobre os perfumes Natura Essencial.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/", label: "Início" },
    { to: "/#catalogo", label: "Perfumes" },
    { to: "/#sobre", label: "Sobre" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-gold/20" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        <Link to="/" className="flex flex-col leading-none group shrink-0">
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] text-gold/80 uppercase">
            natura
          </span>
          <span className="font-display text-xl sm:text-2xl md:text-3xl text-gold text-glow group-hover:animate-glow">
            ESSENCIAL
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-[0.2em] uppercase">
          {nav.map((n) => (
            <a
              key={n.to + n.label}
              href={n.to}
              className="text-foreground/85 hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !py-2 !px-3 sm:!px-4 !text-[10px] sm:!text-xs"
          >
            <MessageCircle size={16} className="shrink-0" />
            <span className="hidden sm:inline">Falar com revendedora</span>
            <span className="sm:hidden">Revendedora</span>
          </a>
          <a
            href="/checkout"
            aria-label="Sacola"
            className="relative text-foreground/85 hover:text-gold transition shrink-0"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-2 bg-gold text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </a>
          <button
            className="lg:hidden text-gold shrink-0"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-gold/20 px-6 py-4 flex flex-col gap-3 font-sans text-sm tracking-[0.2em] uppercase">
          {nav.map((n) => (
            <a
              key={n.to + n.label}
              href={n.to}
              onClick={() => setOpen(false)}
              className="text-foreground/85 hover:text-gold py-1"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
