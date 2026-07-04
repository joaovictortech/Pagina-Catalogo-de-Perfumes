import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { FrameSequence } from "@/components/FrameSequence";
import { MessageCircle, ShoppingBag, Truck, ShieldCheck, Sparkles, Leaf, Flame, Heart, Star, Clock, Gift, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import paloSantoImg from "@/assets/palo-santo.png";
import mirraImg from "@/assets/mirra.png";
import atraiImg from "@/assets/atrai.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "5511999999999"; // Substitua pelo seu WhatsApp
const waLink = (produto: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no perfume ${produto} da linha Essencial Natura.`)}`;

type Produto = {
  id: "palo-santo" | "mirra" | "atrai";
  nome: string;
  subtitulo: string;
  descricao: string;
  precoDe: string;
  precoPor: string;
  parcelas: string;
  promo?: boolean;
  notas: string[];
  ingrediente: string;
  imagem: string;
  familia: string;
};

const PRODUTOS: Produto[] = [
  {
    id: "palo-santo",
    nome: "Essencial Palo Santo",
    subtitulo: "Madeira nobre e quente",
    descricao: "Madeira nobre e quente que conecta com a sua essência. Fragrância amadeirada, sofisticada e marcante.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 199,00",
    parcelas: "ou 6x de R$ 33,17 sem juros",
    promo: true,
    notas: ["Palo Santo", "Cumaru", "Âmbar"],
    ingrediente: "Madeira sagrada da Amazônia",
    imagem: paloSantoImg,
    familia: "Amadeirado Intenso",
  },
  {
    id: "mirra",
    nome: "Essencial Mirra",
    subtitulo: "Profundidade e mistério",
    descricao: "Profundidade e mistério que revelam sua força interior. Um oriental amadeirado envolvente.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 209,00",
    parcelas: "ou 6x de R$ 34,84 sem juros",
    notas: ["Mirra", "Baunilha", "Couro"],
    ingrediente: "Resina de Mirra",
    imagem: mirraImg,
    familia: "Oriental Magnético",
  },
  {
    id: "atrai",
    nome: "Essencial Atraí",
    subtitulo: "Atração e sofisticação",
    descricao: "Atração e sofisticação que despertam presença por onde passa. Floral frutal magnético.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 219,00",
    parcelas: "ou 6x de R$ 36,50 sem juros",
    notas: ["Framboesa", "Jasmim", "Patchouli"],
    ingrediente: "Buquê floral raro",
    imagem: atraiImg,
    familia: "Floral Frutal Sensual",
  },
];

function ReseleerBadge() {
  return (
    <div className="w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent border-b border-gold/20 py-2">
      <p className="text-center text-[11px] md:text-xs font-sans tracking-[0.25em] uppercase text-gold/90">
        <Sparkles size={12} className="inline mr-2 -mt-0.5" />
        Revendedora Oficial Natura · Frete para todo o Brasil · Entrega expressa
      </p>
    </div>
  );
}

function CountdownBar() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-sans text-gold-soft">
      <Clock size={16} className="text-gold animate-pulse" />
      <span className="tracking-[0.2em] uppercase">Oferta termina em</span>
      <span className="font-display text-lg md:text-xl text-gradient-gold tabular-nums">
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </span>
    </div>
  );
}

