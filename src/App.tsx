import React from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowRight, Linkedin, MessageCircle, Mail, Menu, X, ArrowUp, Scale, Terminal, Factory,
  Palette, Cpu, Search, LifeBuoy, ChevronDown, Database,
} from 'lucide-react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiVite, SiFramer, SiNodedotjs,
  SiAngular, SiDotnet, SiGrafana, SiGit, SiFigma,
} from 'react-icons/si';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const;

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setWidth((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[999] h-[2px] bg-teal"
      style={{ width: `${width}%`, transition: 'width 80ms linear' }}
    />
  );
};

// ─── MARQUEE TICKER ───────────────────────────────────────────────────────────

const MarqueeTicker = () => {
  const stack1 = ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Figma', 'Git', 'REST API'];
  const stack2 = ['UI/UX Design', 'SEO Avançado', 'Hospedagem', 'Performance', 'Mobile-First', 'Acessibilidade', 'Animações', 'Deploy'];
  return (
    <div className="relative overflow-hidden surface-dark py-5 space-y-3">
      <div className="flex animate-marquee">
        {[...stack1, ...stack1].map((item, i) => (
          <span key={i} className="flex items-center shrink-0 text-[10px] font-display font-bold uppercase tracking-[0.25em] text-white/50 mx-8">
            <span className="text-teal-bright mr-3">✦</span>
            {item}
          </span>
        ))}
      </div>
      <div className="flex animate-marquee-reverse">
        {[...stack2, ...stack2].map((item, i) => (
          <span key={i} className="flex items-center shrink-0 text-[10px] font-display font-bold uppercase tracking-[0.25em] text-white/30 mx-8">
            <span className="text-teal-bright mr-3">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const check = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  return (
    <motion.button
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-11 h-11 bg-ink text-white flex items-center justify-center rounded-full shadow-lg active:scale-95 transition-transform ${!visible ? 'pointer-events-none' : ''}`}
    >
      <ArrowUp size={16} />
    </motion.button>
  );
};

// ─── WHATSAPP FLOAT ──────────────────────────────────────────────────────────

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/5551995718366"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar pelo WhatsApp"
    className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50 flex items-center gap-3 group"
  >
    <div className="relative w-12 h-12 md:w-14 md:h-14 bg-[#25D366] flex items-center justify-center rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.5)] active:scale-95 md:group-hover:scale-110 transition-transform duration-200">
      <MessageCircle size={22} className="text-white" strokeWidth={2} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </div>
    <span className="hidden md:block bg-ink px-3 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
      Falar agora →
    </span>
  </a>
);

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────

const StatCounter = ({ num, suffix, label, delay = 0 }: {
  num: number; suffix: string; label: string; delay?: number;
}) => {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const duration = 1400;
      let startTime: number | null = null;
      const tick = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * num));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, num, delay]);

  return (
    <div ref={ref} className="flex flex-col group">
      <span className="text-teal-bright font-display text-3xl md:text-5xl font-black mb-1 md:mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
        {count}{suffix}
      </span>
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-text-dim-invert leading-tight">
        {label}
      </span>
    </div>
  );
};

// ─── LIVE SITE PREVIEW ───────────────────────────────────────────────────────

const PREVIEW_W = 1280;
const PREVIEW_H = 820;

const SitePreview = ({ url }: { url: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.38);
  const [loaded, setLoaded] = React.useState(false);
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    const compute = () => {
      if (ref.current) setScale(ref.current.clientWidth / PREVIEW_W);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const showFallback = timedOut && !loaded;

  return (
    <div ref={ref} className="relative overflow-hidden bg-black" style={{ height: Math.floor(PREVIEW_H * scale) }}>
      {!loaded && !showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="animate-pulse-teal" />
          <span className="text-[9px] font-bold text-teal-bright/40 tracking-[0.3em] uppercase">
            carregando preview...
          </span>
        </div>
      )}
      {showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <Scale size={20} className="text-teal-bright/50" />
          <span className="text-[9px] text-white/60 tracking-[0.2em] uppercase leading-relaxed">
            preview indisponível neste navegador
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-black text-teal-bright uppercase tracking-[0.3em] underline underline-offset-4"
          >
            abrir site em nova aba →
          </a>
        </div>
      )}
      <iframe
        src={url}
        title="Petry de Lima Advocacia — preview"
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          pointerEvents: 'none',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────────

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    ref.current.style.transition = 'transform 0.05s ease';
    ref.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
  }, []);

  const onMouseLeave = React.useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.5s ease';
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

// ─── PILL BADGE / DIVIDER ─────────────────────────────────────────────────────

const PillBadge = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`pill-badge ${dark ? 'text-white' : 'text-ink'}`}>{children}</span>
);

const DashedDivider = ({ dark = false }: { dark?: boolean }) => (
  <div className={`dashed-divider py-6 md:py-10 ${dark ? 'text-white' : 'text-ink'}`}>
    <span className="text-teal text-xs">✦</span>
  </div>
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const ids = ['sobre', 'projetos', 'skills', 'contato'];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35, rootMargin: '-80px 0px -80px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const menuItems = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 px-4 md:px-6"
    >
      <div className="w-full max-w-[1100px] rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between bg-paper/90 backdrop-blur-md border border-border-main shadow-sm">
        <a href="#" className="logo-glitch font-display font-black text-lg tracking-tight relative flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-xs">LM</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-200 ${
                  isActive ? 'text-teal-ink' : 'text-text-dim hover:text-teal-ink'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5551995718366"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-teal text-ink rounded-full px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase hover:brightness-95 active:scale-95 items-center gap-2 transition-all"
          >
            Falar comigo →
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ink p-1"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        aria-hidden={!isOpen}
        className={`absolute top-20 left-4 right-4 bg-paper p-8 rounded-3xl border border-border-main shadow-lg md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-display font-black tracking-tight text-ink border-b border-border-main pb-4 flex justify-between items-center group"
            >
              {item.name}
              <ArrowRight size={20} className="text-teal-ink opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
          <a
            href="https://wa.me/5551995718366"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal text-ink rounded-full text-center py-4 font-bold tracking-[0.15em] uppercase text-xs"
          >
            Falar comigo →
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 lg:items-center">
        {/* Left: pitch */}
        <div className="flex flex-col justify-center max-w-[600px] lg:max-w-none mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 border border-border-main bg-paper px-4 py-2 rounded-full mb-7 w-fit"
          >
            <div className="animate-pulse-teal" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-teal-ink">
              disponível para novos projetos
            </span>
          </motion.div>

          <h1 className="font-display font-black leading-[1.05] tracking-tight text-ink" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 64px)' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="block">
              Seu negócio merece
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="block text-teal-ink">
              um site profissional
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-text-dim text-base md:text-lg max-w-[480px] leading-relaxed mt-6 mb-10"
          >
            Olá, sou Lucas Manganelli. Crio sites modernos e rápidos que ajudam sua
            empresa a passar confiança, atrair mais clientes e vender mais na internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <a href="#projetos" className="bg-teal text-ink rounded-full text-xs font-bold tracking-widest uppercase px-8 py-4 text-center hover:brightness-95 transition-all">
              Ver Projetos →
            </a>
            <a
              href="https://wa.me/5551995718366"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink text-ink rounded-full text-xs font-bold tracking-widest uppercase px-8 py-4 text-center hover:bg-ink hover:text-white transition-all"
            >
              Pedir Orçamento ↗
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-10 pt-8 border-t border-border-main max-w-[480px]"
          >
            <div className="flex flex-col group">
              <span className="text-teal-ink font-display text-2xl md:text-4xl font-black mb-1 tracking-tight">3+</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-dim leading-tight">Anos em TI</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-teal-ink font-display text-2xl md:text-4xl font-black mb-1 tracking-tight">100%</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-dim leading-tight">Clientes Satisfeitos</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-teal-ink font-display text-2xl md:text-4xl font-black mb-1 tracking-tight">1+</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-text-dim leading-tight">Projetos no Ar</span>
            </div>
          </motion.div>
        </div>

        {/* Right: photo card */}
        <div className="order-first lg:order-last mx-auto lg:mx-0 w-full max-w-[300px] lg:max-w-none">
          <div className="relative surface-dark rounded-3xl p-3 overflow-hidden">
            <img
              src="/lucas.jpg"
              alt="Lucas Manganelli"
              className="w-full h-auto object-cover rounded-2xl"
              style={{ aspectRatio: '4 / 5', objectPosition: '50% 20%' }}
            />
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full">
              <div className="animate-pulse-teal" />
              <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">disponível</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const About = () => {
  const features = [
    { icon: Palette, title: 'Design', desc: 'Visual moderno, elegante e fácil de usar em qualquer tela.' },
    { icon: Cpu, title: 'Performance', desc: 'Sites que carregam rápido e nunca ficam fora do ar.' },
    { icon: LifeBuoy, title: 'Suporte', desc: 'Hospedagem, atualizações e consultoria contínua.' },
  ];

  const credentials = [
    { icon: Scale, title: 'Petry de Lima Adv.', status: 'Entregue', href: '#projetos' },
    { icon: Factory, title: 'Dev de Sistemas — STIHL', status: 'Atuando', href: 'https://www.linkedin.com/in/lucas-manganelli-17a777255/' },
    { icon: Terminal, title: 'Freelancer Full-stack', status: 'Ativo', href: '#contato' },
  ];

  return (
    <section id="sobre" className="px-6 py-20 md:py-32">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div {...fadeIn} className="flex flex-col items-center">
          <PillBadge>Sobre mim</PillBadge>
          <h2 className="font-display text-3xl md:text-5xl font-black mt-6 mb-8 tracking-tight text-ink">
            Um site para ser levado a sério
          </h2>
          <p className="text-text-dim leading-relaxed text-base md:text-lg max-w-[620px] mb-4">
            Não adianta ter um site que apenas "parece bonito". Minha obsessão é criar sites
            que carregam rápido e passam autoridade imediata para quem acessa.
          </p>
          <p className="text-text-dim leading-relaxed text-base md:text-lg max-w-[620px]">
            Uso o que há de mais moderno na tecnologia para garantir que seu site nunca
            fique fora do ar e seja encontrado facilmente por novos clientes. Você foca
            no seu negócio, eu cuido da sua presença digital.
          </p>
        </motion.div>

        <DashedDivider />

        <motion.div {...fadeIn} className="grid sm:grid-cols-3 gap-8 md:gap-12 text-left mb-16">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-start gap-3">
              <f.icon size={22} className="text-teal-ink" />
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-ink">{f.title}</h3>
              <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeIn} className="grid gap-3 max-w-[560px] mx-auto">
          {credentials.map((item, i) => {
            const isExternal = item.href.startsWith('http');
            return (
              <a
                key={i}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="bg-paper border border-border-main p-5 rounded-2xl flex items-center justify-between group hover:border-teal transition-colors"
              >
                <div className="flex items-center gap-4">
                  <item.icon size={16} className="text-teal-ink" />
                  <h4 className="font-bold text-xs uppercase tracking-wide text-ink">{item.title}</h4>
                </div>
                <span className="text-[10px] font-black text-teal-ink opacity-70">{item.status}</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const SkillGroup = ({ title, items, icon: Icon, num }: {
  title: string; items: string[]; icon: React.ElementType; num: string;
}) => (
  <div className="p-6 md:p-8 bg-paper border border-border-main rounded-2xl relative group hover:border-teal transition-all h-full overflow-hidden">
    <span className="absolute -right-2 -top-3 font-display font-black text-[5rem] leading-none text-ink/[0.04] select-none pointer-events-none">{num}</span>
    <div className="w-10 h-10 border border-teal/30 rounded-xl flex items-center justify-center bg-teal/5 mb-6">
      <Icon size={16} className="text-teal-ink" />
    </div>
    <h4 className="font-display font-bold text-sm uppercase tracking-wide text-ink mb-5">{title}</h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-text-dim text-[11px] font-bold uppercase tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const TechBadge = ({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color?: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-paper border border-border-main rounded-2xl flex items-center justify-center shadow-sm group-hover:border-teal group-hover:-translate-y-1 transition-all">
      <Icon size={26} style={{ color: color ?? 'var(--color-ink)' }} />
    </div>
    <span className="text-[9px] font-bold uppercase tracking-wide text-text-dim">{label}</span>
  </div>
);

const Skills = () => {
  const benefitGroups = [
    { title: 'Design', icon: Palette, num: '01', items: ['Visual Moderno', 'Fácil de Usar', 'Elegante', 'Adaptado ao Celular'] },
    { title: 'Desempenho', icon: Cpu, num: '02', items: ['Carrega Rápido', 'Seguro', 'Sem Travamentos', 'Estável'] },
    { title: 'Visibilidade', icon: Search, num: '03', items: ['Aparece no Google', 'Mais Visitantes', 'Fácil de Encontrar', 'Resultados Reais'] },
    { title: 'Suporte', icon: LifeBuoy, num: '04', items: ['Hospedagem', 'E-mail Profissional', 'Atualizações', 'Consultoria'] },
  ];

  const usingNow = [
    { icon: SiReact, label: 'React', color: '#149ECA' },
    { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4' },
    { icon: SiVite, label: 'Vite', color: '#8e5ff5' },
    { icon: SiFramer, label: 'Motion', color: '#000000' },
    { icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E' },
  ];

  const atWork = [
    { icon: SiAngular, label: 'Angular', color: '#DD0031' },
    { icon: SiDotnet, label: 'C# / .NET', color: '#512BD4' },
    { icon: Database, label: 'SQL Server', color: 'var(--color-ink)' },
    { icon: SiGrafana, label: 'Grafana', color: '#F46800' },
  ];

  const tools = [
    { icon: SiGit, label: 'Git', color: '#F05032' },
    { icon: SiFigma, label: 'Figma', color: '#A259FF' },
  ];

  return (
    <section id="skills" className="px-6 py-20 md:py-32 bg-paper/50">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn} className="text-center mb-16">
          <PillBadge>Skills</PillBadge>
          <h2 className="font-display text-3xl md:text-5xl font-black mt-6 tracking-tight text-ink">O que seu site terá</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {benefitGroups.map((group, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }} className="h-full">
              <SkillGroup {...group} />
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeIn} className="text-center mb-14">
          <PillBadge>Stack</PillBadge>
        </motion.div>

        <div className="grid gap-14">
          <motion.div {...fadeIn}>
            <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-text-dim mb-8">Usando agora</h3>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {usingNow.map((t) => <TechBadge key={t.label} {...t} />)}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-text-dim mb-8">Também no dia a dia (STIHL)</h3>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {atWork.map((t) => <TechBadge key={t.label} {...t} />)}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-text-dim mb-8">Ferramentas</h3>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {tools.map((t) => <TechBadge key={t.label} {...t} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const Projects = () => {
  return (
    <section id="projetos" className="px-6 py-20 md:py-32 surface-dark">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn} className="text-center mb-16">
          <PillBadge dark>Portfolio</PillBadge>
          <h2 className="font-display text-3xl md:text-5xl font-black mt-6 tracking-tight text-white">Entregas de Alta Performance</h2>
        </motion.div>

        <div className="grid gap-16">
          <TiltCard>
            <motion.div {...fadeIn} className="grid lg:grid-cols-2 gap-10 lg:gap-14 bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10">
              <div className="bg-black border border-white/10 overflow-hidden shadow-2xl relative group rounded-xl">
                <div className="bg-[#161616] px-4 py-3 flex items-center gap-3 border-b border-white/10">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-black/40 border border-white/10 rounded-full px-3 py-[5px] text-[9px] text-white/40 truncate text-center">
                      🔒 petrydelimaadvocacia.com.br
                    </div>
                  </div>
                  <div className="text-[7px] text-teal-bright/70 tracking-widest uppercase shrink-0 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-bright animate-pulse" />
                    live
                  </div>
                </div>
                <SitePreview url="https://petrydelimaadvocacia.com.br" />
                <a
                  href="https://petrydelimaadvocacia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 top-[44px] flex items-end p-5 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <span className="bg-teal text-ink text-[9px] font-black px-5 py-2.5 rounded-full tracking-[0.2em] uppercase">
                    Abrir Site →
                  </span>
                </a>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-8">
                  {['No Ar', 'Direito de Família', 'Gravataí/RS', 'SEO Jurídico'].map((tag) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.15em] border border-teal-bright/40 rounded-full px-3 py-1.5 text-teal-bright bg-teal-bright/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-black mb-2 tracking-tight leading-tight text-white">
                  Petry de Lima Advocacia
                </h3>
                <p className="text-white/50 mb-6 text-xs font-bold uppercase tracking-[0.15em]">
                  Dra. Maria Helena Petry de Lima — OAB/RS 79.269
                </p>
                <p className="text-white/70 mb-8 leading-relaxed text-base">
                  Site institucional para escritório especializado em Direito de Família
                  e Sucessões em Gravataí/RS. O desafio era transmitir autoridade e
                  acolhimento ao mesmo tempo — um equilíbrio raro num segmento tão
                  sensível — com um site rápido em qualquer celular e fácil de encontrar
                  no Google.
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-10">
                  {['Schema.org (SEO jurídico)', 'Fontes self-hosted', 'Contato direto no WhatsApp', 'Mobile-first'].map((item) => (
                    <span key={item} className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-wide">
                      <div className="w-1 h-1 rounded-full bg-teal-bright shrink-0" /> {item}
                    </span>
                  ))}
                </div>
                <a
                  href="https://petrydelimaadvocacia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-bright font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 group w-fit"
                >
                  Ver o site ao vivo <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          </TiltCard>

          <motion.div
            {...fadeIn}
            className="border border-dashed border-white/15 rounded-3xl p-10 md:p-16 text-center flex flex-col items-center justify-center bg-white/[0.02] group hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-[10px] font-bold text-teal-bright/50 mb-4 uppercase tracking-[0.4em]">próximo projeto</span>
            <h3 className="text-3xl font-display font-black mb-4 tracking-tight text-white opacity-40">Seu Site Aqui</h3>
            <p className="text-white/50 mb-8 max-w-sm text-xs font-bold uppercase tracking-[0.15em] leading-loose">
              Status: Disponível para começar seu site hoje.
            </p>
            <a
              href="https://wa.me/5551995718366"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-teal-bright/50 text-teal-bright rounded-full font-black text-[10px] uppercase tracking-[0.15em] w-full sm:w-auto px-8 py-4 hover:bg-teal-bright hover:text-black transition-all text-center"
            >
              Falar sobre projeto →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── PROCESS ──────────────────────────────────────────────────────────────────

const Process = () => {
  const steps = [
    { title: 'Conversa', desc: 'Entendo seus objetivos e o que seu negócio precisa.' },
    { title: 'Plano', desc: 'Mapeamos cada detalhe e funcionalidade do site.' },
    { title: 'Criação', desc: 'Desenvolvo tudo com o máximo de capricho e rigor.' },
    { title: 'Lançamento', desc: 'Seu site vai ao ar e eu te ensino a usar tudo.' },
  ];

  return (
    <section className="px-6 py-20 md:py-32">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn} className="text-center mb-16">
          <PillBadge>Como funciona</PillBadge>
          <h2 className="font-display text-3xl md:text-5xl font-black mt-6 tracking-tight text-ink">Como fazemos acontecer</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 counter-list">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-paper border border-border-main rounded-2xl p-8 group relative overflow-hidden hover:border-teal transition-colors"
            >
              <div className="counter-item mb-4 block" />
              <h4 className="text-sm font-black mb-3 font-display uppercase tracking-wide text-ink">{step.title}</h4>
              <p className="text-sm text-text-dim leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: 'Meu site vai aparecer no Google?',
      a: 'Com certeza. Utilizo técnicas de SEO (Otimização para Buscas) para que sua empresa seja encontrada mais facilmente por novos clientes.',
    },
    {
      q: 'O site funciona bem no celular?',
      a: 'Sim, 100%. Hoje, a maioria dos acessos vem pelo celular, então seu site será planejado para ser rápido e bonito em qualquer tela.',
    },
    {
      q: 'Quanto tempo demora para ficar pronto?',
      a: 'Depende da complexidade, mas um site profissional padrão costuma ser entregue em um prazo médio de 7 a 15 dias após o envio do conteúdo.',
    },
    {
      q: 'Quanto custa um site?',
      a: 'O valor varia conforme a complexidade e as funcionalidades do projeto. Me chama no WhatsApp e te passo um orçamento sob medida, sem compromisso.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-32 surface-dark">
      <div className="max-w-[800px] mx-auto">
        <motion.div {...fadeIn} className="text-center mb-16">
          <PillBadge dark>Dúvidas</PillBadge>
          <h2 className="font-display text-3xl md:text-5xl font-black mt-6 tracking-tight text-white">Tirando suas dúvidas</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${isOpen ? 'bg-teal-bright/[0.06] border-teal-bright/30' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <h4 className={`text-sm md:text-base font-display font-bold leading-tight transition-colors ${isOpen ? 'text-teal-bright' : 'text-white'}`}>
                    {faq.q}
                  </h4>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <ChevronDown size={16} className={`transition-colors ${isOpen ? 'text-teal-bright' : 'text-white/40'}`} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-8 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTA = () => {
  return (
    <section id="contato" className="px-6 py-20 md:py-32">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          {...fadeIn}
          className="relative bg-paper border border-border-main rounded-3xl p-10 md:p-16 lg:p-24 text-center"
        >
          <PillBadge>Vamos conversar?</PillBadge>
          <h2 className="font-display text-[2rem] md:text-4xl lg:text-5xl font-black mt-8 mb-6 tracking-tight text-ink leading-tight">
            Qual é o seu <span className="text-teal-ink">próximo passo?</span>
          </h2>
          <p className="text-text-dim mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Se você busca um site que passe profissionalismo e traga clientes,
            estou pronto para te ajudar. Vamos conversar hoje?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/5551995718366"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-ink rounded-full text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 text-center hover:brightness-95 transition-all"
            >
              Falar pelo WhatsApp →
            </a>
            <a
              href="mailto:lucas.p.manganelli23@gmail.com"
              className="border border-ink text-ink rounded-full text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 text-center hover:bg-ink hover:text-white transition-all"
            >
              Mandar um E-mail ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const socialLinks = [
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/lucas-manganelli-17a777255/' },
    { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/5551995718366' },
    { label: 'E-mail', icon: Mail, href: 'mailto:lucas.p.manganelli23@gmail.com' },
  ];

  return (
    <footer className="px-6 py-16 md:py-20 surface-dark">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-8 text-center">
        <div className="font-display font-black text-2xl text-white tracking-tight">
          lm<span className="text-teal-bright">.</span>
        </div>
        <div className="flex items-center gap-6">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/50 hover:text-teal-bright transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 space-y-1">
          <p>© {new Date().getFullYear()} Lucas Manganelli — Porto Alegre, RS</p>
        </div>
      </div>
    </footer>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <MarqueeTicker />
        <About />
        <Skills />
        <Projects />
        <Process />
        <FAQ />
        <CTA />
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
