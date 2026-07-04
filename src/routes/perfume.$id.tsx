import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ArrowLeft, MessageCircle, ShoppingBag, Sparkles, Award, Clock, Truck, ShieldCheck, Gift, Heart } from "lucide-react";
import paloSantoImg from "@/assets/palo-santo.png";
import mirraImg from "@/assets/mirra.png";
import atraiImg from "@/assets/atrai.png";

const WHATSAPP = "5511999999999";

type Piramide = { topo: string[]; coracao: string[]; fundo: string[] };
type Detalhe = {
  id: "palo-santo" | "mirra" | "atrai";
  nome: string;
  familia: string;
  frase: string;
  descricao: string;
  historia: string;
  precoDe: string;
  precoPor: string;
  parcelas: string;
  piramide: Piramide;
  imagem: string;
  accent: string; // css gradient
  ocasioes: string[];
};

const DETALHES: Record<string, Detalhe> = {
  "palo-santo": {
    id: "palo-santo",
    nome: "Essencial Palo Santo",
    familia: "Madeira Sagrada · Amadeirado Intenso",
    frase: "Desvende o mistério. Sinta a energia da madeira sagrada.",
    descricao: "Uma fragrância amadeirada intensa e sofisticada que une a mística madeira Palo Santo ao calor envolvente do Cumaru. Perfeita para quem busca conexão profunda e uma aura de exclusividade.",
    historia: "Colhido de forma sustentável na floresta amazônica, o Palo Santo é considerado sagrado por povos originários — símbolo de proteção, energia e limpeza espiritual. Uma assinatura olfativa que carrega tradição em cada nota.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 199,00",
    parcelas: "ou 6x de R$ 33,17 sem juros",
    piramide: {
      topo: ["Cardamomo", "Pimenta Preta"],
      coracao: ["Sequóia", "Cipreste", "Rosa"],
      fundo: ["Palo Santo", "Cumaru", "Âmbar"],
    },
    imagem: paloSantoImg,
    accent: "linear-gradient(135deg, oklch(0.45 0.12 55), oklch(0.7 0.15 65))",
    ocasioes: ["Jantar sofisticado", "Reuniões noturnas", "Momentos íntimos"],
  },
  "mirra": {
    id: "mirra",
    nome: "Essencial Mirra",
    familia: "Resina Nobre · Oriental Magnético",
    frase: "A profundidade que desperta memória.",
    descricao: "Um oriental amadeirado envolvente construído sobre a resina de Mirra — nobre, quente e enigmática. Baunilha e couro trazem sensualidade; Tobacco e Copaíba assinam a força.",
    historia: "A Mirra é uma resina milenar valorizada em rituais desde a antiguidade. Sua profundidade única traduz-se em uma fragrância magnética, feita para quem entra em uma sala e transforma o ambiente.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 209,00",
    parcelas: "ou 6x de R$ 34,84 sem juros",
    piramide: {
      topo: ["Pimenta Rosa", "Bergamota", "Mandarina", "Cardamomo"],
      coracao: ["Mirra", "Rosa", "Jasmim"],
      fundo: ["Baunilha", "Couro", "Tobacco", "Copaíba"],
    },
    imagem: mirraImg,
    accent: "linear-gradient(135deg, oklch(0.55 0.16 70), oklch(0.8 0.16 80))",
    ocasioes: ["Eventos formais", "Encontros marcantes", "Noites de inverno"],
  },
  "atrai": {
    id: "atrai",
    nome: "Essencial Atraí",
    familia: "Floral Frutal · Sensual Magnético",
    frase: "A presença que não passa despercebida.",
    descricao: "Um floral frutal sensual que abre com framboesa e cassis, revela um coração de jasmim e rosa, e assina no amadeirado quente do patchouli. Feito para atrair — e permanecer.",
    historia: "Inspirado no gesto natural da atração, Atraí combina notas raras que despertam desejo e memória. Um aroma que se torna assinatura em segundos.",
    precoDe: "R$ 289,90",
    precoPor: "R$ 219,00",
    parcelas: "ou 6x de R$ 36,50 sem juros",
    piramide: {
      topo: ["Framboesa", "Pimenta Rosa", "Cassis", "Pera", "Maçã"],
      coracao: ["Violeta", "Jasmim", "Rosa"],
      fundo: ["Amadeirado", "Musk", "Patchouli"],
    },
    imagem: atraiImg,
    accent: "linear-gradient(135deg, oklch(0.35 0.15 350), oklch(0.6 0.2 350))",
    ocasioes: ["Encontros", "Festas", "Dia a dia com atitude"],
  },
};