/** Small preview strip of the 3 perfume bottles, placed ABOVE the frame sequence hero. */
function PreviewStrip() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-4">
      <p className="text-center text-[10px] md:text-xs tracking-[0.35em] uppercase text-gold/70 mb-4">
        Trilogia Essencial · Três essências, uma assinatura
      </p>
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {PRODUTOS.map((p) => (
          <Link
            key={p.id}
            to="/perfume/$id"
            params={{ id: p.id }}
            className="group relative frame-lux aspect-[4/3] overflow-hidden hover:scale-[1.02] transition-transform duration-500"
          >
            <img
              src={p.imagem}
              alt={p.nome}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
            />
            <div className="absolute inset-[10px] rounded-[0.85rem] bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold/80">{p.familia}</p>
              <p className="font-display text-sm md:text-lg text-gradient-gold leading-tight">{p.nome.replace("Essencial ", "")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProdutoCard({ p }: { p: Produto }) {
  return (
    <article id={p.id} className="card-lux p-6 md:p-8 flex flex-col group relative overflow-hidden">
      {p.promo && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-br from-[oklch(0.88_0.14_85)] to-[oklch(0.6_0.13_70)] text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg animate-pulse-ring">
          Mais vendido
        </div>
      )}

      {/* Real product image with ornate gold frame */}
      <Link to="/perfume/$id" params={{ id: p.id }} className="block relative mb-6">
        <div className="frame-lux relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-[10px] rounded-[0.85rem] pointer-events-none z-10"
               style={{ background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.08 0.005 60 / 0.55) 100%)" }} />
          <img
            src={p.imagem}
            alt={p.nome}
            loading="lazy"
            className="w-full h-full object-cover animate-float-slow group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
          />
          {/* Sparkles */}
          <span className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-gold-soft animate-sparkle" style={{ animationDelay: "0s" }} />
          <span className="absolute top-10 right-8 w-1 h-1 rounded-full bg-gold-soft animate-sparkle" style={{ animationDelay: "1.2s" }} />
          <span className="absolute bottom-10 left-10 w-1 h-1 rounded-full bg-gold-soft animate-sparkle" style={{ animationDelay: "2.1s" }} />
        </div>
      </Link>

      <div className="text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-1">{p.familia}</p>
        <h3 className="font-display text-2xl md:text-3xl text-gradient-gold uppercase tracking-wide">{p.nome}</h3>
        <p className="font-display italic text-sm text-gold-soft mt-1">{p.subtitulo}</p>
        <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">{p.descricao}</p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {p.notas.map((n) => (
            <span key={n} className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-gold/30 text-gold-soft">{n}</span>
          ))}
        </div>

        <div className="divider-gold my-6" />

        <div className="mb-1">
          <span className="text-sm text-muted-foreground line-through">De {p.precoDe}</span>
        </div>
        <div className="font-display text-3xl md:text-4xl text-gradient-gold mb-1">
          Por {p.precoPor}
        </div>
        <p className="text-xs text-muted-foreground mb-6">{p.parcelas}</p>

        <div className="flex flex-col gap-3">
          <a href={waLink(p.nome)} target="_blank" rel="noreferrer" className="btn-outline-gold">
            <MessageCircle size={16} /> Comprar no WhatsApp
          </a>
          <Link to="/perfume/$id" params={{ id: p.id }} className="btn-gold">
            <ShoppingBag size={16} /> Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Reveal-on-scroll hook applied to any [data-reveal] element. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    return () => io.disconnect();
  }, []);
}

