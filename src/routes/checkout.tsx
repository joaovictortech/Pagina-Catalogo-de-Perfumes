import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Truck, MessageCircle, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  produto: z.enum(["palo-santo", "mirra", "atrai"]).optional().catch("palo-santo"),
});

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  validateSearch: searchSchema,
});

const WHATSAPP = "5511999999999";

const PRODUTOS = {
  "palo-santo": { nome: "Essencial Palo Santo", preco: 189.9, precoDe: 279.9 },
  "mirra": { nome: "Essencial Mirra", preco: 210.0, precoDe: 279.9 },
  "atrai": { nome: "Essencial Atrai", preco: 210.0, precoDe: 279.9 },
} as const;

function money(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Checkout() {
  const { produto = "palo-santo" } = useSearch({ from: "/checkout" }) as { produto?: keyof typeof PRODUTOS };
  const item = PRODUTOS[produto] ?? PRODUTOS["palo-santo"];
  const [qtd, setQtd] = useState(1);
  const [pagamento, setPagamento] = useState<"pix" | "cartao" | "boleto">("pix");
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", cpf: "", telefone: "", cep: "", endereco: "", cidade: "", uf: "", numero: "", complemento: "" });

  const subtotal = item.preco * qtd;
  const desconto = pagamento === "pix" ? subtotal * 0.05 : 0;
  const frete = subtotal >= 150 ? 0 : 19.9;
  const total = subtotal - desconto + frete;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    // Mensagem WhatsApp com dados do pedido (pagamento manual pelo revendedor)
    const msg = `Olá! Fiz um pedido no site:%0A%0A*${item.nome}* x${qtd} = ${money(subtotal)}%0APagamento: ${pagamento.toUpperCase()}%0ATotal: ${money(total)}%0A%0ANome: ${form.nome}%0ACPF: ${form.cpf}%0AEndereço: ${form.endereco}, ${form.numero} - ${form.cidade}/${form.uf} - CEP ${form.cep}`;
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank"), 800);
  };

  const input = "w-full bg-[oklch(0.14_0.01_60)] border border-gold/25 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition";

  if (enviado) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="card-lux p-10 max-w-lg text-center">
            <CheckCircle2 size={56} className="text-gold mx-auto mb-4" />
            <h1 className="font-display text-4xl text-gold text-glow mb-3">Pedido recebido!</h1>
            <p className="text-muted-foreground mb-6">
              Estamos te redirecionando para o WhatsApp da revendedora para finalizar o pagamento e confirmar a entrega.
            </p>
            <Link to="/" className="btn-outline-gold"><ArrowLeft size={16} /> Voltar ao início</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gold-soft hover:text-gold mb-6 transition">
            <ArrowLeft size={16} /> Continuar comprando
          </Link>

          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-gold/80 mb-2">Finalizar Compra</p>
            <h1 className="font-display text-4xl md:text-5xl text-gold text-glow">Checkout Seguro</h1>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-2">
              <Lock size={12} /> Ambiente 100% protegido · Revendedora Oficial Natura
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* FORMULÁRIO */}
            <form onSubmit={onSubmit} className="card-lux p-6 md:p-8 space-y-8">
              <div>
                <h2 className="font-display text-xl text-gold uppercase tracking-wider mb-4">1. Dados pessoais</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input required value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} placeholder="Nome completo" className={input + " md:col-span-2"} />
                  <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="E-mail" className={input} />
                  <input required value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})} placeholder="Telefone / WhatsApp" className={input} />
                  <input required value={form.cpf} onChange={(e) => setForm({...form, cpf: e.target.value})} placeholder="CPF" className={input} />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl text-gold uppercase tracking-wider mb-4">2. Entrega</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <input required value={form.cep} onChange={(e) => setForm({...form, cep: e.target.value})} placeholder="CEP" className={input} />
                  <input required value={form.endereco} onChange={(e) => setForm({...form, endereco: e.target.value})} placeholder="Endereço" className={input + " md:col-span-2"} />
                  <input required value={form.numero} onChange={(e) => setForm({...form, numero: e.target.value})} placeholder="Número" className={input} />
                  <input value={form.complemento} onChange={(e) => setForm({...form, complemento: e.target.value})} placeholder="Complemento" className={input} />
                  <input required value={form.cidade} onChange={(e) => setForm({...form, cidade: e.target.value})} placeholder="Cidade" className={input} />
                  <input required value={form.uf} onChange={(e) => setForm({...form, uf: e.target.value})} placeholder="UF" maxLength={2} className={input} />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl text-gold uppercase tracking-wider mb-4">3. Pagamento</h2>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "pix", label: "PIX", desc: "5% off" },
                    { id: "cartao", label: "Cartão", desc: "até 6x" },
                    { id: "boleto", label: "Boleto", desc: "à vista" },
                  ] as const).map((opt) => (
                    <button type="button" key={opt.id} onClick={() => setPagamento(opt.id)}
                      className={`p-4 rounded-lg border transition text-center ${pagamento === opt.id ? "border-gold bg-gold/10" : "border-gold/25 hover:border-gold/60"}`}>
                      <CreditCard size={18} className="mx-auto mb-1 text-gold" />
                      <div className="font-display text-lg text-gold">{opt.label}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-gold w-full text-sm py-4">
                <Lock size={16} /> Finalizar pedido · {money(total)}
              </button>
              <p className="text-[11px] text-center text-muted-foreground">
                Ao finalizar, você será redirecionado para o WhatsApp da revendedora para confirmar o pagamento.
              </p>
            </form>

            {/* RESUMO */}
            <aside className="space-y-4">
              <div className="card-lux p-6">
                <h3 className="font-display text-lg text-gold uppercase tracking-wider mb-4">Resumo</h3>
                <div className="flex gap-4 pb-4 border-b border-gold/15">
                  <div className="w-20 h-24 rounded-md bg-gradient-to-b from-[oklch(0.35_0.08_60)] to-[oklch(0.15_0.02_60)] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-display text-base text-gold">{item.nome}</p>
                    <p className="text-xs text-muted-foreground mb-2">100ml · Deo Parfum</p>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setQtd(Math.max(1, qtd - 1))} className="w-7 h-7 border border-gold/30 rounded text-gold hover:bg-gold/10">−</button>
                      <span className="w-8 text-center text-sm">{qtd}</span>
                      <button type="button" onClick={() => setQtd(qtd + 1)} className="w-7 h-7 border border-gold/30 rounded text-gold hover:bg-gold/10">+</button>
                    </div>
                  </div>
                </div>
                <dl className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{money(subtotal)}</dd></div>
                  {desconto > 0 && <div className="flex justify-between text-gold"><dt>Desconto PIX (5%)</dt><dd>− {money(desconto)}</dd></div>}
                  <div className="flex justify-between"><dt className="text-muted-foreground">Frete</dt><dd>{frete === 0 ? <span className="text-gold">Grátis</span> : money(frete)}</dd></div>
                  <div className="flex justify-between pt-3 border-t border-gold/15 font-display text-lg text-gold">
                    <dt>Total</dt><dd className="text-glow">{money(total)}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-lux p-5 space-y-3 text-xs">
                {[
                  { i: ShieldCheck, t: "Revendedora oficial Natura" },
                  { i: Truck, t: "Frete grátis acima de R$ 150" },
                  { i: Lock, t: "Pagamento seguro" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="flex items-center gap-3 text-muted-foreground">
                    <Icon size={16} className="text-gold" /> {t}
                  </div>
                ))}
              </div>

              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn-outline-gold w-full">
                <MessageCircle size={16} /> Dúvidas? Chame no WhatsApp
              </a>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
