import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, MessageCircle, Mail, Globe, Layers, ArrowUp, Scale, Terminal } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

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
      className="fixed top-0 left-0 z-[999] h-[2px] bg-brand-teal"
      style={{
        width: `${width}%`,
        boxShadow: '0 0 8px rgba(0,212,170,0.7), 0 0 20px rgba(0,212,170,0.3)',
        transition: 'width 80ms linear',
      }}
    />
  );
};

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────

const CursorGlow = () => {
  const [pos, setPos] = React.useState({ x: -500, y: -500 });
  React.useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
};

// ─── MARQUEE TICKER ───────────────────────────────────────────────────────────

const MarqueeTicker = () => {
  const stack = ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Figma', 'Git', 'REST API'];
  const items = [...stack, ...stack];
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-5 bg-white/[0.01]">
      <div className="flex animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/25 mx-10">
            <span className="text-brand-teal mr-3">▸</span>
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
      className={`fixed bottom-8 right-8 z-50 w-11 h-11 bg-brand-teal text-bg-dark flex items-center justify-center rounded-[2px] shadow-[0_0_20px_rgba(0,212,170,0.35)] hover:scale-110 active:scale-95 transition-transform font-black ${!visible ? 'pointer-events-none' : ''}`}
    >
      <ArrowUp size={16} />
    </motion.button>
  );
};

// ─── LIVE SITE PREVIEW ───────────────────────────────────────────────────────

const PREVIEW_W = 1280;
const PREVIEW_H = 820;

