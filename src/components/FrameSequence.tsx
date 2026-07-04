import { useEffect, useRef, useState, useCallback } from "react";

// Frame ranges based on user's specification (824 total frames)
// 1-295: Palo Santo (nítido em 1, transição depois)
// 296-308: transição Palo Santo -> Mirra
// 309-595: Mirra (nítido em 309)
// 596-604: transição Mirra -> Atrai
// 605-824: Atrai (nítido em 605)
const TOTAL_FRAMES = 824;

type Caption = {
  start: number;
  end: number;
  kicker: string;
  title: string;
  subtitle: string;
  tagline: string;
};

const CAPTIONS: Caption[] = [
  { start: 1, end: 295, kicker: "Alta Perfumaria", title: "Madeira Sagrada", subtitle: "Amadeirado quente e sofisticado", tagline: "A força ancestral que desperta sua essência" },
  { start: 296, end: 308, kicker: "Transição", title: "Uma nova essência", subtitle: "desperta", tagline: "Do calor da madeira ao mistério da resina" },
  { start: 309, end: 595, kicker: "Alta Perfumaria", title: "Resina Nobre", subtitle: "Oriental magnético e profundo", tagline: "Revele a força que existe em você" },
  { start: 596, end: 604, kicker: "Transição", title: "A sedução", subtitle: "se aproxima", tagline: "Da profundidade oriental ao floral marcante" },
  { start: 605, end: 824, kicker: "Alta Perfumaria", title: "Floral Magnético", subtitle: "Atração e sofisticação", tagline: "Desperte presença por onde passa" },
];

function getCaption(frame: number): Caption {
  return CAPTIONS.find((c) => frame >= c.start && frame <= c.end) ?? CAPTIONS[0];
}

// The user places frames at /public/frames/IMG1.jpg ... IMG824.jpg
const framePath = (n: number) => `/frames/IMG${n}.jpg`;

export function FrameSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(1);
  const [loaded, setLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [hasFrames, setHasFrames] = useState(true);

  // Preload frames (progressive)
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);

    // Check if the frames exist by loading first frame
    const test = new Image();
    test.onerror = () => { if (!cancelled) setHasFrames(false); };
    test.onload = () => {
      if (cancelled) return;
      imgs[1] = test;
      setLoaded(1);
      setReady(true);
      // Preload rest in chunks
      let i = 2;
      const loadNext = () => {
        if (cancelled || i > TOTAL_FRAMES) return;
        const batch = Math.min(i + 15, TOTAL_FRAMES + 1);
        const promises: Promise<void>[] = [];
        for (; i < batch; i++) {
          const idx = i;
          const im = new Image();
          promises.push(
            new Promise<void>((res) => {
              im.onload = im.onerror = () => res();
              im.src = framePath(idx);
            })
          );
          imgs[idx] = im;
        }
        Promise.all(promises).then(() => {
          if (cancelled) return;
          setLoaded(i - 1);
          setTimeout(loadNext, 30);
        });
      };
      loadNext();
    };
    test.src = framePath(1);
    imagesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  // Draw current frame
  const draw = useCallback((n: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[n] || imagesRef.current[Math.max(1, n - 1)] || imagesRef.current[1];
    if (!img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    // Cover fit
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let dw = w, dh = h, dx = 0, dy = 0;
    if (ir > cr) { dw = h * ir; dx = (w - dw) / 2; } else { dh = w / ir; dy = (h - dh) / 2; }
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Scroll-driven playback
  useEffect(() => {
    if (!ready) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;
        const target = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
        setFrame(target);
        draw(target);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ready, draw]);

  useEffect(() => { draw(frame); }, [loaded, draw, frame]);

  const cap = getCaption(frame);
  const progress = ((frame - 1) / (TOTAL_FRAMES - 1)) * 100;

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Radial vignette */}
        <div className="pointer-events-none absolute inset-0 z-10" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.005 60 / 0.85) 90%)"
        }} />

        {/* Frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Fallback message if frames missing */}
        {!hasFrames && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="max-w-lg text-center px-6 card-lux p-8">
              <p className="font-display text-2xl text-gold text-glow mb-3">Cinematic Frame Sequence</p>
              <p className="text-sm text-muted-foreground">
                Adicione suas 824 imagens em <code className="text-gold">public/frames/</code> nomeadas
                <code className="text-gold"> IMG1.jpg</code> até <code className="text-gold">IMG824.jpg</code>.
                As legendas dos perfumes aparecerão automaticamente sincronizadas.
              </p>
            </div>
          </div>
        )}

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-left max-w-full min-w-0" key={cap.title}>
              <p className="font-sans text-[10px] sm:text-xs md:text-sm tracking-[0.3em] uppercase text-gold/80 mb-3 sm:mb-4 animate-fade-in">
                {cap.kicker}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] animate-fade-up break-words">
                <span className="text-gradient-gold">Essencial</span>
                <br />
                <span className="text-gradient-gold">{cap.title}</span>
              </h2>
              <div className="divider-gold w-24 sm:w-32 my-5 sm:my-6" />
              <p className="font-display italic text-lg sm:text-xl md:text-2xl text-gold-soft mb-2 animate-fade-up">
                {cap.subtitle}
              </p>
              <p className="font-sans text-sm md:text-base text-muted-foreground max-w-md mb-6 sm:mb-8 animate-fade-up">
                {cap.tagline}
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up">
                <a href="#catalogo" className="btn-gold">Comprar agora</a>
                <a href="#sobre" className="btn-outline-gold">Saber mais</a>
              </div>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>

        {/* Bottom bar: elegant scroll hint + progress (internal counter hidden from users) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-4 sm:px-6 md:px-12 pb-4 sm:pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-gold/70 mb-2">
              <span className="truncate">Alta Perfumaria</span>
              <span className="hidden sm:inline">Role para descobrir</span>
              <span className="truncate text-right">{cap.title}</span>
            </div>
            <div className="h-[2px] w-full bg-gold/15 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-transparent via-[oklch(0.82_0.14_82)] to-transparent transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
