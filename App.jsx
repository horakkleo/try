<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>R1 AI — Demo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --dark: #12151A;
    --dark-2: #1B1F27;
    --dark-3: #232833;
    --border: #2A2F3A;
    --accent: #2454FF;
    --accent-soft: #EAF0FF;
    --text-mute: #9CA3AF;
    --white: #FFFFFF;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: var(--dark);
    font-family: 'Inter', sans-serif;
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }
  body {
    display: flex; flex-direction: column; align-items: center;
    min-height: 100vh; padding: 24px 24px 60px;
    gap: 40px;
  }
  .stage {
    width: 100%; max-width: 460px;
  }
  .eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--accent); text-align: center; margin-bottom: 10px;
  }
  .console {
    background: var(--dark-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 22px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  }
  .call-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 4px 4px 16px 4px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .call-id { display: flex; align-items: center; gap: 10px; }
  .avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--accent); display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', serif; font-weight: 700; font-size: 15px;
  }
  .call-name { font-family: 'Space Grotesk', serif; font-weight: 700; font-size: 15px; }
  .call-status { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text-mute); margin-top: 2px; }
  .call-status.live { color: #4ADE80; }
  .call-status.live::before {
    content: "●"; margin-right: 5px; animation: pulse 1.2s infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .timer { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-mute); }

  .transcript {
    min-height: 300px; max-height: 380px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px; padding: 4px 2px;
  }
  .bubble {
    max-width: 84%; padding: 10px 14px; border-radius: 14px;
    font-size: 13.5px; line-height: 1.42;
    opacity: 0; transform: translateY(8px);
    animation: rise 0.35s ease forwards;
  }
  @keyframes rise { to { opacity: 1; transform: translateY(0); } }
  .bubble.ai {
    align-self: flex-start;
    background: var(--dark-3);
    border: 1px solid var(--border);
    border-bottom-left-radius: 4px;
    color: var(--white);
  }
  .bubble.customer {
    align-self: flex-end;
    background: var(--accent);
    border-bottom-right-radius: 4px;
    color: var(--white);
  }
  .label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9.5px; letter-spacing: 1px; text-transform: uppercase;
    color: var(--text-mute); margin: 2px 2px 0 2px;
  }
  .label.right { text-align: right; }

  .typing {
    align-self: flex-start;
    display: flex; gap: 4px; padding: 12px 14px;
    background: var(--dark-3); border: 1px solid var(--border); border-radius: 14px;
    border-bottom-left-radius: 4px;
    opacity: 0; animation: rise 0.3s ease forwards;
  }
  .typing span {
    width: 6px; height: 6px; border-radius: 50%; background: var(--text-mute);
    animation: bounce 1s infinite;
  }
  .typing span:nth-child(2) { animation-delay: 0.15s; }
  .typing span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }

  .controls { margin-top: 18px; display: flex; gap: 10px; }
  button {
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13.5px;
    border: none; border-radius: 10px; padding: 12px 18px; cursor: pointer;
    flex: 1; transition: opacity 0.15s;
  }
  button:active { opacity: 0.8; }
  .btn-primary { background: var(--accent); color: var(--white); }
  .btn-ghost { background: transparent; color: var(--text-mute); border: 1px solid var(--border); }
  button:disabled { opacity: 0.4; cursor: default; }

  .result-card {
    margin-top: 16px; background: var(--dark);
    border: 1px solid var(--border); border-radius: 14px;
    padding: 18px; opacity: 0; transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .result-card.show { opacity: 1; transform: translateY(0); }
  .result-title {
    font-family: 'Space Grotesk', serif; font-weight: 700; font-size: 15px;
    display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
  }
  .check-dot {
    width: 20px; height: 20px; border-radius: 50%; background: var(--accent);
    display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
  }
  .field-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
  .field-row:last-child { border-bottom: none; }
  .field-row .k { color: var(--text-mute); }
  .field-row .v { font-weight: 600; text-align: right; }

  .transcript::-webkit-scrollbar { width: 4px; }
  .transcript::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
</style>
</head>
<body>

<div class="stage">
  <div class="eyebrow">R1 AI · Simulovaná ukázka</div>
  <div class="console">
    <div class="call-top">
      <div class="call-id">
        <div class="avatar">AI</div>
        <div>
          <div class="call-name">Ukázka hovoru · Ukázkový autoservis</div>
          <div class="call-status" id="status">Připraveno ke spuštění</div>
        </div>
      </div>
      <div class="timer" id="timer">00:00</div>
    </div>

    <div class="transcript" id="transcript"></div>

    <div class="result-card" id="result">
      <div class="result-title"><span class="check-dot">✓</span> Poptávka vytvořena</div>
      <div class="field-row"><span class="k">Jméno</span><span class="v">Petr Novák</span></div>
      <div class="field-row"><span class="k">Telefon</span><span class="v">607 123 456</span></div>
      <div class="field-row"><span class="k">Vozidlo</span><span class="v">Škoda Octavia, 2016</span></div>
      <div class="field-row"><span class="k">Problém</span><span class="v">Zvuk při brzdění</span></div>
      <div class="field-row"><span class="k">Termín</span><span class="v">Středa dopoledne</span></div>
    </div>

    <div class="controls">
      <button class="btn-primary" id="startBtn">Spustit hovor</button>
      <button class="btn-ghost" id="resetBtn" disabled>Znovu</button>
    </div>
  </div>
</div>

<script>
  // --- živé demo hovoru ---
  const script = [
    { who: "ai", text: "Dobrý den, autoservis, u telefonu virtuální asistentka. Jak vám mohu pomoci?" },
    { who: "customer", text: "Dobrý den, já bych potřeboval přijet s autem, dělá mi to takový divný zvuk, když brzdím." },
    { who: "ai", text: "Rozumím, to nezní dobře. Můžu se zeptat na pár věcí, ať to rovnou předám mechanikovi? Jak se jmenujete?" },
    { who: "customer", text: "Jasně, jsem Petr Novák." },
    { who: "ai", text: "Díky, pane Nováku. A na jaké číslo by vám mohl mechanik zavolat zpátky, kdyby bylo potřeba?" },
    { who: "customer", text: "607 123 456, to je přímo na mě." },
    { who: "ai", text: "Super, děkuju. A jaké máte auto, značka a model a rok výroby?" },
    { who: "customer", text: "Škodovka, Octavia, rok výroby 2016." },
    { who: "ai", text: "Rozumím. A kdy by se vám hodilo s tím přijet?" },
    { who: "customer", text: "Asi nejlíp tenhle týden, jestli by šlo třeba středa dopoledne, to mám volno." },
    { who: "ai", text: "Super, děkuji, mechanik se vám ozve na potvrzení termínu. Přeji hezký den." },
  ];

  const transcript = document.getElementById("transcript");
  const statusEl = document.getElementById("status");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resultCard = document.getElementById("result");

  let timerInterval = null;
  let seconds = 0;
  let running = false;

  function startTimer() {
    seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${m}:${s}`;
    }, 1000);
  }
  function stopTimer() { clearInterval(timerInterval); }

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  function addLabel(who) {
    const l = document.createElement("div");
    l.className = "label" + (who === "customer" ? " right" : "");
    l.textContent = who === "ai" ? "AI recepční" : "Zákazník";
    transcript.appendChild(l);
  }

  function addTyping() {
    const t = document.createElement("div");
    t.className = "typing";
    t.id = "typingIndicator";
    t.innerHTML = "<span></span><span></span><span></span>";
    transcript.appendChild(t);
    transcript.scrollTop = transcript.scrollHeight;
    return t;
  }

  function addBubble(who, text) {
    const b = document.createElement("div");
    b.className = "bubble " + who;
    b.textContent = text;
    transcript.appendChild(b);
    transcript.scrollTop = transcript.scrollHeight;
  }

  async function runCall() {
    if (running) return;
    running = true;
    startBtn.disabled = true;
    resetBtn.disabled = true;
    transcript.innerHTML = "";
    resultCard.classList.remove("show");
    statusEl.textContent = "Vyzvánění…";
    statusEl.className = "call-status";
    await wait(1100);
    statusEl.textContent = "Hovor probíhá";
    statusEl.className = "call-status live";
    startTimer();

    for (const line of script) {
      await wait(500);
      const typingDelay = line.who === "ai" ? 700 : 550;
      addTyping();
      await wait(typingDelay);
      document.getElementById("typingIndicator")?.remove();
      addLabel(line.who);
      addBubble(line.who, line.text);
    }

    await wait(600);
    statusEl.textContent = "Hovor ukončen";
    statusEl.className = "call-status";
    stopTimer();
    resultCard.classList.add("show");
    resetBtn.disabled = false;
    running = false;
  }

  function resetDemo() {
    stopTimer();
    seconds = 0;
    timerEl.textContent = "00:00";
    transcript.innerHTML = "";
    resultCard.classList.remove("show");
    statusEl.textContent = "Připraveno ke spuštění";
    statusEl.className = "call-status";
    startBtn.disabled = false;
    resetBtn.disabled = true;
  }

  startBtn.addEventListener("click", runCall);
  resetBtn.addEventListener("click", resetDemo);
</script>

</body>
</html>
