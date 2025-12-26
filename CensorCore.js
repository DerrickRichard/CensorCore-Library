// CensorCore.js
// Copyright (c) 2025 Derrick Richard
// Lightweight, zero-setup message filtering library.
// Source: https://github.com/DerrickRichard/CensorCore-Library
// Licensed under the MIT License
// Author: Derrick Richard (https://derrickrichard.github.io/profile/)
// Weekly programming articles: https://dev.to/derrickrichard

(function () {
  let patterns = [];        // Precompiled regex patterns
  let ready = false;        // True when wordlist is loaded
  let loadFailed = false;   // True if JSON fails to load

  // Public API
  const censor = {
    isBlocked(text) {
      if (!ready) return false;
      if (!text) return false;

      const normalized = text
        .trim()
        .toLowerCase()
        .normalize("NFKC");

      return patterns.some(p => p.test(normalized));
    },

    isReady() {
      return ready;
    },

    isFailed() {
      return loadFailed;
    }
  };

  // Expose globally and prevent modification
  window.censor = Object.freeze(censor);

  // Load JSON wordlist
  fetch("https://cdn.jsdelivr.net/gh/DerrickRichard/CensorCore-Library@main/wordlist.json")
    .then(res => res.json())
    .then(data => {
      const words = Object.values(data)
        .flat()
        .map(w => w.toLowerCase());

      // Precompile regex patterns for speed
      patterns = words.map(w =>
        new RegExp("\\b" + escapeRegex(w) + "\\b", "i")
      );

      ready = true;
    })
    .catch(() => {
      loadFailed = true;
      console.error("CensorCore: Could not load wordlist.json");
    });

  // Escape regex special characters
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
})();
