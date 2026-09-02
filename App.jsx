import React, { useState, useEffect, useRef } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');`;

const PHONE = "774 301 940";
const PHONE_TEL = "+420774301940";
const EMAIL = "horakk.leo@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Zájem o 10minutovou ukázku R1 AI"
)}&body=${encodeURIComponent(
  "Dobrý den, měl bych zájem o 10minutovou ukázku R1 AI. Prosím o návrh termínu."
)}`;

/* ---------------- Design tokens ----------------
   Palette grounded in the workshop: paper and grease-pencil ink for the
   light shell, a uniform-blue accent for the product, and a stamp green
   reserved for "confirmed" states — the same color a mechanic's ticket
   stamp would use. Dark sections use a warm charcoal, not blue-black.
------------------------------------------------- */
const PAPER = "#F6F3EC";
const PAPER_RAISED = "#FFFFFF";
const INK = "#211E16";
const INK_SOFT = "#6E6858";
const BORDER = "#E4DFD1";
const ACCENT = "#1F4ED8";
const ACCENT_SOFT = "#E7ECFB";
const STAMP = "#2F7D53";
const STAMP_SOFT = "#E5F1EA";
const DARK = "#1C1812";
const DARK_BORDER = "#37312533";
const DARK_BORDER_SOLID = "#3A3427";
const DARK_TEXT_SOFT = "#B6AE9B";

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
        transform: visible ? "translateY(0px)" : "translateY(12px)",
      }}
    >
      {children}
    </div>
  );
}

function Heading({ children, className = "", dark = false, as = "h2" }) {
  const Tag = as;
  return (
    <Tag
      className={`font-medium tracking-tight ${className}`}
      style={{ fontFamily: "'Fraunces', serif", color: dark ? "#F4F1E8" : INK }}
    >
      {children}
    </Tag>
  );
}

function PrimaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 rounded-[6px] text-[15px] font-medium transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-0 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif", background: ACCENT, color: "#FFFFFF" }}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center px-6 py-3.5 rounded-[6px] text-[15px] font-medium border transition-colors duration-150 hover:bg-[#EFEAD9]"
      style={{ fontFamily: "'Inter', sans-serif", borderColor: "#CFC7AF", color: INK }}
    >
      {children}
    </a>
  );
}

/* ---------------- Hero visual: a live "job card" ----------------
   Instead of a dark IDE-style console, the hero mockup takes the form of
   the one artifact every auto shop already runs on — a service ticket.
   Fields print onto it in real time as the (simulated) call runs, the
   same way a written work order fills in while a mechanic is on the phone.
------------------------------------------------- */
const CALL_SCRIPT = [
  { who: "ai", text: "Dobrý den, autoservis Horák, zjišťuji, s čím vám mohu pomoct." },
  { who: "customer", text: "Dobrý den, potřeboval bych vyměnit přední brzdy." },
  { who: "ai", text: "Jasně, zjistím pár údajů. Jaká je značka a model vozu?" },
  { who: "customer", text: "Škoda Octavia, ročník 2018." },
  { who: "ai", text: "Díky. Kdy by se vám hodilo přivézt auto?" },
  { who: "customer", text: "Nejlíp tenhle čtvrtek dopoledne." },
  { who: "ai", text: "Domluveno, mechanik vám potvrdí termín. Hezký den!" },
];

const CALL_FIELDS = [
  { k: "Vozidlo", v: "Škoda Octavia, 2018" },
  { k: "Zakázka", v: "Výměna předních brzd" },
  { k: "Kontakt", v: "+420 6xx xxx xxx" },
  { k: "Termín", v: "Čtvrtek dopoledne" },
];

function JobCard() {
  const [status, setStatus] = useState("idle"); // idle | ringing | live | done
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const runningRef = useRef(false);
  const transcriptRef = useRef(null);

  useEffect(() => {
    const auto = setTimeout(() => runCall(), 500);
    return () => {
      clearTimeout(auto);
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [shown, typing]);

  function playFrom(i) {
    if (i >= CALL_SCRIPT.length) {
      setTimeout(() => {
        clearInterval(timerRef.current);
        setStatus("done");
        runningRef.current = false;
      }, 500);
      return;
    }
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setShown(i + 1);
      setTimeout(() => playFrom(i + 1), 480);
    }, CALL_SCRIPT[i].who === "ai" ? 650 : 500);
  }

  function runCall() {
    if (runningRef.current) return;
    runningRef.current = true;
    clearInterval(timerRef.current);
    setStatus("ringing");
    setShown(0);
    setTyping(false);
    setSeconds(0);
    setTimeout(() => {
      setStatus("live");
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      playFrom(0);
    }, 900);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-[430px] mx-auto lg:mx-0">
      <div
        className="rounded-[3px] overflow-hidden"
        style={{ background: "#221D14", boxShadow: "0 30px 70px -30px rgba(28,22,10,0.45)" }}
      >
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${DARK_BORDER_SOLID}` }}>
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-none"
              style={{
                background: status === "live" ? "#4ADE80" : "#6B6250",
                boxShadow: status === "live" ? "0 0 0 3px rgba(74,222,128,0.16)" : "none",
              }}
            />
            <span className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: DARK_TEXT_SOFT }}>
              {status === "idle" && "Připraveno — Autoservis Horák"}
              {status === "ringing" && "Vyzvánění…"}
              {status === "live" && "Příchozí hovor — Autoservis Horák"}
              {status === "done" && "Hovor ukončen"}
            </span>
          </div>
          <span className="text-[12px] tabular-nums" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6250" }}>{mm}:{ss}</span>
        </div>

        <div ref={transcriptRef} className="px-5 pt-5 pb-4 flex flex-col gap-3.5 min-h-[168px] max-h-[220px] overflow-y-auto">
          {CALL_SCRIPT.slice(0, shown).map((l, i) => (
            <div key={i} className="flex flex-col gap-1" style={{ animation: "r1fade 0.4s ease forwards" }}>
              <span className="text-[10.5px]" style={{ fontFamily: "'Inter', sans-serif", color: l.who === "ai" ? "#7C97FF" : "#89806B" }}>
                {l.who === "ai" ? "R1 AI" : "Zákazník"}
              </span>
              <p className="text-[13.5px] leading-snug" style={{ fontFamily: "'Inter', sans-serif", color: l.who === "ai" ? "#EFE9DA" : "#C4BCA6" }}>
                {l.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex gap-1 pt-1" style={{ animation: "r1fade 0.3s ease forwards" }}>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: "#7C7462", animation: `r1bounce 1s ${d * 0.15}s infinite` }}
                />
              ))}
            </div>
          )}
          {status === "idle" && shown === 0 && (
            <p className="text-[13px] italic" style={{ fontFamily: "'Inter', sans-serif", color: "#6B6250" }}>
              Hovor se za chvíli spustí sám — nebo klikněte na tlačítko níže.
            </p>
          )}
        </div>
      </div>

      {/* ticket stub — printed job card, tears off the call above */}
      <div
        className="relative rounded-b-[3px] px-5 pt-5 pb-5"
        style={{ background: PAPER_RAISED, border: `1px solid ${BORDER}`, borderTop: "none" }}
      >
        <svg className="absolute -top-[7px] left-0 w-full" height="14" viewBox="0 0 430 14" preserveAspectRatio="none">
          {Array.from({ length: 29 }).map((_, i) => (
            <circle key={i} cx={7.5 + i * 15} cy="7" r="4.5" fill={PAPER} />
          ))}
        </svg>

        <div
          style={{
            maxHeight: status === "done" ? "160px" : "0px",
            opacity: status === "done" ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s ease",
          }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-none" style={{ background: STAMP }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M2 5.2L4 7.2L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[12.5px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: STAMP }}>Poptávka vytvořena</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[13px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {CALL_FIELDS.map((f) => (
              <React.Fragment key={f.k}>
                <span style={{ color: INK_SOFT }}>{f.k}</span>
                <span className="font-medium text-right" style={{ color: INK }}>{f.v}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <button
          onClick={runCall}
          disabled={status === "ringing" || status === "live"}
          className="w-full flex items-center justify-center gap-2 py-3 text-[13.5px] font-medium rounded-[5px] transition-colors disabled:opacity-40"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: ACCENT,
            background: ACCENT_SOFT,
            marginTop: status === "done" ? "14px" : "0px",
          }}
        >
          {status === "idle" && "Spustit ukázkový hovor"}
          {status === "ringing" && "Vyzvánění…"}
          {status === "live" && "Hovor probíhá…"}
          {status === "done" && "Přehrát znovu"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button onClick={onClick} className="w-full flex items-center justify-between gap-6 py-5 text-left">
        <span className="text-[16.5px] font-medium" style={{ fontFamily: "'Fraunces', serif", color: INK }}>
          {q}
        </span>
        <span
          className="flex-none w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ border: `1px solid #CFC7AF`, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="#6E6858" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "220px" : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.16,1,.3,1)" }}>
        <p className="pb-5 text-[14.5px] leading-relaxed max-w-[560px]" style={{ fontFamily: "'Inter', sans-serif", color: INK_SOFT }}>
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const steps = [
    { n: "1", t: "Zákazník zavolá", d: "Telefonát přijde v době, kdy mechanik nemůže zvednout telefon — je pod autem nebo řeší jiného zákazníka." },
    { n: "2", t: "R1 AI přijme hovor", d: "AI recepční hovor okamžitě zvedne a přirozeně komunikuje se zákazníkem, i mimo pracovní dobu." },
    { n: "3", t: "Zjistí potřebné informace", d: "Jméno, telefon, vozidlo, popis problému a případně požadovaný termín." },
    { n: "4", t: "Předá vám hotovou poptávku", d: "Strukturovaná poptávka je hotová a čeká na vás — nic neřešíte za chodu, u auta." },
  ];

  const benefits = [
    { t: "Méně zmeškaných hovorů", d: "Telefonát nezůstane bez odpovědi jen proto, že zrovna nikdo nemůže k telefonu." },
    { t: "Méně vyrušování mechaniků", d: "Mechanik nemusí odbíhat od rozdělané práce, aby zvedl telefon." },
    { t: "Přehlednější poptávky", d: "Místo útržkovitého vzkazu dostanete strukturovaný přehled toho, co zákazník potřeboval." },
    { t: "Dostupnost i mimo pracovní dobu", d: "Zákazník se dovolá i večer nebo o víkendu, kdy je servis běžně zavřený." },
  ];

  const faqs = [
    { q: "Co R1 AI umí?", a: "R1 AI dokáže vést první komunikaci se zákazníkem, zjistit předem definované informace a předat je autoservisu." },
    { q: "Může R1 AI přijímat hovory?", a: "Ano, právě telefonická AI recepční je hlavní směr produktu. Konkrétní nastavení se přizpůsobuje potřebám autoservisu." },
    { q: "Co když zákazník požaduje něco, co AI neumí vyřešit?", a: "Systém je navržen tak, aby pracoval podle předem nastavených scénářů. Složitější požadavky mohou být předány člověku." },
    { q: "Jak se informace dostanou k autoservisu?", a: "Poptávku, kterou AI od zákazníka zjistí, vám předáme v přehledné podobě. Konkrétní způsob (e-mail, SMS či jinak) nastavíme podle toho, co vám vyhovuje." },
    { q: "Jak probíhá spuštění?", a: "Po ukázce si společně projdeme provoz vašeho servisu — otevírací dobu, nabízené služby a časté dotazy — a podle toho AI nastavíme." },
    { q: "Kolik R1 AI stojí?", a: "Cena se odvíjí od rozsahu využití a konkrétního nastavení. Podrobnosti vám představíme během ukázky." },
  ];

  const navLinks = [
    { href: "#problem", label: "Problém" },
    { href: "#jak-to-funguje", label: "Jak to funguje" },
    { href: "#pro-koho", label: "Pro koho" },
    { href: "#faq", label: "Časté otázky" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <div style={{ background: PAPER, color: INK, fontFamily: "'Inter', sans-serif" }} className="min-h-screen w-full antialiased">
      <style>{`
        ${FONT_IMPORT}
        @keyframes r1fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes r1slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes r1bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-3px); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-40 transition-shadow duration-200"
        style={{
          background: scrolled || menuOpen ? "rgba(246,243,236,0.94)" : "rgba(246,243,236,0.75)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${scrolled || menuOpen ? BORDER : "transparent"}`,
        }}
      >
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <span className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-none" style={{ background: ACCENT }}>
              <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>R1</span>
            </span>
            <span className="text-[16px] font-medium tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>R1 AI</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[14px]" style={{ color: INK_SOFT }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#211E16] transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={MAILTO}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[6px] text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT, fontFamily: "'Inter', sans-serif" }}
            >
              Domluvit ukázku
            </a>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center flex-none relative z-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{ background: INK, transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)" }}
            />
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{ background: INK, opacity: menuOpen ? 0 : 1, transform: menuOpen ? "translateY(0)" : "translateY(4px)" }}
            />
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{ background: INK, transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)" }}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className="md:hidden fixed inset-0 z-30 flex flex-col"
        style={{
          background: PAPER,
          transition: "opacity 0.25s ease, visibility 0.25s ease",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          paddingTop: "68px",
        }}
      >
        <nav className="flex flex-col px-6 pt-6 gap-1">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-4 text-[24px]"
              style={{
                fontFamily: "'Fraunces', serif",
                color: INK,
                borderBottom: `1px solid ${BORDER}`,
                transition: `opacity 0.35s ease ${i * 40 + 60}ms, transform 0.35s ease ${i * 40 + 60}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(12px)",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="px-6 mt-auto mb-10 flex flex-col gap-4">
          <a href={MAILTO} onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center px-5 py-4 rounded-[6px] text-white font-medium text-[16px]" style={{ background: ACCENT, fontFamily: "'Inter', sans-serif" }}>
            Domluvit 10minutovou ukázku
          </a>
          <a href={`tel:${PHONE_TEL}`} className="text-[15px] text-center" style={{ color: INK_SOFT }}>{PHONE}</a>
        </div>
      </div>

      {/* HERO */}
      <section id="top" className="max-w-[1180px] mx-auto px-6 lg:px-12 pt-14 sm:pt-20 lg:pt-28 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-12 items-center">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 text-[13px] mb-6 px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'Inter', sans-serif", color: ACCENT, background: ACCENT_SOFT }}
            >
              AI recepční pro autoservisy
            </div>
            <Heading as="h1" className="text-[32px] sm:text-[42px] lg:text-[50px] leading-[1.12] mb-6">
              Nezmeškejte zákazníka jen proto, že právě nemůžete zvednout telefon.
            </Heading>
            <p className="text-[16.5px] lg:text-[18px] leading-relaxed mb-9 max-w-[460px]" style={{ color: INK_SOFT }}>
              R1 AI je digitální recepční pro autoservisy, která přijme hovor, zjistí potřebné informace od zákazníka a předá vám připravenou poptávku.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
              <SecondaryButton href="#jak-to-funguje">Jak to funguje</SecondaryButton>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <JobCard />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-16 lg:py-24" style={{ background: PAPER_RAISED, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <Heading className="text-[26px] lg:text-[32px] leading-[1.18]">
              Telefon zvoní. Mechanik pracuje. Zákazník čeká.
            </Heading>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-[1.75] max-w-[520px]" style={{ color: INK_SOFT }}>
              V malém i středním autoservisu má telefon málokdy prioritu — mechanik má ruce pod kapotou, ne u sluchátka. Zákazník, kterému to nikdo nezvedne, často nezavolá znovu — zavolá jinam. A opakované telefonáty mezitím přerušují práci na zakázkách, které už servis má.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="reseni" className="py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <Reveal className="lg:col-span-5">
            <Heading className="text-[26px] lg:text-[32px] leading-[1.18]">
              R1 AI převezme první kontakt za vás.
            </Heading>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-[1.75] max-w-[520px]" style={{ color: INK_SOFT }}>
              R1 AI dokáže přijmout příchozí hovor a vést se zákazníkem první komunikaci — zjistí, co potřebuje, a předá vám to jako přehlednou poptávku. Cílem je, abyste o poptávku nepřišli jen kvůli nezvednutému telefonu a mohli si sami rozhodnout, kdy a jak zareagujete.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS — the one place numbering is earned: it's a real sequence */}
      <section id="jak-to-funguje" className="py-16 lg:py-24" style={{ background: DARK }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <Reveal>
            <Heading dark className="text-[26px] lg:text-[32px] leading-[1.18] mb-14 max-w-[600px]">
              Čtyři kroky od zvonícího telefonu k hotové poptávce.
            </Heading>
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-[19px] h-px" style={{ background: DARK_BORDER_SOLID }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <div className="relative pl-0 lg:pt-11">
                    <span
                      className="hidden lg:flex absolute top-0 left-0 w-10 h-10 rounded-full items-center justify-center text-[14px]"
                      style={{ background: DARK, border: `1px solid ${DARK_BORDER_SOLID}`, color: "#8FA8FF", fontFamily: "'Fraunces', serif" }}
                    >
                      {s.n}
                    </span>
                    <div className="lg:hidden flex items-center gap-2.5 mb-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[12px]" style={{ background: DARK, border: `1px solid ${DARK_BORDER_SOLID}`, color: "#8FA8FF", fontFamily: "'Fraunces', serif" }}>{s.n}</span>
                    </div>
                    <h3 className="text-[17.5px] font-medium mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#F4F1E8" }}>{s.t}</h3>
                    <p className="text-[14.5px] leading-relaxed" style={{ color: DARK_TEXT_SOFT }}>{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS — plain editorial rows, not an identical-card grid */}
      <section id="prinosy" className="py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <Reveal>
            <Heading className="text-[26px] lg:text-[32px] leading-[1.18] mb-12 max-w-[560px]">
              Co to reálně přinese vašemu servisu.
            </Heading>
          </Reveal>
          <div>
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 60}>
                <div className="grid sm:grid-cols-[1fr_1.6fr] gap-2 sm:gap-8 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <h3 className="text-[17.5px] font-medium" style={{ fontFamily: "'Fraunces', serif" }}>{b.t}</h3>
                  <p className="text-[15px] leading-relaxed max-w-[480px]" style={{ color: INK_SOFT }}>{b.d}</p>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${BORDER}` }} />
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div
              className="rounded-[10px] px-7 py-12 lg:px-14 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
              style={{ background: DARK }}
            >
              <div className="max-w-[520px]">
                <Heading dark className="text-[24px] lg:text-[28px] leading-[1.25] mb-3">
                  Poslechněte si, jak může R1 AI fungovat ve vašem servisu.
                </Heading>
                <p className="text-[15px] leading-relaxed" style={{ color: DARK_TEXT_SOFT }}>
                  Během přibližně 10 minut vám ukážeme, jak AI recepční přijme hovor a zpracuje zákaznickou poptávku.
                </p>
              </div>
              <a
                href={MAILTO}
                className="flex-none inline-flex items-center justify-center px-7 py-4 rounded-[6px] text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ background: "#F4F1E8", color: DARK, fontFamily: "'Inter', sans-serif" }}
              >
                Domluvit 10minutovou ukázku
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRO KOHO */}
      <section id="pro-koho" className="py-16 lg:py-24" style={{ background: PAPER_RAISED, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Heading className="text-[24px] lg:text-[28px] leading-[1.25] max-w-[400px]">
              Pro autoservisy, kde telefon zvoní víc, než stíháte zvedat.
            </Heading>
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
                  <span className="flex-none w-5 h-5 rounded-full mt-0.5 flex items-center justify-center" style={{ background: STAMP_SOFT }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2L4 7.2L8 3" stroke={STAMP} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[15.5px] leading-relaxed" style={{ color: "#3A3527" }}>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Heading className="text-[24px] lg:text-[28px] leading-[1.25] max-w-[320px]">
              Co byste o R1 AI mohli chtít vědět.
            </Heading>
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
      <section className="py-16 lg:py-24" style={{ background: DARK }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          <Reveal>
            <Heading dark as="h2" className="text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.15] max-w-[680px] mb-9">
              Nechte si ukázat, jak může R1 AI fungovat ve vašem autoservisu.
            </Heading>
            <PrimaryButton href={MAILTO}>Domluvit 10minutovou ukázku</PrimaryButton>
          </Reveal>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="kontakt" className="py-14">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-9 pb-9" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-[6px] flex items-center justify-center" style={{ background: ACCENT }}>
                  <span className="text-white text-[12px] font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>R1</span>
                </span>
                <span className="text-[15px] font-medium tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>R1 AI</span>
              </div>
              <p className="text-[14.5px]" style={{ color: INK_SOFT }}>Leoš Horák</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-7 sm:gap-14">
              <div>
                <span className="block text-[13px] mb-1.5" style={{ color: "#8A8367" }}>Telefon</span>
                <a href={`tel:${PHONE_TEL}`} className="text-[15.5px] font-medium hover:text-[#1F4ED8] transition-colors">{PHONE}</a>
              </div>
              <div>
                <span className="block text-[13px] mb-1.5" style={{ color: "#8A8367" }}>E-mail</span>
                <a href={MAILTO} className="text-[15.5px] font-medium hover:text-[#1F4ED8] transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
          <p className="pt-7 text-[13px]" style={{ color: "#8A8367" }}>© {new Date().getFullYear()} R1 AI. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