const SitePreview = ({ url }: { url: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.38);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const compute = () => {
      if (ref.current) setScale(ref.current.clientWidth / PREVIEW_W);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden bg-[#0b0c0e]" style={{ height: Math.floor(PREVIEW_H * scale) }}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="animate-pulse-teal" />
          <span className="text-[9px] font-mono text-brand-teal/30 tracking-[0.3em] uppercase">
            carregando preview...
          </span>
        </div>
      )}
      <iframe
        src={url}
        title="Petry de Lima Advocacia — preview"
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin"
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

// ─── FLOATING CODE (hero background) ─────────────────────────────────────────

const FloatingCode = () => {
  const snippets = [
    'const site = new Website()',
    'npm run deploy --prod',
    'return <Success />',
    'git push origin main',
    '// performance: 100/100',
    'await launch()',
    'SELECT * FROM clientes',
    'z-index: top_tier',
  ];
  const positions = [
    { left: '5%', top: '12%' },
    { left: '60%', top: '70%' },
    { left: '50%', top: '18%' },
    { left: '72%', top: '55%' },
    { left: '8%', top: '48%' },
    { left: '62%', top: '82%' },
    { left: '28%', top: '32%' },
    { left: '80%', top: '14%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
      {snippets.map((snippet, i) => (
        <motion.span
          key={i}
          className="absolute text-[11px] font-mono text-white whitespace-nowrap"
          style={positions[i]}
          animate={{ opacity: [0, 0.05, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.9,
            repeatDelay: snippets.length * 0.9 - 4,
          }}
        >
          {snippet}
        </motion.span>
      ))}
    </div>
  );
};

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-teal/15 to-transparent my-12 md:my-20" />
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const check = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

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
      <div
        className={`w-full max-w-[1100px] rounded-[2px] px-6 md:px-8 py-3 md:py-4 flex items-center justify-between tech-border transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent border-transparent'
        }`}
      >
        <a href="#" className="logo-glitch font-display font-black text-xl md:text-2xl tracking-tighter relative">
          LM<span className="text-brand-teal">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-2 group transition-colors duration-200 ${
                  isActive ? 'text-brand-teal' : 'text-text-dim hover:text-brand-teal'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-brand-teal scale-125' : 'bg-brand-teal/20 group-hover:bg-brand-teal'
                  }`}
                />
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
            className="hidden sm:flex bg-brand-teal text-bg-dark btn-geometric text-[9px] md:text-[10px] tracking-widest uppercase hover:translate-x-1 active:scale-95 items-center gap-2"
          >
            sys.connect() →
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-teal p-1">
            <Layers className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} size={24} />
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`absolute top-20 left-4 right-4 glass p-8 rounded-[2px] tech-border md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-display font-black tracking-widest text-white uppercase border-b border-white/5 pb-4 flex justify-between items-center group"
            >
              {item.name}
              <ArrowRight size={20} className="text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
          <a
            href="https://wa.me/5551995718366"
            className="bg-brand-teal text-bg-dark btn-geometric text-center py-4 font-black tracking-[0.2em] uppercase text-xs"
          >
            sys.connect() →
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 md:pt-32 overflow-hidden bg-grid">
      <FloatingCode />
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] radial-glow-teal -z-10 opacity-25 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] radial-glow-orange -z-10 opacity-15 blur-3xl" />
      <div className="absolute top-[35%] left-[25%] w-[400px] h-[400px] radial-glow-teal -z-10 opacity-08 blur-3xl" />

      <div className="max-w-[1100px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 border border-white/5 bg-white/[0.02] px-4 py-2 rounded-[2px] mb-12"
        >
          <div className="animate-pulse-teal" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-teal">
            // system.status: operational
          </span>
        </motion.div>

        <div className="overflow-hidden mb-3">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-black leading-[0.85] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(3rem, 12vw, 100px)' }}
          >
            Seu negócio
          </motion.div>
        </div>
        <div className="overflow-hidden mb-3">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.08, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-black leading-[0.85] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(3rem, 12vw, 100px)' }}
          >
            <span className="text-brand-teal text-glow-teal">merece</span> um
          </motion.div>
        </div>
        <div className="overflow-hidden mb-8 md:mb-12">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.16, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-display font-black leading-[0.85] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(3rem, 12vw, 100px)' }}
          >
            <span className="text-brand-orange text-glow-orange">site profissional</span>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-text-dim text-lg md:text-xl max-w-[550px] leading-relaxed border-l border-brand-teal/30 pl-8 font-medium"
          >
            Olá, sou Lucas Manganelli. Crio sites modernos e rápidos que ajudam sua
            empresa a passar confiança, atrair mais clientes e vender mais na internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projetos" className="bg-brand-teal text-bg-dark btn-geometric text-xs tracking-widest uppercase px-10 py-5">
              Ver Projetos →
            </a>
            <a
              href="https://wa.me/5551995718366"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 glass btn-geometric text-xs tracking-widest uppercase px-10 py-5 hover:bg-white/5"
            >
              Pedir Orçamento ↗
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5">
          {[
            { label: 'Projetos no Ar', value: '1+' },
            { label: 'Clientes Satisfeitos', value: '100%' },
            { label: 'Experiência em TI', value: '3+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              className={`flex flex-col group ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <span className="text-brand-teal font-display text-4xl md:text-5xl font-black mb-2 tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const About = () => {
  return (
    <section id="sobre" className="px-6 py-16 md:py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">01 // foco_em_resultados</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-10 md:mb-20 tracking-tighter">Um site para ser <br />levado a sério</h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_400px] gap-16 md:gap-24 items-start">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="space-y-8 md:space-y-10 text-text-dim leading-[1.8] text-base md:text-lg">
            <p>
              Não adianta ter um site que apenas "parece bonito". Minha obsessão é criar sites
              que carregam rápido e passam autoridade imediata para quem acessa.
            </p>
            <p>
              Uso o que há de mais moderno na tecnologia para garantir que seu site nunca
              fique fora do ar e que seja encontrado facilmente por novos clientes.
              Você foca no seu negócio, eu cuido da sua presença digital.
            </p>
            <div className="pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-8 text-white uppercase text-[9px] font-mono font-bold tracking-[0.2em]">
              <div className="flex flex-col gap-3">
                <span className="text-brand-teal opacity-50">// o_que_entrego</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-teal" /> Profissionalismo</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-teal" /> Velocidade</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-brand-teal opacity-50">// seus_resultados</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-teal" /> Mais Confiança</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-teal" /> Mais Contatos</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-8 tech-card">
            <div className="relative overflow-hidden tech-border p-2">
              <img
                src="/lucas.jpg"
                alt="Lucas Manganelli"
                className="aspect-square w-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute top-4 right-4 text-[8px] font-mono bg-brand-teal text-bg-dark px-2 py-1 font-bold">
                id: lucas.mang
              </div>
            </div>
            <div className="grid gap-3 font-mono">
              {[
                { icon: Scale, title: 'Petry de Lima Adv.', status: '200 OK' },
                { icon: Terminal, title: 'Fullstack Freelance', status: 'READY' },
              ].map((item, i) => (
                <div key={i} className="glass p-5 rounded-[2px] flex items-center justify-between group hover:bg-brand-teal/[0.03] transition-colors border-l-2 border-transparent hover:border-brand-teal">
                  <div className="flex items-center gap-4">
                    <item.icon size={16} className="text-brand-teal/60" />
                    <h4 className="font-bold text-xs uppercase tracking-widest">{item.title}</h4>
                  </div>
                  <span className="text-[9px] font-black text-brand-teal opacity-50">{item.status}</span>
                </div>
              ))}
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
    <section id="projetos" className="px-6 py-16 md:py-32 bg-white/[0.01] relative bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">02 // deployment_records</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-12 md:mb-24 tracking-tighter">Entregas de Alta Performance</h2>
        </motion.div>

        <div className="grid gap-16">
          <TiltCard>
            <motion.div {...fadeIn} className="grid lg:grid-cols-2 gap-12 lg:gap-16 bg-glass p-6 md:p-8 lg:p-12 tech-card tech-border">
              {/* Browser window with live preview */}
              <div className="bg-[#0b0c0e] border border-white/5 overflow-hidden shadow-2xl relative group rounded-sm">
                <div className="bg-[#1a1b1f] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-[#0b0c0e]/80 border border-white/10 rounded-[2px] px-3 py-[5px] text-[9px] font-mono text-white/35 truncate text-center">
                      🔒 petrydelimaadvocacia.com.br
                    </div>
                  </div>
                  <div className="text-[7px] font-mono text-brand-teal/60 tracking-widest uppercase shrink-0 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                    live
                  </div>
                </div>
                <SitePreview url="https://petrydelimaadvocacia.com.br" />
                <a
                  href="https://petrydelimaadvocacia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 top-[44px] flex items-end p-5 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <span className="bg-brand-teal text-bg-dark text-[9px] font-mono font-black px-5 py-2.5 tracking-[0.3em] uppercase">
                    Abrir Site →
                  </span>
                </a>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Production', 'Legal_Tech', 'V8_Engine'].map((tag) => (
                    <span key={tag} className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] border border-brand-teal/30 px-3 py-1.5 text-brand-teal bg-brand-teal/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black mb-8 tracking-tighter leading-tight uppercase">
                  Petry de Lima <br /><span className="text-brand-teal">Advocacia</span>
                </h3>
                <p className="text-text-dim mb-12 leading-[1.8] text-lg font-medium">
                  Site profissional criado para transmitir seriedade e autoridade.
                  Totalmente adaptado para celulares e otimizado para que o cliente
                  encontre os contatos rapidamente.
                </p>
                <a
                  href="https://petrydelimaadvocacia.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-teal font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 group w-fit"
                >
                  // ver_site_no_ar() <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          </TiltCard>

          <motion.div
            {...fadeIn}
            className="border border-dashed border-white/5 p-10 md:p-20 text-center flex flex-col items-center justify-center bg-white/[0.01] group hover:bg-brand-teal/[0.02] transition-colors"
          >
            <span className="text-[10px] font-mono font-bold text-brand-teal/30 mb-6 uppercase tracking-[0.6em]">próxima_entrega</span>
            <h3 className="text-4xl font-display font-black mb-6 tracking-tighter uppercase opacity-40">Seu Site Aqui_</h3>
            <p className="text-text-dim mb-10 max-w-sm text-xs font-bold uppercase tracking-[0.2em] leading-loose">
              Status: Disponível para <br /> começar seu site hoje.
            </p>
            <a
              href="https://wa.me/5551995718366"
              className="border border-brand-teal/40 text-brand-teal btn-geometric font-black text-[10px] uppercase tracking-[0.2em] px-12 py-5 hover:bg-brand-teal hover:text-bg-dark transition-all"
            >
              Falar sobre projeto →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const Skills = () => {
  const SkillGroup = ({ title, code, items }: { title: string; code: string; items: string[] }) => (
    <div className="space-y-6 md:space-y-10 p-6 md:p-10 bg-glass tech-border relative group hover:bg-white/[0.02] transition-colors h-full">
      <div className="flex justify-between items-start">
        <h4 className="font-display font-black text-xs uppercase tracking-[0.4em] text-brand-teal">{title}</h4>
        <span className="text-[7px] font-mono text-white/20">{code}</span>
      </div>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-4 text-text-dim text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="w-1.5 h-[1px] bg-brand-teal group-hover:w-4 transition-all duration-300" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" className="px-6 py-16 md:py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">03 // diferenciais_tecnicos</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-12 md:mb-24 tracking-tighter">O que seu site terá</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Visual', code: 'FRONT_END', items: ['Design Moderno', 'Fácil de Usar', 'Elegante', 'Minimalista'] },
            { title: 'Cérebros', code: 'BACK_END', items: ['Rápido', 'Seguro', 'Sem Travamentos', 'Estável'] },
            { title: 'Visibilidade', code: 'SEO_OPT', items: ['Aparecer no Google', 'Carregamento Rápido', 'Mobile-First', 'Performance'] },
            { title: 'Suporte', code: 'CARE_LINE', items: ['Hospedagem', 'E-mail Profissional', 'Atualizações', 'Consultoria'] },
          ].map((group, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
              <SkillGroup {...group} />
            </motion.div>
          ))}
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
    <section className="px-6 py-16 md:py-32 bg-grid relative">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">04 // passo_a_passo</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-12 md:mb-24 tracking-tighter">Como fazemos acontecer</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 bg-white/5 p-[1px] tech-border counter-list">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-dark p-8 md:p-12 group relative overflow-hidden"
            >
              <div className="counter-item mb-6 block" />
              <h4 className="text-sm font-black mb-4 font-display uppercase tracking-widest">{step.title}</h4>
              <p className="text-[10px] text-text-dim leading-relaxed font-bold uppercase tracking-widest opacity-60">{step.desc}</p>
              <div className="absolute inset-0 bg-brand-teal/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-brand-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ = () => {
  const faqs = [
    {
      q: 'O site será meu para sempre?',
      a: 'Sim. Ao finalizar o projeto, todo o código e propriedade do site são seus. Não cobro mensalidades pelo uso do site.',
    },
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
  ];

  return (
    <section className="px-6 py-24 md:py-32 bg-bg-dark relative">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">05 // perguntas_frequentes</span>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-8 md:mb-16 tracking-tighter">Tirando suas dúvidas</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 md:p-10 tech-border hover:bg-white/[0.02] transition-colors"
            >
              <h4 className="text-lg font-display font-black text-white mb-4 leading-tight tracking-tight uppercase">
                <span className="text-brand-teal mr-2">/</span>{faq.q}
              </h4>
              <p className="text-text-dim text-sm leading-relaxed font-medium">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTA = () => {
  return (
    <section id="contato" className="px-6 py-16 md:py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          {...fadeIn}
          className="relative bg-glass border border-brand-teal/20 p-12 lg:p-32 overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
          <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] radial-glow-teal opacity-10 blur-3xl pointer-events-none" />

          <span className="text-[9px] font-mono font-bold text-brand-teal uppercase tracking-[0.6em] mb-10 block">iniciando_conversa...</span>
          <h2 className="font-display text-5xl md:text-[5rem] font-black mb-12 tracking-tighter leading-none">
            Qual é o seu <br /><span className="text-brand-teal">próximo passo?</span>
          </h2>
          <p className="text-text-dim mb-16 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Se você busca um site que passe profissionalismo e traga clientes,
            estou pronto para te ajudar. Vamos conversar hoje?
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://wa.me/5551995718366" className="bg-brand-teal text-bg-dark btn-geometric text-xs tracking-[0.2em] px-16 py-6">
              Falar pelo WhatsApp →
            </a>
            <a
              href="mailto:lucas.p.manganelli23@gmail.com"
              className="border border-white/10 glass btn-geometric text-xs tracking-[0.2em] px-16 py-6 hover:bg-white/5"
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
    <footer className="px-6 py-16 md:py-24 border-t border-white/5 bg-black/40">
      <div className="max-w-[1100px] mx-auto flex flex-col md:grid md:grid-cols-3 gap-12 md:gap-16 items-start font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-text-dim text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-6 w-full">
          <div className="font-display font-black text-4xl text-white tracking-tighter lowercase">
            lm<span className="text-brand-teal">.</span>
          </div>
          <p className="opacity-40 uppercase tracking-widest">System verified by Lucas Manganelli</p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 w-full">
          <span className="text-brand-teal opacity-50 mb-2">// social_nodes</span>
          <div className="flex flex-col gap-4">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-teal transition-colors flex items-center justify-center md:justify-start gap-3 group"
              >
                <Icon size={11} className="text-brand-teal/40 group-hover:text-brand-teal transition-colors" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 w-full">
          <span className="text-brand-teal opacity-50 mb-2">// environmental_data</span>
          <span>© {new Date().getFullYear()} V1.0 Stable Build</span>
          <span>Porto Alegre, RS // Brazil</span>
        </div>
      </div>
    </footer>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <CTA />
      <Footer />
      <BackToTop />
    </div>
  );
}
