/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Linkedin, 
  Github, 
  MessageCircle, 
  ExternalLink, 
  Mail, 
  CheckCircle2, 
  Globe, 
  Database, 
  Code2, 
  Layers 
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const SectionDivider = () => (
  <div className="w-full h-px bg-border-main my-12 md:my-20" />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 px-4 md:px-6">
      <div className="w-full max-w-[1100px] glass rounded-[2px] px-6 md:px-8 py-3 md:py-4 flex items-center justify-between tech-border">
        <a href="#" className="font-display font-black text-xl md:text-2xl tracking-tighter hover:text-brand-teal transition-colors">
          LM<span className="text-brand-teal">.</span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-[10px] font-black tracking-[0.3em] text-text-dim hover:text-brand-teal transition-colors uppercase flex items-center gap-2 group"
            >
              <span className="w-1 h-1 bg-brand-teal/20 rounded-full group-hover:bg-brand-teal transition-colors" />
              {item.name}
            </a>
          ))}
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
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-teal p-1"
          >
            {isOpen ? <Layers className="rotate-45" size={24} /> : <Layers size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
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
            sys.connect_mobile() →
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 overflow-hidden bg-grid">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] radial-glow-teal -z-10 opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] radial-glow-orange -z-10 opacity-20 blur-3xl" />
      
      <div className="max-w-[1100px] mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 border border-white/5 bg-white/[0.02] px-4 py-2 rounded-[2px] mb-12"
        >
          <div className="animate-pulse-teal" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-teal">
            // system.status: operational
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black leading-[0.85] mb-12 tracking-[-0.06em]"
          style={{ fontSize: 'clamp(3rem, 12vw, 100px)' }}
        >
          Seu negócio <br />
          <span className="text-brand-teal text-glow-teal">merece</span> um <br />
          <span className="text-brand-orange text-glow-orange">site profissional</span>
        </motion.h1>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-lg md:text-xl max-w-[550px] leading-relaxed border-l border-brand-teal/30 pl-8 font-medium"
          >
            Olá, sou Lucas Manganelli. Crio sites modernos e rápidos que ajudam sua 
            empresa a passar confiança, atrair mais clientes e vender mais na internet.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projetos" className="bg-brand-teal text-bg-dark btn-geometric text-xs tracking-widest uppercase px-10 py-5">
              Ver Projetos →
            </a>
            <a 
              href="https://wa.me/5551995718366" 
              target="_blank"
              className="border border-white/10 glass btn-geometric text-xs tracking-widest uppercase px-10 py-5 hover:bg-white/5"
            >
              Pedir Orçamento ↗
            </a>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-20 md:mt-24 pt-12 border-t border-white/5">
          {[
            { label: 'Projetos no Ar', value: '1+' },
            { label: 'Clientes Satisfeitos', value: '100%' },
            { label: 'Experiência em TI', value: '3+' }
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col group ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
              <span className="text-brand-teal font-display text-4xl md:text-5xl font-black mb-2 tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-text-dim">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="px-6 py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">01 // foco_em_resultados</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-20 tracking-tighter">Um site para ser <br />levado a sério</h2>
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
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=800"
                alt="Lucas Manganelli"
                className="aspect-square w-full object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 text-[8px] font-mono bg-brand-teal text-bg-dark px-2 py-1 font-bold">
                id: lucas.mang
              </div>
            </div>
            
            <div className="grid gap-3 font-mono">
              {[
                { icon: '⚖️', title: 'Petry de Lima Adv.', status: '200 OK' },
                { icon: '💻', title: 'Fullstack Freelance', status: 'READY' }
              ].map((item, i) => (
                <div key={i} className="glass p-5 rounded-[2px] flex items-center justify-between group hover:bg-brand-teal/[0.03] transition-colors border-l-2 border-transparent hover:border-brand-teal">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{item.icon}</span>
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

const Projects = () => {
  return (
    <section id="projetos" className="px-6 py-32 bg-white/[0.01] relative bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">02 // deployment_records</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-24 tracking-tighter">Entregas de Alta Performance</h2>
        </motion.div>

        <div className="grid gap-16">
          {/* Featured Project */}
          <motion.div 
            {...fadeIn}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 bg-glass p-6 md:p-8 lg:p-20 tech-card tech-border"
          >
            <div className="bg-[#0b0c0e] border border-white/5 overflow-hidden shadow-2xl relative group">
              <div className="bg-[#1a1b1f] px-5 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[7px] font-mono text-white/20 tracking-widest uppercase">status: online_stable</div>
              </div>
              <div className="p-6 md:p-10 space-y-6 md:space-y-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-brand-teal/20 rounded-[2px] w-1/3" />
                  <div className="w-10 h-1 bg-white/10" />
                </div>
                <div className="space-y-4">
                  <div className="h-1.5 bg-white/5 rounded-full w-full" />
                  <div className="h-1.5 bg-white/5 rounded-full w-11/12" />
                  <div className="h-1.5 bg-white/5 rounded-full w-4/5" />
                </div>
                <div className="h-40 bg-white/[0.01] border border-dashed border-white/5 rounded-[4px] flex items-center justify-center">
                  <Globe className="text-brand-teal opacity-10 group-hover:opacity-30 transition-opacity" size={56} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 mb-10">
                {['Production', 'Legal_Tech', 'V8_Engine'].map(tag => (
                  <span key={tag} className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] border border-brand-teal/30 px-3 py-1.5 text-brand-teal bg-brand-teal/5">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-black mb-8 tracking-tighter leading-tight uppercase">Petry de Lima <br /><span className="text-brand-teal">Advocacia</span></h3>
              <p className="text-text-dim mb-12 leading-[1.8] text-lg font-medium">
                Site profissional criado para transmitir seriedade e autoridade. 
                Totalmente adaptado para celulares e otimizado para que o cliente 
                encontre os contatos rapidamente.
              </p>
              <a 
                href="https://petrydelimaadvocacia.com.br" 
                target="_blank"
                className="text-brand-teal font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 group"
              >
                // ver_site_no_ar() <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="border border-dashed border-white/5 p-20 text-center flex flex-col items-center justify-center bg-white/[0.01] group hover:bg-brand-teal/[0.02] transition-colors"
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

const Skills = () => {
  const SkillGroup = ({ title, code, items }: { title: string, code: string, items: string[] }) => (
    <div className="space-y-10 p-10 bg-glass tech-border relative group hover:bg-white/[0.02] transition-colors h-full">
      <div className="flex justify-between items-start">
        <h4 className="font-display font-black text-xs uppercase tracking-[0.4em] text-brand-teal">{title}</h4>
        <span className="text-[7px] font-mono text-white/20">{code}</span>
      </div>
      <ul className="space-y-5">
        {items.map(item => (
          <li key={item} className="flex items-center gap-4 text-text-dim text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="w-1.5 h-[1px] bg-brand-teal group-hover:w-4 transition-all" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" className="px-6 py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">03 // diferenciais_tecnicos</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-24 tracking-tighter">O que seu site terá</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <SkillGroup title="Visual" code="FRONT_END" items={['Design Moderno', 'Fácil de Usar', 'Elegante', 'Minimalista']} />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <SkillGroup title="Cérebros" code="BACK_END" items={['Rápido', 'Seguro', 'Sem Travamentos', 'Estável']} />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <SkillGroup title="Visibilidade" code="SEO_OPT" items={['Aparecer no Google', 'Carregamento Rápido', 'Mobile-First', 'Performance']} />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <SkillGroup title="Suporte" code="CARE_LINE" items={['Hospedagem', 'E-mail Profissional', 'Atualizações', 'Consultoria']} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: 'Conversa', desc: 'Entendo seus objetivos e o que seu negócio precisa.' },
    { title: 'Plano', desc: 'Mapeamos cada detalhe e funcionalidade do site.' },
    { title: 'Criação', desc: 'Desenvolvo tudo com o máximo de capricho e rigor.' },
    { title: 'Lançamento', desc: 'Seu site vai ao ar e eu te ensino a usar tudo.' }
  ];

  return (
    <section className="px-6 py-32 bg-grid relative">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">04 // passo_a_passo</span>
          <h2 className="font-display text-4xl md:text-7xl font-black mb-24 tracking-tighter">Como fazemos acontecer</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 bg-white/5 p-[1px] tech-border">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              {...fadeIn} 
              transition={{ delay: i * 0.1 }}
              className="bg-bg-dark p-12 group relative overflow-hidden"
            >
              <div className="counter-item mb-10 block" />
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

const CTA = () => {
  return (
    <section id="contato" className="px-6 py-32 bg-grid">
      <div className="max-w-[1100px] mx-auto">
        <motion.div 
          {...fadeIn}
          className="relative bg-glass border border-brand-teal/20 p-12 lg:p-32 overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />
          
          <span className="text-[9px] font-mono font-bold text-brand-teal uppercase tracking-[0.6em] mb-10 block">iniciando_conversa...</span>
          <h2 className="font-display text-5xl md:text-[5rem] font-black mb-12 tracking-tighter leading-none">
            Qual é o seu <br /><span className="text-brand-teal">próximo passo?</span>
          </h2>
          <p className="text-text-dim mb-16 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Se você busca um site que passe profissionalismo e traga clientes, 
            estou pronto para te ajudar. Vamos conversar hoje?
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://wa.me/5551995718366" 
              className="bg-brand-teal text-bg-dark btn-geometric text-xs tracking-[0.2em] px-16 py-6"
            >
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

const Footer = () => {
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
            {['LinkedIn', 'Github', 'WhatsApp'].map(social => (
              <a key={social} href="#" className="hover:text-brand-teal transition-colors flex items-center justify-center md:justify-start gap-3">
                <div className="w-1 h-1 bg-white/20" /> {social}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 w-full">
          <span className="text-brand-teal opacity-50 mb-2">// environmental_data</span>
          <span>© 2024 V1.0 Stable Build</span>
          <span>Porto Alegre, RS // Brazil</span>
        </div>
      </div>
    </footer>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "O site será meu para sempre?",
      a: "Sim. Ao finalizar o projeto, todo o código e propriedade do site são seus. Não cobro mensalidades pelo uso do site."
    },
    {
      q: "Meu site vai aparecer no Google?",
      a: "Com certeza. Utilizo técnicas de SEO (Otimização para Buscas) para que sua empresa seja encontrada mais facilmente por novos clientes."
    },
    {
      q: "O site funciona bem no celular?",
      a: "Sim, 100%. Hoje, a maioria dos acessos vem pelo celular, então seu site será planejado para ser rápido e bonito em qualquer tela."
    },
    {
      q: "Quanto tempo demora para ficar pronto?",
      a: "Depende da complexidade, mas um site profissional padrão costuma ser entregue em um prazo médio de 7 a 15 dias após o envio do conteúdo."
    }
  ];

  return (
    <section className="px-6 py-24 md:py-32 bg-bg-dark relative">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="text-brand-teal text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">05 // perguntas_frequentes</span>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-16 tracking-tighter">Tirando suas dúvidas</h2>
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
              <p className="text-text-dim text-sm leading-relaxed font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
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
    </div>
  );
}