export const Route = createFileRoute("/perfume/$id")({
  loader: ({ params }) => {
    const d = DETALHES[params.id];
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.nome} — Revendedora Oficial Natura` },
          { name: "description", content: loaderData.descricao },
          { property: "og:title", content: loaderData.nome },
          { property: "og:description", content: loaderData.frase },
          { property: "og:image", content: loaderData.imagem },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Perfume não encontrado" }, { name: "robots", content: "noindex" }],
  }),
  component: PerfumeDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-gradient-gold mb-4">Perfume não encontrado</h1>
        <Link to="/" className="btn-outline-gold"><ArrowLeft size={16} /> Voltar</Link>
      </div>
    </div>
  ),
});

const waLink = (produto: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no perfume ${produto} da linha Essencial Natura. Está com a promoção ativa?`)}`;

function PiramideCard({ label, notas }: { label: string; notas: string[] }) {
  return (
    <div className="card-lux p-5">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gradient-gold mb-3">{label}</p>
      <p className="font-display text-lg leading-snug text-foreground/90">
        {notas.join(" · ")}
      </p>
    </div>
  );
}

function PerfumeDetail() {
  const d = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40 z-0"
        style={{ background: `radial-gradient(ellipse 1000px 500px at 20% 20%, ${d.accent}, transparent 60%)` }}
      />

      <div className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gold-soft hover:text-gold mb-10 transition">
            <ArrowLeft size={16} /> Voltar à trilogia
          </Link>

          {/* HERO — Grid image + info */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* IMAGEM COM MOLDURA ORNADA */}
            <div className="relative animate-fade-up">
              <div className="relative frame-lux aspect-[4/3] overflow-hidden">
                {/* Rotating shine ring */}
                <div
                  className="absolute -inset-4 rounded-[1.75rem] opacity-30 blur-2xl animate-ring pointer-events-none"
                  style={{ background: `conic-gradient(from 0deg, transparent, ${d.accent}, transparent 60%)` }}
                />
                <img
                  src={d.imagem}
                  alt={d.nome}
                  className="w-full h-full object-cover animate-float-slow"
                />
                {/* Ambient vignette */}
                <div className="absolute inset-[10px] rounded-[0.85rem] pointer-events-none"
                     style={{ background: "radial-gradient(ellipse at center, transparent 55%, oklch(0.08 0.005 60 / 0.55) 100%)" }} />
                {/* Sparkles */}
                <Sparkles className="absolute top-4 right-6 text-gold animate-sparkle" size={16} style={{ animationDelay: "0.3s" }} />
                <Sparkles className="absolute bottom-8 left-8 text-gold-soft animate-sparkle" size={12} style={{ animationDelay: "1.4s" }} />
              </div>

              <div className="mt-4 text-center">
                <p className="text-[10px] tracking-[0.35em] uppercase text-gold/70">100ml · Deo Parfum</p>
              </div>
            </div>

            {/* INFO */}
            <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
              <p className="text-xs tracking-[0.35em] uppercase text-gradient-gold mb-3">{d.familia}</p>
              <h1 className="font-display text-5xl md:text-6xl leading-[1] mb-4">
                <span className="text-gradient-gold">{d.nome.replace("Essencial ", "Essencial\u00A0")}</span>
              </h1>
              <p className="font-display italic text-lg md:text-xl text-gold-soft mb-6">"{d.frase}"</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">{d.descricao}</p>

              {/* Pirâmide olfativa */}
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                <PiramideCard label="Notas de topo" notas={d.piramide.topo} />
                <PiramideCard label="Coração" notas={d.piramide.coracao} />
                <PiramideCard label="Fundo" notas={d.piramide.fundo} />
              </div>

              {/* Preço */}
              <div className="card-lux p-6 mb-6">
                <div className="flex items-end gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-muted-foreground line-through">De {d.precoDe}</p>
                    <p className="font-display text-4xl md:text-5xl text-gradient-gold leading-none">Por {d.precoPor}</p>
                    <p className="text-xs text-muted-foreground mt-1">{d.parcelas}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold-soft">
                    <Clock size={14} className="text-gold animate-pulse" /> Promoção por tempo limitado
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={waLink(d.nome)} target="_blank" rel="noreferrer" className="btn-gold flex-1">
                  <MessageCircle size={16} /> Comprar via WhatsApp
                </a>
                <Link
                  to="/checkout"
                  search={{ produto: d.id } as never}
                  className="btn-outline-gold flex-1"
                >
                  <ShoppingBag size={16} /> Comprar no site
                </Link>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { i: ShieldCheck, t: "100% Original" },
                  { i: Truck, t: "Envio p/ todo Brasil" },
                  { i: Award, t: "Revenda Oficial" },
                ].map(({ i: I, t }) => (
                  <div key={t} className="flex items-center gap-2 text-[11px] text-muted-foreground border border-gold/20 rounded-lg px-3 py-2">
                    <I size={14} className="text-gold shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HISTÓRIA */}
          <section className="mt-24 max-w-3xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold/80 mb-3">A história por trás</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6"><span className="text-gradient-gold">Uma essência com raízes</span></h2>
            <div className="divider-gold w-32 mx-auto mb-6" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{d.historia}</p>
          </section>

          {/* OCASIÕES */}
          <section className="mt-20">
            <h3 className="text-center font-display text-2xl md:text-3xl mb-8"><span className="text-gradient-gold">Perfeito para</span></h3>
            <div className="grid md:grid-cols-3 gap-4">
              {d.ocasioes.map((o: string, i: number) => (
                <div key={o} className="card-lux p-6 text-center" style={{ animationDelay: `${i * 100}ms` }}>
                  <Heart size={20} className="text-gold mx-auto mb-3" />
                  <p className="font-display text-lg text-foreground/90">{o}</p>
                </div>
              ))}
            </div>
          </section>

          {/* GATILHO COMBO */}
          <section className="mt-16 card-lux p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-gold/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold shrink-0">
                <Gift size={22} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">Combo Essencial</p>
                <h4 className="font-display text-2xl md:text-3xl text-gradient-gold">Leve 2 e ganhe 10% OFF extra</h4>
                <p className="text-sm text-muted-foreground mt-1">Combine com outra fragrância da trilogia · Cupom aplicado no WhatsApp</p>
              </div>
            </div>
            <a href={waLink(`combo ${d.nome} + outra fragrância`)} target="_blank" rel="noreferrer" className="btn-gold whitespace-nowrap">
              <MessageCircle size={16} /> Ativar combo
            </a>
          </section>
        </div>
      </div>

      <a
        href={waLink(d.nome)}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.72_0.18_150)] to-[oklch(0.55_0.16_150)] flex items-center justify-center shadow-xl text-white animate-pulse-ring hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
