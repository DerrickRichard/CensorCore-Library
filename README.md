CensorCore 
==========

⚠️ WARNING: The `wordlist.json` file contains explicit language, slurs, and other harmful content. View it at your own risk.

CensorCore is a lightweight JavaScript library for detecting explicit, harmful, or inappropriate text using a centralized JSON wordlist. It is designed for straightforward integration: include a single script tag and call one function within your message‑handling logic.

Version 2.0 introduces a more advanced moderation engine with phrase detection, severity levels, async loading events, and a detailed `analyze()` API, while remaining fully backward‑compatible with the original `isBlocked()` function. CensorCore is suitable for chat applications, comment systems, forms, or any environment where user‑generated text requires screening.

Features

- Zero‑configuration setup - Shared JSON wordlist loaded from CDN - Phrase detection (supports multi‑word entries) - Automatic severity mapping based on category - Minimal and predictable API (isBlocked + analyze) - Async lifecycle events (onReady, onError) - Optional custom rule extension - No DOM modification or event interception - Full control retained by the integrating developer

Installation

To install CensorCore, include the script tag in the `<head>` of your HTML file to ensure it loads before your application code runs:

Code

```
<script src="https://cdn.jsdelivr.net/gh/DerrickRichard/CensorCore-Library@latest/CensorCore.js"></script>

```

If you place the script near the closing `</html>` tag, the library may load after your code runs, which can prevent the wordlist from initializing correctly.

After the script loads, a global object named `censor` will be available for use in your JavaScript.

Make sure your internet connection allows loading scripts from the CDN at:

https://cdn.jsdelivr.net

Basic Integration

Inside your message‑sending logic, add this check:

JavaScript

```
// Block explicit messages using the CensorCore library
if (censor.isBlocked(text)) {
    alert("Message blocked: Inappropriate Content");
    return;
}

```

A full example:

JavaScript

```
function sendMessage() {
    const text = input.value;

    // Block explicit messages using the CensorCore library
    if (censor.isBlocked(text)) {
        alert("Message blocked: Inappropriate Content");
        return;
    }

    addMessage(text);
    input.value = '';
    input.focus();
}

```

Advanced Usage (Version 2.0)

Use the new `analyze()` API for detailed moderation results:

JavaScript

```
const result = censor.analyze(text);

if (result.blocked) {
    console.log("Blocked severity:", result.severity);
    console.log("Category:", result.category);
    console.log("Matches:", result.matches);
}

```

Custom Rules

You can add your own rules without modifying the main wordlist:

JavaScript

```
censor.extend([
    { text: "my custom phrase", category: "custom", severity: "medium" }
]);

```

Wordlist Structure

CensorCore loads a JSON file structured by category. Your actual wordlist includes categories such as:

profanity hate_speech harassment sexual_content violence self_harm drugs weapons extremism terrorism disallowed_phrases custom

Each category is automatically assigned a severity level (low, medium, or high). All categories are merged into a single internal rule engine.

The CensorCore wordlist is curated solely by Derrick Richard to ensure consistency and quality. Community members cannot directly edit the wordlist. To request a new word or phrase, please use the Word Request section in the repository's Discussions page.

API Reference

censor.isBlocked(text) Returns true if the text contains any blocked content.

censor.analyze(text) Returns a detailed moderation result including: - whether the text is blocked - highest severity - category - all matched rules

censor.extend(rules) Adds custom moderation rules at runtime.

censor.isReady() Returns true when the wordlist has finished loading.

censor.isFailed() Returns true if the wordlist failed to load.

censor.onReady(callback) Fires when the moderation engine is ready.

censor.onError(callback) Fires if the moderation engine fails to load.

Design Philosophy

CensorCore avoids modifying the DOM, intercepting events, or altering UI behavior. Instead, it provides a predictable, developer‑controlled moderation function. This ensures transparency, stability, and compatibility across a wide range of applications.

About the Developer

CensorCore was created and is maintained by Derrick Richard, a high school developer focused on building practical, lightweight tools for the web.

He publishes weekly programming articles at: https://dev.to/derrickrichard/

More information about his work is available at: https://derrickrichard.github.io/profile/

The CensorCore wordlist is curated solely by Derrick Richard to ensure consistency and quality. Community members cannot directly edit the wordlist. To request a new word or phrase, please submit a request in the Word Request section of the repository's Discussions page.

Versions

v1.0.0 -- Initial release with basic filtering functionality and a basic JSON wordlist.

v1.1.0 -- CensorCore v1.1.0 makes the filtering engine faster and more dependable. The wordlist is now processed ahead of time, the matching is quicker, and the library handles text in a more consistent way. The code has also been cleaned up so it is easier to follow and maintain. This update adds helper functions to check whether the wordlist has loaded or if something went wrong. The public API is locked to prevent accidental modification, and the library behaves more safely if used before loading finishes.

v2.0.0 -- CensorCore v2.0.0 is a major upgrade that introduces phrase detection, automatic severity levels, async lifecycle events, a detailed analyze() API, and custom rule support. The internal rule engine has been redesigned for clarity and flexibility while remaining fully backward‑compatible with the original isBlocked() function.

License

This project is released under the MIT License.
