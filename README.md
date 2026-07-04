# Natura Essencial — E-commerce de Revendedora Oficial

Landing page e checkout de alta conversão para revendedora oficial da linha
**Natura Essencial**, com foco nos perfumes **Palo Santo**, **Mirra** e
**Atrai**. Construída com foco em performance, storytelling visual e experiência
mobile impecável.

## ✨ Experiência

- **Hero cinematográfico controlado por scroll** — sequência de frames
  sincronizada com legendas dinâmicas que apresentam cada fragrância de forma
  imersiva (transições automáticas entre Palo Santo, Mirra e Atrai).
- **Catálogo premium** com cards arredondados, bordas douradas, notas
  olfativas, preço promocional e dupla ação de compra (WhatsApp direto +
  Checkout interno).
- **Checkout completo** — coleta de dados pessoais, endereço com validação,
  seleção de forma de pagamento (PIX com 5% de desconto, Cartão em até 6x,
  Boleto), resumo do pedido, frete grátis a partir de R$ 150 e disparo
  automático do pedido para o WhatsApp da revendedora.
- **Gatilhos de conversão**: contador regressivo, selo "Mais vendido",
  avaliações, depoimentos, prova social e escassez controlada.
- **Identidade visual coesa**: duas famílias tipográficas apenas
  (`Cormorant Garamond` para display e `Montserrat` para o corpo), paleta
  preta profunda com dourado luminoso, gradientes e sombras cinematográficas.
- **Totalmente responsivo** — layout otimizado para celular, tablet e desktop,
  com hierarquia, tap targets e tipografia adaptadas a cada breakpoint.
- **Disclaimer legal de "Revendedora Oficial Natura"** presente no topo e no
  rodapé, em conformidade com boas práticas de revenda.

## 🚀 Como rodar localmente

Requisitos: [Bun](https://bun.sh) ou Node.js 20+.

```bash
bun install
bun run dev
```

Aplicação disponível em `http://localhost:5173`.

Para gerar o build de produção:

```bash
bun run build
bun run preview
```

## 🖼 Assets da animação (uso interno)

A sequência cinematográfica do hero é renderizada a partir de uma pasta de
frames servida estaticamente. Este detalhe é **interno** e não é exposto ao
visitante do site.

```
public/frames/IMG1.jpg
public/frames/IMG2.jpg
...
```

As faixas de perfume da narrativa estão definidas em
`src/components/FrameSequence.tsx` e podem ser ajustadas conforme o material
de campanha da revendedora.

## ⚙️ Configurações rápidas

| O que ajustar             | Onde                                                                                  |
|---------------------------|---------------------------------------------------------------------------------------|
| Número do WhatsApp        | Constante `WHATSAPP` em `src/routes/index.tsx` e `src/routes/checkout.tsx`            |
| Preços e promoções        | Objeto `PRODUTOS` em `src/routes/index.tsx` e `src/routes/checkout.tsx`               |
| Cores, fontes, animações  | Tokens OKLCH em `src/styles.css` (nunca use cores fixas nos componentes)              |
| Metadados / SEO           | `head()` em `src/routes/__root.tsx` e em cada rota                                    |

## 🏗 Stack técnica

- **TanStack Start v1** (React 19 + Vite 7, com suporte a SSR)
- **Tailwind CSS v4** com design system OKLCH e tokens semânticos
- **shadcn/ui** como base de componentes
- **lucide-react** para ícones
- **Zod** para validação de formulários
- **TypeScript strict** em toda a base

## 📁 Estrutura

```
src/
├── components/         Componentes reutilizáveis (Header, FrameSequence, UI)
├── routes/             Rotas file-based (TanStack Router)
│   ├── __root.tsx      Layout raiz + metadados globais
│   ├── index.tsx       Home / landing
│   ├── checkout.tsx    Checkout completo
│   └── perfume.$id.tsx Página de detalhe do produto
├── assets/             Imagens de produto
├── lib/                Utilitários
└── styles.css          Design system (Tailwind v4 + tokens OKLCH)
```

## 📱 Responsividade

Todos os componentes foram construídos mobile-first e testados nas seguintes
larguras: 375px, 414px, 768px, 1024px, 1280px e 1536px. Grids colapsam para
uma coluna no mobile, tipografia escala progressivamente e a navegação usa um
menu hambúrguer abaixo de `lg`.

## 📄 Licença

Uso restrito à revendedora proprietária deste projeto.
