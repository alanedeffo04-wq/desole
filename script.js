/* ========= À PERSONNALISER ========= */
const TEXTES = {
  titre1: "Mon amour,",
  message1:
    "Je sais que j’ai fait une bêtise, et je m’en veux.\n" +
    "Tu comptes énormément pour moi.\n" +
    "Alors j’ai préparé quelque chose pour toi…",
  question: "Est-ce que tu veux bien m’excuser ?",
  rappels: [
    "Hé ! Le « Non » s’est enfui…",
    "Impossible de cliquer dessus 😅",
    "Regarde comme le « Oui » grandit…",
    "Mon nounours est tout triste…",
    "Allez, un petit « Oui » ?",
    "Je t’aime trop pour abandonner ♥"
  ],
  titre3: "Merci, mon cœur ♥",
  message3: "Tu es la plus belle chose qui me soit arrivée.\nJe te promets de faire mieux. J’ai préparé une petite vidéo et une lettre pour toi."
};
/* ==================================== */

const $ = id => document.getElementById(id);

/* Nounours */
function nounours(noeud, cls){
  return `<svg class="${cls}" viewBox="0 0 200 230" role="img" aria-label="Nounours">
    <ellipse cx="62" cy="215" rx="26" ry="14" fill="#c98a5a"/><ellipse cx="138" cy="215" rx="26" ry="14" fill="#c98a5a"/>
    <ellipse cx="100" cy="165" rx="58" ry="52" fill="#c98a5a"/>
    <ellipse cx="100" cy="172" rx="34" ry="34" fill="#f3cfa8"/>
    <ellipse cx="52" cy="150" rx="16" ry="30" fill="#c98a5a" transform="rotate(20 52 150)"/>
    <ellipse cx="148" cy="150" rx="16" ry="30" fill="#c98a5a" transform="rotate(-20 148 150)"/>
    <circle cx="48" cy="48" r="28" fill="#c98a5a"/><circle cx="48" cy="48" r="14" fill="#f3cfa8"/>
    <circle cx="152" cy="48" r="28" fill="#c98a5a"/><circle cx="152" cy="48" r="14" fill="#f3cfa8"/>
    <circle cx="100" cy="92" r="58" fill="#c98a5a"/>
    <ellipse cx="100" cy="110" rx="27" ry="20" fill="#f3cfa8"/>
    <circle cx="78" cy="84" r="6.5" fill="#3b1f1a"/><circle cx="122" cy="84" r="6.5" fill="#3b1f1a"/>
    <circle cx="80" cy="82" r="2" fill="#fff"/><circle cx="124" cy="82" r="2" fill="#fff"/>
    <circle cx="66" cy="104" r="9" fill="#ff8fab" opacity=".55"/><circle cx="134" cy="104" r="9" fill="#ff8fab" opacity=".55"/>
    <ellipse cx="100" cy="100" rx="8" ry="6" fill="#3b1f1a"/>
    <path class="happy" d="M90 112 Q100 124 110 112" stroke="#3b1f1a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="sad" d="M90 120 Q100 108 110 120" stroke="#3b1f1a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="larme" d="M78 92 q-5 12 0 16 q5 -4 0 -16z" fill="#7ec8f5"/>
    ${noeud}
  </svg>`;
}
const noeud = `<path d="M82 146 L100 154 L82 164z M118 146 L100 154 L118 164z" fill="#ff6f91"/><circle cx="100" cy="154" r="5" fill="#d94a70"/>`;
$("couple").innerHTML = nounours("", "g") + '<span class="coeur">♥</span>' + nounours(noeud, "d");

/* Cœurs qui flottent en fond */
for (let i = 0; i < 16; i++){
  const s = document.createElement("span");
  s.textContent = ["♥","💕","🧸","💗"][i % 4];
  s.style.left = Math.random()*100 + "%";
  s.style.fontSize = (16 + Math.random()*26) + "px";
  s.style.animationDuration = (12 + Math.random()*14) + "s";
  s.style.animationDelay = (-Math.random()*20) + "s";
  $("fond").appendChild(s);
}

/* Pluie de cœurs */
function pluie(n){
  for (let i = 0; i < n; i++){
    const e = document.createElement("div");
    e.className = "pluie";
    e.textContent = ["♥","💖","🧸","💕","😘"][Math.floor(Math.random()*5)];
    e.style.left = Math.random()*100 + "vw";
    e.style.animationDuration = (2.5 + Math.random()*3) + "s";
    e.style.animationDelay = Math.random()*1.2 + "s";
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 7500);
  }
}

function aller(id){
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

/* Scène 1 : le message s’écrit */
$("titre1").textContent = TEXTES.titre1;
const msg1 = $("msg1"), suite = $("btnSuite");
if (matchMedia("(prefers-reduced-motion: reduce)").matches){
  msg1.textContent = TEXTES.message1; suite.classList.add("vu");
} else {
  let i = 0;
  (function ecrire(){
    msg1.textContent = TEXTES.message1.slice(0, ++i);
    if (i < TEXTES.message1.length) setTimeout(ecrire, 38);
    else suite.classList.add("vu");
  })();
}
suite.onclick = () => { aller("s2"); pluie(10); };

/* Scène 2 : le « Non » ne marche jamais */
$("question").textContent = TEXTES.question;
const non = $("non"), oui = $("oui");
let essais = 0;

function fuir(e){
  if (e) e.preventDefault();
  essais++;
  $("couple").classList.add("triste");
  $("rappel").textContent = TEXTES.rappels[(essais - 1) % TEXTES.rappels.length];
  oui.style.setProperty("--s", Math.min(1 + essais*0.15, 1.9));
  non.style.transform = "scale(" + Math.max(1 - essais*0.07, .55) + ")";
  non.style.position = "fixed";
  const w = non.offsetWidth, h = non.offsetHeight;
  non.style.left = Math.random()*(innerWidth - w - 20) + 10 + "px";
  non.style.top  = Math.random()*(innerHeight - h - 20) + 10 + "px";
}
function dit_oui(){
  $("couple").classList.remove("triste");
  $("titre3").textContent = TEXTES.titre3;
  $("msg3").textContent = TEXTES.message3;
  aller("s3");
  pluie(60);
}
["pointerenter","touchstart","mousedown","focus"].forEach(ev => non.addEventListener(ev, fuir, {passive:false}));
non.addEventListener("click", dit_oui);   /* même un clic sur « Non » = « Oui » */
oui.addEventListener("click", dit_oui);

/* Scène 3 : la lettre en PDF */
$("btnPdf").onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const texte = $("lettre").value.trim();
  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(122, 31, 61);
  const lignes = doc.splitTextToSize(texte, 170);
  let y = 30;
  lignes.forEach(l => {
    if (y > 275){ doc.addPage(); y = 30; }
    doc.text(l, 20, y);
    y += 8;
  });
  doc.save("lettre.pdf");
};