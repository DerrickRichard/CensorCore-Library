// CensorCore.js
// Copyright (c) 2026 Derrick Richard
// Lightweight, zero-setup message filtering library.
// Source: https://github.com/DerrickRichard/CensorCore-Library
// Source: https://github.com/DerrickRichard/CensorCore-Moderation-API
// Licensed under the MIT License
// Author: Derrick Richard (https://derrickrichard.github.io/profile/)
// Weekly programming articles: https://dev.to/derrickrichard
// v3.0 — Switched to a Python API to detect profane phrases. Removed the wordlist.json file.

(function () {
  let ready = false;
  let loadFailed = false;
  const readyCallbacks = [];
  const errorCallbacks = [];

  // URL of your moderation API
  const API_URL = "http://localhost:8000/analyze"; // Change for production

  // Public API
  const censor = {
    async isBlocked(text) {
      const result = await this.analyze(text);
      return result.blocked;
    },

    async analyze(text) {
      if (!ready || !text) {
        return { blocked: false, matches: [] };
      }

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });

        if (!response.ok) {
          throw new Error("API returned non-OK status");
        }

        const data = await response.json();

        return {
          blocked: data.blocked,
          reason: data.reason,
          confidence: data.confidence,
          categories: data.categories
        };
      } catch (err) {
        console.error("CensorCore: API error", err);
        return { blocked: false, error: true };
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

  // Immediately ready — no wordlist to load
  try {
    ready = true;
    readyCallbacks.forEach(cb => cb());
  } catch (err) {
    loadFailed = true;
    errorCallbacks.forEach(cb => cb(err));
  }
})();

