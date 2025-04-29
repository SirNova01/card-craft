/* toast */
function showToast(msg = "Copied!") {
  const t = document.createElement("div");
  t.className = "copy-toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => (t.style.opacity = "0.92"));
  setTimeout(() => {
    t.style.opacity = "0";
    t.addEventListener("transitionend", () => t.remove(), { once: true });
  }, 1400);
}

/* extractors */
const bashText   = c => [...c.querySelectorAll(".p-2.bg-white pre")]
                     .map(p => p.innerText.trim()).join("\n").trim();

const memoryText = c => [...c.querySelectorAll(".p-2.bg-white")]
                     .slice(1).map(b => b.innerText.trim()).join("\n").trim();

const bodyText   = c => [...c.children].slice(1)
                     .map(e => e.innerText.trim()).filter(Boolean).join("\n").trim();

const CARDS = { memory: memoryText, bash: bashText, output: bodyText };

/* inject button */
function injectButton(h) {
  if (h.querySelector(".copy-btn")) return;
  const label = h.childNodes[0]?.textContent.trim().toLowerCase();

  h.style.display = "flex";
  h.style.alignItems = "center";

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.title = `Copy ${label} card`;
  btn.textContent = "📋";
  btn.style.marginLeft = "auto";
  btn.onclick = () => {
    const card = h.closest(".flex.flex-col");
    if (!card) return;
    const text = (CARDS[label] || bodyText)(card);
    navigator.clipboard.writeText(text).then(showToast)
      .catch(err => console.error(`Copy ${label} failed`, err));
  };
  h.appendChild(btn);
}

/* init + observer */
const sel = ".font-medium.rounded-t.p-2";
const observe = () =>
  [...document.querySelectorAll(sel)]
    .filter(h => CARDS.hasOwnProperty(h.childNodes[0]?.textContent.trim().toLowerCase()))
    .forEach(injectButton);

observe();
new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });

