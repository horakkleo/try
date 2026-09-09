import React, { useState, useEffect, useRef } from "react";
 
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');`;
 
const PHONE = "774 301 940";
const PHONE_TEL = "+420774301940";
const EMAIL = "horakk.leo@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Zájem o 10minutovou ukázku R1 AI"
)}&body=${encodeURIComponent(
  "Dobrý den, měl bych zájem o 10minutovou ukázku R1 AI. Prosím o návrh termínu."
)}`;
 
const INK = "#14171A";
const INK_SOFT = "#5B5F5A";
const BORDER = "#E4E4DE";
const BG = "#F6F6F3";
const ACCENT = "#2454FF";
const ACCENT_DEEP = "#0F172A";
const DARK = "#12151A";
const DARK_BORDER = "#262B33";
const DARK_TEXT_SOFT = "#9AA0A8";
 
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
 
function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(14px)",
      }}
    >
      {children}
    </div>
  );
}
 
/* Section label: number + title. Numbering mirrors the page's real, fixed
   structure (a defined sequence of 8 sections), so it functions as a table
   of contents a visitor can scan, not decoration. */
function SectionLabel({ n, children, dark = false }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="text-[12px] tabular-nums"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: dark ? "#5C8DFF" : ACCENT,
        }}
      >
        {n}
      </span>
      <span
        className="w-8 h-px"
        style={{ background: dark ? DARK_BORDER : BORDER }}
      />
      <span
        className="text-[12px] tracking-[0.14em] uppercase"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: dark ? DARK_TEXT_SOFT : INK_SOFT,
        }}
      >
        {children}
      </span>
    </div>
  );
}
 
function PrimaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] text-[15px] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-90 ${className}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        background: ACCENT,
        color: "#FFFFFF",
      }}
    >
      {children}
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3 7.5H12M12 7.5L8 3.5M12 7.5L8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
 
function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] text-[15px] font-medium tracking-[0.01em] border transition-colors duration-200 hover:bg-[#EFEFEA]"
      style={{ fontFamily: "'Inter', sans-serif", borderColor: BORDER, color: INK }}
    >
      {children}
    </a>
  );
}
 
/* ---------------- Signature hero visual: live call console ---------------- */
function CallConsole() {
  const bars = [6, 14, 9, 18, 11, 16, 7, 13, 10, 17, 8, 15];
  const lines = [
    { who: "Zákazník", text: "Dobrý den, potřeboval bych vyměnit přední brzdy." },
    { who: "R1 AI", text: "Jasně, zjistím pár údajů. Jaká je značka a model vozu?" },
    { who: "Zákazník", text: "Škoda Octavia, ročník 2018." },
    { who: "R1 AI", text: "Díky. Kdy by se vám hodilo přivézt auto?" },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-[420px] mx-auto lg:mx-0"
      style={{ background: DARK, border: `1px solid ${DARK_BORDER}`, boxShadow: "0 24px 60px -24px rgba(15,23,42,0.35)" }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${DARK_BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#3EDC81", boxShadow: "0 0 0 3px rgba(62,220,129,0.18)" }} />
          <span className="text-[13px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: DARK_TEXT_SOFT }}>
            Ukázka hovoru · Ukázkový autoservis
          </span>
        </div>
        <span className="text-[12px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#565B57" }}>00:14</span>
      </div>
 
      <div className="flex items-end gap-[3px] px-5 pt-5 pb-4 h-12">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={{ background: ACCENT, height: `${h}px`, animation: `r1wave 1.1s ease-in-out ${i * 0.07}s infinite`, opacity: 0.85 }}
          />
        ))}
      </div>
 
      <div className="px-5 pb-5 flex flex-col gap-3">
        {lines.map((l, i) => (
          <div key={i} className="flex flex-col gap-1" style={{ animation: `r1fadeIn 0.6s ease forwards`, animationDelay: `${0.4 + i * 0.35}s`, opacity: 0 }}>
            <span className="text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: l.who === "R1 AI" ? "#5C8DFF" : "#6B716B" }}>
              {l.who}
            </span>
            <p className="text-[13.5px] leading-snug" style={{ fontFamily: "'Inter', sans-serif", color: l.who === "R1 AI" ? "#E8ECFF" : "#C6CAD1" }}>
              {l.text}
            </p>
          </div>
        ))}
      </div>
 
      <div
        className="mx-5 mb-5 rounded-xl px-4 py-3.5"
        style={{ background: "#1B2027", border: "1px solid #2A3038", animation: "r1slideUp 0.6s cubic-bezier(.16,1,.3,1) forwards", animationDelay: "2s", opacity: 0 }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#3EDC81" />
            <path d="M4 7.2L6.1 9.2L10 4.8" stroke="#0B2016" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: DARK_TEXT_SOFT }}>
            poptávka vytvořena
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 text-[12.5px]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span style={{ color: "#6B716B" }}>Vozidlo</span>
          <span style={{ color: "#EDEFF1" }}>Škoda Octavia, 2018</span>
          <span style={{ color: "#6B716B" }}>Problém</span>
          <span style={{ color: "#EDEFF1" }}>Výměna předních brzd</span>
          <span style={{ color: "#6B716B" }}>Kontakt</span>
          <span style={{ color: "#EDEFF1" }}>+420 6xx xxx xxx</span>
        </div>
      </div>
    </div>
  );
}
 
/* ---------------- Loss calculator ---------------- */
function LossCalculator() {
  const [missed, setMissed] = useState(3);
  const [conv, setConv] = useState(30);
  const [value, setValue] = useState(2500);
  const [days, setDays] = useState(5);
 
  const fmt = (n) => Math.round(n).toLocaleString("cs-CZ");
  const monthly = missed * (conv / 100) * value * days * (52 / 12);
 
  const fields = [
    { key: "missed", label: "Kolik hovorů denně přibližně nezvednete?", value: missed, set: setMissed, min: 0, max: 20, step: 1, suffix: " /den" },
    { key: "conv", label: "Kolik z nich by se stalo zakázkou (%)?", value: conv, set: setConv, min: 10, max: 80, step: 5, suffix: " %" },
    { key: "value", label: "Průměrná hodnota zakázky", value: value, set: setValue, min: 500, max: 15000, step: 100, suffix: " Kč", format: true },
    { key: "days", label: "Kolik dní v týdnu je servis otevřený?", value: days, set: setDays, min: 3, max: 7, step: 1, suffix: " dní" },
  ];
 
  return (
    <div className="rounded-2xl p-8 lg:p-11" style={{ background: DARK, border: `1px solid ${DARK_BORDER}`, boxShadow: "0 24px 60px -24px rgba(15,23,42,0.4)" }}>
      <div className="text-[12px] tracking-[0.14em] uppercase mb-5 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5C8DFF" }}>
        Kalkulačka ztráty
      </div>
      <h2 className="text-[26px] lg:text-[30px] leading-[1.2] font-semibold tracking-tight mb-8 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
        Kolik korun vám měsíčně proteče mezi prsty s nezvednutými hovory?
      </h2>
 
      <div className="rounded-xl px-5 py-5 mb-8 relative overflow-hidden" style={{ background: "#0B0F1A", border: `1px solid ${DARK_BORDER}` }}>
        <span
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `repeating-linear-gradient(-45deg, ${ACCENT} 0px, ${ACCENT} 10px, transparent 10px, transparent 20px)`, opacity: 0.85 }}
        />
        <div className="text-[12.5px] mb-1.5" style={{ color: DARK_TEXT_SOFT, fontFamily: "'Inter', sans-serif" }}>
          Odhadovaná měsíční ztráta
        </div>
        <div className="flex items-baseline">
          <span className="text-[38px] lg:text-[42px] font-semibold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4ADE80" }}>
            {fmt(monthly)}
          </span>
          <span className="text-[15px] ml-2" style={{ color: DARK_TEXT_SOFT, fontFamily: "'Inter', sans-serif" }}>Kč</span>
        </div>
        <div className="text-[11.5px] mt-2.5" style={{ color: "#565B57", fontFamily: "'IBM Plex Mono', monospace" }}>
          {missed} hovorů/den × {days} dní/týden × {conv} % konverze × {fmt(value)} Kč
        </div>
      </div>
 
      {fields.map((f) => (
        <div className="mb-7 last:mb-0" key={f.key}>
          <div className="flex items-center justify-between mb-2.5 gap-4">
            <label className="text-[13.5px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: "#E8ECFF" }}>
              {f.label}
            </label>
            <span className="text-[13.5px] font-medium tabular-nums flex-none" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5C8DFF" }}>
              {f.format ? fmt(f.value) : f.value}{f.suffix}
            </span>
          </div>
          <input
            type="range"
            className="r1-range r1-range-dark"
            min={f.min}
            max={f.max}
            step={f.step}
            value={f.value}
            onChange={(e) => f.set(Number(e.target.value))}
          />
        </div>
      ))}
 
      <p
        className="text-[11px] mt-8 pt-6 leading-relaxed"
        style={{ borderTop: `1px solid ${DARK_BORDER}`, color: "#565B57", fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Výpočet: nezvednuté hovory × dny v týdnu × 52/12 × míra konverze × hodnota zakázky. Vlastní čísla, žádné odhady zvenčí.
      </p>
 
      <div className="rounded-xl mt-8 p-5" style={{ background: "#171B22", border: `1px solid ${DARK_BORDER}` }}>
        <strong className="block text-[14.5px] mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#5C8DFF" }}>
          Tohle není odhad z prstu.
        </strong>
        <p className="text-[13.5px] leading-relaxed" style={{ color: DARK_TEXT_SOFT, fontFamily: "'Inter', sans-serif" }}>
          Je to počet se svými vlastními čísly. AI recepční R1 AI zvedne tyhle hovory za vás, i když jste u auta — první měsíc na zkoušku.
        </p>
      </div>
    </div>
  );
}
 
/* ---------------- FAQ ---------------- */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={onClick} className="w-full flex items-center justify-between gap-6 py-5 text-left">
        <span className="text-[16px] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: INK }}>
          {q}
        </span>
        <span
          className="flex-none w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ border: `1px solid ${BORDER}`, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="#565B57" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "220px" : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.16,1,.3,1)" }}>
        <p className="pb-5 text-[14.5px] leading-relaxed max-w-[580px]" style={{ fontFamily: "'Inter', sans-serif", color: INK_SOFT }}>
          {a}
        </p>
      </div>
    </div>
  );
}
 
/* ---------------- Main ---------------- */
export default function R1Landing() {
  const [faqOpen, setFaqOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const steps = [
    { n: "01", t: "Zákazník zavolá", d: "Telefonát přijde v době, kdy mechanik nemůže zvednout telefon — je pod autem nebo řeší jiného zákazníka." },
    { n: "02", t: "R1 AI přijme hovor", d: "AI recepční hovor okamžitě zvedne a přirozeně komunikuje se zákazníkem, i mimo pracovní dobu." },
    { n: "03", t: "Zjistí potřebné informace", d: "Jméno, telefon, vozidlo, popis problému a případně požadovaný termín." },
    { n: "04", t: "Předá vám připravenou poptávku", d: "Strukturovaná poptávka je hotová a čeká na vás — nic neřešíte za chodu, u auta." },
  ];
 
  const benefits = [
    { t: "Méně zmeškaných hovorů", d: "Telefonát nezůstane bez odpovědi jen proto, že zrovna nikdo nemůže k telefonu." },
    { t: "Méně vyrušování mechaniků", d: "Mechanik nemusí odbíhat od rozdělané práce, aby zvedl telefon." },
    { t: "Přehlednější poptávky", d: "Místo útržkovitého vzkazu dostanete strukturovaný přehled toho, co zákazník potřeboval." },
    { t: "Dostupnost i mimo běžnou pracovní dobu", d: "Zákazník se dovolá i večer nebo o víkendu, kdy je servis běžně zavřený." },
  ];
 
  const faqs = [
    { q: "Co R1 AI umí?", a: "R1 AI dokáže vést první komunikaci se zákazníkem, zjistit předem definované informace a předat je autoservisu." },
    { q: "Může R1 AI přijímat hovory?", a: "Ano, právě telefonická AI recepční je hlavní směr produktu. Konkrétní nastavení se přizpůsobuje potřebám autoservisu." },
    { q: "Co když zákazník požaduje něco, co AI neumí vyřešit?", a: "Systém je navržen tak, aby pracoval podle předem nastavených scénářů. Složitější požadavky mohou být předány člověku." },
    { q: "Jak se informace dostanou k autoservisu?", a: "Poptávku, kterou AI od zákazníka zjistí, vám předáme v přehledné podobě. Konkrétní způsob (e-mail, SMS či jinak) nastavíme podle toho, co vám vyhovuje." },
    { q: "Jak probíhá spuštění?", a: "Po ukázce si společně projdeme provoz vašeho servisu — otevírací dobu, nabízené služby a časté dotazy — a podle toho AI nastavíme." },
    { q: "Kolik R1 AI stojí?", a: "Cena se bude odvíjet od rozsahu využití a konkrétního nastavení. Podrobnosti vám představíme během ukázky." },
  ];
 
  const navLinks = [
    { href: "#problem", label: "Problém" },
    { href: "#jak-to-funguje", label: "Jak to funguje" },
    { href: "#pro-koho", label: "Pro koho" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: "Kontakt" },
  ];
 
  return (
    <div style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }} className="min-h-screen w-full antialiased">
      <style>{`
        ${FONT_IMPORT}
        @keyframes r1wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @keyframes r1fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes r1slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .r1-range { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 999px; background: ${BORDER}; outline: none; }
        .r1-range::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${ACCENT}; cursor: pointer; border: 3px solid #FFFFFF; box-shadow: 0 0 0 1px ${ACCENT}; }
        .r1-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: ${ACCENT}; cursor: pointer; border: 3px solid #FFFFFF; }
        .r1-range-dark { background: ${DARK_BORDER}; }
        .r1-range-dark::-webkit-slider-thumb { border: 3px solid ${DARK}; }
        .r1-range-dark::-moz-range-thumb { border: 3px solid ${DARK}; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        html { scroll-behavior: smooth; }
      `}</style>
 
      {/* NAV */}
      <header
        className="sticky top-0 z-40 transition-shadow duration-200"
        style={{
          background: scrolled ? "rgba(246,246,243,0.92)" : "rgba(246,246,243,0.7)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-none" style={{ background: ACCENT }}>
              <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1</span>
            </span>
            <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1 AI</span>
          </a>
 
          <nav className="hidden md:flex items-center gap-9 text-[13.5px]" style={{ color: INK_SOFT }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#14171A] transition-colors">{l.label}</a>
            ))}
          </nav>
 
          <div className="hidden md:block">
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[9px] text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Domluvit ukázku
            </a>
          </div>
 
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6H19M3 11H19M3 16H19" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-[15px]" style={{ borderTop: `1px solid ${BORDER}`, color: "#3A3D39", background: BG }}>
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={i === 0 ? "pt-5" : ""}>{l.label}</a>
            ))}
            <a href={MAILTO} className="inline-flex items-center justify-center px-5 py-3 rounded-[9px] text-white font-medium text-[15px] mt-1" style={{ background: ACCENT }}>
              Domluvit ukázku
            </a>
          </div>
        )}
      </header>
 
      {/* HERO */}
      <section id="top" className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 items-center">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase mb-7 px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT, background: "#E8EEFF" }}
            >
              AI recepční pro autoservisy
            </div>
            <h1
              className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight font-semibold mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Nezmeškejte zákazníka jen proto, že právě nemůžete zvednout telefon.
            </h1>
            <p className="text-[17px] lg:text-[18.5px] leading-relaxed mb-10 max-w-[460px]" style={{ color: INK_SOFT }}>
              R1 AI je digitální recepční pro autoservisy, která přijme hovor, zjistí potřebné informace od zákazníka a předá vám připravenou poptávku.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
              <SecondaryButton href="#jak-to-funguje">Jak to funguje</SecondaryButton>
            </div>
          </Reveal>
 
          <Reveal delay={150}>
            <CallConsole />
          </Reveal>
        </div>
      </section>
 
      {/* KALKULAČKA (hned pod hero) */}
      <section id="kalkulacka" className="pb-20 lg:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-[600px] mx-auto">
              <LossCalculator />
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* PROBLEM */}
      <section id="problem" className="py-20 lg:py-28" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <SectionLabel n="01">Problém</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Telefon zvoní. Mechanik pracuje. Zákazník čeká.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-[1.75] max-w-[520px]" style={{ color: INK_SOFT }}>
              V malém i středním autoservisu má telefon málokdy prioritu — mechanik má ruce pod kapotou, ne u sluchátka. Zákazník, kterému to nikdo nezvedne, často nezavolá znovu — zavolá jinam. A opakované telefonáty mezitím přerušují práci na zakázkách, které už servis má.
            </p>
          </Reveal>
        </div>
      </section>
 
      {/* SOLUTION */}
      <section id="reseni" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <SectionLabel n="02">Řešení</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              R1 AI převezme první kontakt za vás.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-[1.75] max-w-[520px]" style={{ color: INK_SOFT }}>
              R1 AI dokáže přijmout příchozí hovor a vést se zákazníkem první komunikaci — zjistí, co potřebuje, a předá vám to jako přehlednou poptávku. Cílem je, abyste o poptávku nepřišli jen kvůli nezvednutému telefonu a mohli si sami rozhodnout, kdy a jak zareagujete.
            </p>
          </Reveal>
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section id="jak-to-funguje" className="py-20 lg:py-28" style={{ background: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="03" dark>Jak to funguje</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-16 max-w-[600px]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
              Čtyři kroky od zvonícího telefonu k hotové poptávce.
            </h2>
          </Reveal>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: DARK_BORDER }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="p-7 lg:p-8 h-full" style={{ background: DARK }}>
                  <span className="text-[13px] block mb-9" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5C8DFF" }}>{s.n}</span>
                  <h3 className="text-[17px] font-medium mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>{s.t}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: DARK_TEXT_SOFT }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
 
      {/* BENEFITS */}
      <section id="prinosy" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <SectionLabel n="04">Přínosy</SectionLabel>
            <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-tight mb-16 max-w-[560px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Co to reálně přinese vašemu servisu.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 70}>
                <div className="p-7 rounded-[14px] h-full" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                  <h3 className="text-[17px] font-medium mb-2.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.t}</h3>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: INK_SOFT }}>{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
 
      {/* DEMO CTA */}
      <section id="ukazka" className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div
              className="rounded-[20px] px-8 py-14 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-9"
              style={{ background: ACCENT_DEEP }}
            >
              <div className="max-w-[520px]">
                <div className="text-[11px] tracking-[0.14em] uppercase mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#7C97FF" }}>
                  05 — Ukázka
                </div>
                <h2 className="text-[26px] lg:text-[30px] leading-[1.2] font-semibold tracking-tight text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Poslechněte si, jak může R1 AI fungovat ve vašem servisu.
                </h2>
                <p className="text-[15.5px] leading-relaxed" style={{ color: "#B9C4E8" }}>
                  Během přibližně 10 minut vám ukážeme, jak může AI recepční přijmout hovor a zpracovat zákaznickou poptávku.
                </p>
              </div>
              <a
                href={MAILTO}
                className="flex-none inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[10px] text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ background: "#FFFFFF", color: ACCENT_DEEP, fontFamily: "'Inter', sans-serif" }}
              >
                Domluvit 10minutovou ukázku
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5H12M12 7.5L8 3.5M12 7.5L8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* PRO KOHO */}
      <section id="pro-koho" className="py-20 lg:py-28" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionLabel n="06">Pro koho je R1 AI</SectionLabel>
            <h2 className="text-[26px] lg:text-[30px] leading-[1.25] font-semibold tracking-tight max-w-[400px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Pro autoservisy, kde telefon zvoní víc, než stíháte zvedat.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-col gap-5">
              {[
                "Mechanici jsou často pod autem a nemohou telefon zvednout.",
                "Víc hovorů přichází ve stejnou chvíli.",
                "Zákazníci volají kvůli objednávkám a poptávkám na opravy.",
                "Rychlá reakce rozhoduje o tom, jestli zakázka zůstane u vás, nebo jde ke konkurenci.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="flex-none w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ background: "#E8EEFF" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2L4 7.2L8 3" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[15.5px] leading-relaxed" style={{ color: "#3A3D39" }}>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
 
      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <SectionLabel n="07">Časté otázky</SectionLabel>
            <h2 className="text-[26px] lg:text-[30px] leading-[1.25] font-semibold tracking-tight max-w-[320px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Co byste o R1 AI mohli chtít vědět.
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-7 lg:col-start-6">
            <div>
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
 
      {/* FINAL CTA */}
      <section className="py-20 lg:py-28" style={{ background: DARK }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.12] font-semibold tracking-tight max-w-[680px] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F5F2" }}>
              Nechte si ukázat, jak může R1 AI fungovat ve vašem autoservisu.
            </h2>
            <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
          </Reveal>
        </div>
      </section>
 
      {/* CONTACT / FOOTER */}
      <footer id="kontakt" className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="mb-4">
            <span className="text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>
              08 — Kontakt
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: ACCENT }}>
                  <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1</span>
                </span>
                <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R1 AI</span>
              </div>
              <p className="text-[14.5px]" style={{ color: INK_SOFT }}>Leoš Horák</p>
            </div>
 
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
              <div>
                <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>Telefon</span>
                <a href={`tel:${PHONE_TEL}`} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{PHONE}</a>
              </div>
              <div>
                <span className="block text-[11px] tracking-[0.14em] uppercase mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8E86" }}>E-mail</span>
                <a href={MAILTO} className="text-[15.5px] font-medium hover:text-[#2454FF] transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
          <p className="pt-8 text-[13px]" style={{ color: "#8A8E86" }}>© {new Date().getFullYear()} R1 AI. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}