function FloatingWhatsApp() {
  return (
    <a
      href={waLink("linha Essencial")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.72_0.18_150)] to-[oklch(0.55_0.16_150)] flex items-center justify-center shadow-xl text-white animate-pulse-ring hover:scale-110 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20"><ReseleerBadge /></div>

      {/* PREVIEW STRIP acima do hero — placeholder para as fotos reais */}
      <PreviewStrip />

      {/* FRAME SEQUENCE HERO — não mexer, o usuário vai colocar 824 frames */}
      <FrameSequence />

      {/* CATÁLOGO — imediatamente após a sequência de frames (posição preservada) */}
      <section id="catalogo" className="relative py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gold/40" />
            <Leaf size={16} className="text-gold" />
            <span className="h-px w-16 bg-gold/40" />
          </div>
          <h2 data-reveal className="text-center font-display text-5xl md:text-7xl uppercase tracking-wide">
            <span className="text-gradient-gold">Natura Essencial</span>
          </h2>
          <p data-reveal className="text-center font-sans text-sm md:text-base tracking-[0.25em] uppercase text-gold-soft mt-4 mb-8">
            A essência do que somos. A marca do que fica.
          </p>

          <div data-reveal className="mb-14"><CountdownBar /></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PRODUTOS.map((p, i) => (
              <div key={p.id} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
                <ProdutoCard p={p} />
              </div>
            ))}
          </div>

          {/* Gatilho: Compre 2 e ganhe */}
          <div data-reveal className="mt-14 card-lux p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-gold/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0">
                <Gift size={22} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Combo Essencial</p>
                <h4 className="font-display text-2xl md:text-3xl text-gradient-gold">Compre 2 e ganhe 10% OFF extra</h4>
                <p className="text-sm text-muted-foreground mt-1">Válido para qualquer combinação da trilogia · Cupom aplicado no WhatsApp</p>
              </div>
            </div>
            <a href={waLink("combo 2 perfumes")} target="_blank" rel="noreferrer" className="btn-gold whitespace-nowrap">
              <MessageCircle size={16} /> Ativar combo
            </a>
          </div>

          <p data-reveal className="text-center font-display italic text-lg md:text-xl text-gold-soft mt-16">
            Fragrâncias que expressam quem você é. <span className="text-gradient-gold">Escolha a sua.</span>
          </p>
        </div>
      </section>

      {/* BENEFÍCIOS / TRUST */}
      <section className="py-16 border-y border-gold/15 bg-gradient-to-b from-transparent via-[oklch(0.15_0.02_65)/0.5] to-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Leaf, t: "Ingredientes Naturais", s: "Fórmulas com biodiversidade brasileira" },
            { icon: Truck, t: "Frete Rápido", s: "Envio expresso para todo o Brasil" },
            { icon: ShieldCheck, t: "100% Original", s: "Revendedora oficial · Nota Fiscal" },
            { icon: Flame, t: "Alta Perfumação", s: "Longa duração e projeção marcante" },
          ].map(({ icon: Icon, t, s }, i) => (
            <div data-reveal style={{ transitionDelay: `${i * 100}ms` }} key={t} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                <Icon size={22} />
              </div>
              <h4 className="font-display text-lg text-gradient-gold uppercase tracking-wider">{t}</h4>
              <p className="text-xs text-muted-foreground max-w-[180px]">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE A LINHA */}
      <section id="sobre" className="py-24 px-6">
        <div data-reveal className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold/80 mb-4">Sobre a linha</p>
          <h2 className="font-display text-4xl md:text-6xl mb-6"><span className="text-gradient-gold">A essência do que somos</span></h2>
          <div className="divider-gold w-40 mx-auto mb-8" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Natura Essencial é uma coleção de alta perfumaria inspirada na força da natureza brasileira.
            Cada fragrância é construída com ingredientes nobres — <em className="text-gold-soft">Palo Santo, Mirra e um raro buquê floral</em> —
            para revelar quem você é. Presença, sofisticação e memória em um só gesto.
          </p>
          <div className="flex items-center justify-center gap-2 text-gold-soft">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-[oklch(0.82_0.14_82)] text-gold" />)}
            <span className="ml-2 text-sm text-muted-foreground">4.7 · 97 avaliações · 95% recomendam</span>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 px-6 bg-[oklch(0.11_0.008_60)/0.6]">
        <div className="max-w-6xl mx-auto">
          <h3 data-reveal className="text-center font-display text-3xl md:text-4xl mb-12"><span className="text-gradient-gold">O que dizem quem já provou</span></h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Mariana S.", t: "Palo Santo é um perfume marcante. Recebo elogios toda vez que uso!", p: "Palo Santo" },
              { n: "Rafael C.", t: "A Mirra tem uma profundidade linda. Sofisticado e diferente.", p: "Mirra" },
              { n: "Camila R.", t: "Atraí virou meu preferido. Presença total, dura o dia todo.", p: "Atraí" },
            ].map((d, i) => (
              <div data-reveal style={{ transitionDelay: `${i * 120}ms` }} key={d.n} className="card-lux p-6">
                <div className="flex gap-1 text-gold mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-[oklch(0.82_0.14_82)]" />)}
                </div>
                <p className="font-display italic text-lg text-foreground/90 mb-4">"{d.t}"</p>
                <p className="text-xs tracking-[0.2em] uppercase text-gold-soft">{d.n} · <span className="text-muted-foreground">{d.p}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 text-center">
        <div data-reveal>
          <Award size={28} className="text-gold mx-auto mb-4 animate-glow" />
          <p className="text-[11px] tracking-[0.35em] uppercase text-gold/80 mb-2">Última chance · Estoque limitado</p>
          <h3 className="font-display text-4xl md:text-5xl mb-4"><span className="text-gradient-gold">Pronta para encontrar sua essência?</span></h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Promoção por tempo limitado. Garanta o seu antes que acabe.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#catalogo" className="btn-gold"><Heart size={16} /> Ver perfumes</a>
            <a href={waLink("linha Essencial")} target="_blank" rel="noreferrer" className="btn-outline-gold">
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/20 py-10 px-6 bg-[oklch(0.1_0.005_60)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-gradient-gold">natura ESSENCIAL</p>
            <p className="text-xs text-muted-foreground mt-1">Revendedora Oficial Natura · CNPJ do revendedor</p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} · Todos os direitos reservados · Página de revendedora autorizada Natura
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href={waLink("dúvidas gerais")} target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp</a>
            <a href="#sobre" className="hover:text-gold">Sobre</a>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
