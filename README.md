CensorCore
==========
<p><strong><span style="color:red">⚠️ WARNING: The <code>wordlist.json</code> file contains explicit language, slurs, and other harmful content. View it at your own risk.</span></strong></p>
<hr>
CensorCore is a lightweight JavaScript library for detecting explicit or inappropriate text using a centralized JSON wordlist. It is designed for straightforward integration: include a single script tag and call one function within your message handling logic. CensorCore is suitable for chat applications, comment systems, forms, or any environment where user generated text requires screening.

Features
--------

-   Zero configuration setup

-   Shared JSON wordlist loaded from CDN

-   Efficient whole word matching

-   Minimal and predictable API

-   No DOM modification or event interception

-   Full control retained by the integrating developer

Installation
------------

To install CensorCore, include the script tag in the <head> or just before the closing <body> tag of your HTML file to ensure it loads before your application code runs:

`<script src="https://cdn.jsdelivr.net/gh/DerrickRichard/CensorCore-Library@1.0.0/CensorCore.js"></script>`

After the script loads, a global object named censor will be available for use in your JavaScript.

Make sure your internet connection allows loading scripts from the CDN[  ](https://cdn.jsdelivr.net)[cdn.jsdelivr.net](http://cdn.jsdelivr.net).

Inside your logic to send messages, add this inside the function:

```JavaScript
 //Block explicit messages using the CensorCore library

      if  (censor.isBlocked(text))  {

        alert("Message blocked: Inappropriate Content");

        return;

      }
```
Your entire send function should look similar to this:

```JavaScript
function  sendMessage()  {

      const  text  =  input.value;

      // Block explicit messages using the CensorCore library

      if  (censor.isBlocked(text))  {

        alert("Message blocked: Inappropriate Content");

        return;

      }

      addMessage(text);

      input.value  =  '';

      input.focus();

    }
```

If you prefer, you can download the script and host it locally by cloning the repository or downloading the file directly, then updating the script src attribute accordingly.

Example of local hosting:

`<script src="path/to/CensorCore.js"></script>`

This setup requires no additional configuration and works out of the box.

Usage
-----

Call `censor.isBlocked(text)` before sending or processing a message. Integrate this check into your message sending logic to prevent inappropriate content from being sent.

Example:

```JavaScript
function  sendMessage()  {

  const  text  =  input.value;

  //  Check  if  the  message  contains  blocked  words

  if  (censor.isBlocked(text))  {

    alert("Message  blocked:  Inappropriate  Content");

    return;  //  Prevent  sending  the  message

  }

  //  Proceed  with  sending  the  message

  addMessage(text);

}
```

In your sending logic, ensure you `call censor.isBlocked(text)` with the message text before actually sending or processing it. If it returns true, block the message and notify the user accordingly. You are able to adjust the alert content to your preferences.

Wordlist Structure
------------------

CensorCore loads a JSON file structured by category:

```json
{

"profanity": ["word1",  "word2"],

"hate_speech": ["word3",  "word4"],

"harassment": ["word5",  "word6"]

}
```

All categories are automatically merged into a single internal list. The CensorCore word list is curated solely by Derrick Richard to ensure consistency and quality. Community members cannot directly edit the word list. To request a new word or phrase, please submit a request in the Word Request section of the repository's Discussions page.

API Reference
-------------

### censor.isBlocked(text: string): boolean

Returns true if the provided text contains any banned words. Returns false otherwise.

Design Philosophy
-----------------

CensorCore intentionally avoids modifying the host page's DOM, intercepting events, or altering user interface behavior. Instead, it provides a clear and predictable function that developers can integrate into their own message--handling logic. This approach ensures transparency, stability, and compatibility across a wide range of applications.

About the Developer
-------------------

CensorCore was created and is maintained by Derrick Richard, a high school developer focused on building practical, lightweight tools for the web. He publishes weekly programming articles on[  dev.to](https://dev.to), which can be found at:

<https://dev.to/derrickrichard/>

More information about his work and background is available on his personal profile:

<https://derrickrichard.github.io/profile/>

The CensorCore word list is curated solely by Derrick Richard to ensure consistency and quality. Community members cannot directly edit the word list. To request a new word or phrase, please submit a request in the Word Request section of the repository's Discussions page.

Versions
--------

-   v1.0.0: Initial release with basic filtering functionality and a basic JSON wordlist.

License
-------

This project is released under the MIT License.
