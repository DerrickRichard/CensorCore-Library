// CensorCore.js
// Copyright (c) 2025 Derrick Richard
// Lightweight, zero-setup message filtering library.
// Source: https://github.com/DerrickRichard/CensorCore-Library
// Licensed under the MIT License
// Author: Derrick Richard (https://derrickrichard.github.io/profile/)
// Weekly programming articles: https://dev.to/derrickrichard
// v2.0 — Adds severity levels, phrase detection, custom rules, async events, and rich analyze() API.

(function () {
  let rules = [];
  let ready = false;
  let loadFailed = false;
  const readyCallbacks = [];
  const errorCallbacks = [];

  // Default severity mapping for categories
  const CATEGORY_SEVERITY = {
    profanity: "medium",
    hate_speech: "high",
    harassment: "medium",
    sexual_content: "high",
    violence: "high",
    self_harm: "high",
    drugs: "medium",
    weapons: "high",
    extremism: "high",
    terrorism: "high",
    disallowed_phrases: "medium",
    custom: "low",
    default: "low"
  };

  // Public API
  const censor = {
    isBlocked(text) {
      return this.analyze(text).blocked;
    },

    analyze(text) {
      if (!ready || !text) {
        return { blocked: false, matches: [] };
      }

      const normalized = normalizeText(text);
      const matches = [];

      for (const rule of rules) {
        if (rule.pattern.test(normalized)) {
          matches.push({
            text: rule.text,
            category: rule.category,
            severity: rule.severity
          });
        }
      }

      if (matches.length === 0) {
        return { blocked: false, matches: [] };
      }

      const severityOrder = { low: 1, medium: 2, high: 3 };
      const highest = matches.reduce((a, b) =>
        (severityOrder[b.severity] || 1) > (severityOrder[a.severity] || 1)
          ? b
          : a
      );

      return {
        blocked: true,
        severity: highest.severity,
        category: highest.category,
        matches
      };
    },

    extend(customRules) {
      if (!Array.isArray(customRules)) return;

      for (const r of customRules) {
        if (!r || !r.text) continue;

        const text = String(r.text).toLowerCase();
        const category = r.category || "custom";
        const severity = r.severity || CATEGORY_SEVERITY[category] || "low";

        rules.push({
          text,
          category,
          severity,
          pattern: buildPattern(text)
        });
      }
    },

    isReady() {
      return ready;
    },

    isFailed() {
      return loadFailed;
    },

    onReady(callback) {
      if (typeof callback !== "function") return;
      if (ready) callback();
      else readyCallbacks.push(callback);
    },

    onError(callback) {
      if (typeof callback !== "function") return;
      if (loadFailed) callback();
      else errorCallbacks.push(callback);
    }
  };

  window.censor = Object.freeze(censor);

  // Load JSON wordlist
  fetch("https://cdn.jsdelivr.net/gh/DerrickRichard/CensorCore-Library@main/wordlist.json")
    .then(res => res.json())
    .then(data => {
      const newRules = [];

      for (const [category, list] of Object.entries(data || {})) {
        const severity =
          CATEGORY_SEVERITY[category] || CATEGORY_SEVERITY.default;

        if (!Array.isArray(list)) continue;

        for (const entry of list) {
          if (!entry) continue;

          const text = String(entry).toLowerCase();

          newRules.push({
            text,
            category,
            severity,
            pattern: buildPattern(text)
          });
        }
      }

      rules = newRules;
      ready = true;
      readyCallbacks.forEach(cb => cb());
    })
    .catch(err => {
      loadFailed = true;
      errorCallbacks.forEach(cb => cb(err));
      console.error("CensorCore: Could not load wordlist.json", err);
    });

  function normalizeText(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .normalize("NFKC");
  }

  function buildPattern(text) {
    const escaped = escapeRegex(text);
    return new RegExp("\\b" + escaped + "\\b", "i");
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
})();
