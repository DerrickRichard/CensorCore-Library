// CensorCore.js
// Copyright (c) 2025 Derrick Richard
// CensorCore is a lightweight, zero‑setup message filtering library.
// Source: https://github.com/DerrickRichard/CensorCore-Library
// Licensed under the MIT License
// Author: Derrick Richard (https://derrickrichard.github.io/profile/)
// Weekly programming articles: https://dev.to/derrickrichard

(function () {
  let bannedWords = [];

  // Public API object
  const censor = {
    isBlocked(text) {
      return containsExplicit(text);
    }
  };

  // Expose globally
  window.censor = censor;

  // Load JSON file from jsDelivr CDN
  fetch("https://cdn.jsdelivr.net/gh/DerrickRichard/CensorCore-Library/wordlist.json")
    .then(res => res.json())
    .then(data => {
      // Flatten all categories into one list
      bannedWords = Object.values(data).flat().map(w => w.toLowerCase());
    })
    .catch(() => {
      console.error("Could not load wordlist.json");
    });

  function containsExplicit(text) {
    if (!text) return false;
    const lower = text.toLowerCase();

    return bannedWords.some(word => {
      const pattern = new RegExp("\\b" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
      return pattern.test(lower);
    });
  }
})();
