# Feedback Portal UI Toolkit

A lightweight Chrome Extension that adds a one-click **📋 Copy** button to the **memory**, **bash**, and **output** cards on the feedback portal.  

It currently just copies content, but I intend to add navigation and other features 😉 .. 

---

## Features

| Card | What gets copied |
|------|------------------|
| **memory** | *insert_line*, *new_str* and anything below &nbsp;— skips the “command / insert” pair |
| **bash**   | Just the shell commands inside each `<pre>` block &nbsp;— skips the “command” label |
| **output** | The entire output body |

---

## Quick Start

1. **Clone** this repo  
   ```bash
   git clone https://github.com/SirNova01/card-craft.git
   cd card-craft
   ```

2. **Load it unpacked**  
   * Navigate to `chrome://extensions`  
   * Enable **Developer mode** (top-right)  
   * Click **Load unpacked** and select the project folder

3. Visit the portal and reload ➜ wait for the cards to render ➜ click 📋 ➜ paste anywhere (`Ctrl / ⌘-V`) ➜ enjoy.

---

## File Structure

```
memory-copy-ext/
├─ manifest.json          # Manifest V3
├─ content-script.js      # Injects buttons, handles copy & toast
├─ background.js          # Receives click events (optional use)
├─ style.css              # Button + toast styles
└─ icons/
   └─ copy.svg            # Toolbar / store icon (128×128)
```

---

## Customising

* **Change what gets copied**  
  Open `content-script.js` and tweak the three extractor functions (`memoryText`, `bashText`, `bodyText`).  
* **Add another card type**  
  1. Write a new extractor `function fooText(card) { … }`  
  2. Add an entry to `const CARDS = { foo: fooText, … }`.
* **Toast style / duration**  
  Edit the `.copy-toast` rule in `style.css` or change the timings in `showToast()`.

---

## License

MIT © Turing 2025

---

Happy copying!  
Feel free to open issues or PRs for bug fixes, feature requests, or style tweaks.
