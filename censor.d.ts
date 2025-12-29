// Type definitions for CensorCore.js
// Source: https://github.com/DerrickRichard/CensorCore-Library
// Author: Derrick Richard
// MIT License

declare namespace CensorCore {
  type Severity = "low" | "medium" | "high" | string;

  interface Match {
    text: string;
    category: string;
    severity: Severity;
  }

  interface AnalyzeResult {
    blocked: boolean;
    severity?: Severity;
    category?: string;
    matches: Match[];
  }

  interface CustomRule {
    text: string;
    category?: string;
    severity?: Severity;
  }

  interface CensorAPI {
    /**
     * Returns true if the text contains any blocked content.
     */
    isBlocked(text: string): boolean;

    /**
     * Returns a detailed analysis of the text, including:
     * - whether it is blocked
     * - highest severity
     * - category
     * - all matched rules
     */
    analyze(text: string): AnalyzeResult;

    /**
     * Adds custom moderation rules at runtime.
     */
    extend(rules: CustomRule[]): void;

    /**
     * Returns true when the JSON wordlist has been loaded.
     */
    isReady(): boolean;

    /**
     * Returns true if the JSON wordlist failed to load.
     */
    isFailed(): boolean;

    /**
     * Fires when the moderation engine is ready.
     */
    onReady(callback: () => void): void;

    /**
     * Fires if the moderation engine fails to load.
     */
    onError(callback: (error?: any) => void): void;
  }
}

declare const censor: CensorCore.CensorAPI;

export {};
