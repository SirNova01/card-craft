
/* toast */
function showToast(msg = "Copied!") {
  const t = Object.assign(document.createElement("div"), {
    className: "copy-toast",
    textContent: msg,
  });
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

/* helpers */
const selHeader = ".font-medium.rounded-t.p-2";
const wanted    = h => CARDS.hasOwnProperty(h.childNodes[0]?.textContent.trim().toLowerCase());

/* inject copy + scroll buttons */
function injectButtons(h) {
  if (h.querySelector(".copy-btn")) return;               /* already done */
  const label = h.childNodes[0].textContent.trim().toLowerCase();

  h.style.display = "flex";
  h.style.alignItems = "center";

  const copy = document.createElement("button");
  copy.className = "copy-btn";
  copy.textContent = "📋";
  copy.title = `Copy ${label}`;
  copy.style.marginLeft = "auto";
  copy.onclick = () => {
    const card = h.closest(".flex.flex-col");
    if (!card) return;
    const text = (CARDS[label] || bodyText)(card);
    navigator.clipboard.writeText(text).then(showToast)
      .catch(err => console.error(`Copy ${label} failed`, err));
  };

  const jump = document.createElement("button");
  jump.className = "scroll-btn";
  jump.textContent = "⬇️";
  jump.title = `Scroll ${label} to end`;
  jump.onclick = () => {
    const last = h.closest(".flex.flex-col")?.lastElementChild;
    last?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  h.append(copy, jump);
}

/* init + observer */
const add = () => [...document.querySelectorAll(selHeader)].filter(wanted).forEach(injectButtons);

add();
new MutationObserver(add).observe(document.body, { childList: true, subtree: true });
