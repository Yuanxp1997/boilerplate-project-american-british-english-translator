const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(text, locale, wrap = false) {
    let translatedText = text;
    const openTag = '<span class="highlight">';
    const closeTag = "</span>";
    if (locale === "american-to-british") {
      // loop through the americanOnly object and replace the key with the value
      for (let key in americanOnly) {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        const replacement = americanOnly[key];
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag}`
          );
        } else {
          translatedText = translatedText.replace(regex, replacement);
        }
      }
      // loop through the americanToBritishSpelling object and replace the key with the value
      for (let key in americanToBritishSpelling) {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        const replacement = americanToBritishSpelling[key];
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag}`
          );
        } else {
          translatedText = translatedText.replace(regex, replacement);
        }
      }
      // loop through the americanToBritishTitles object and replace the key with the value
      for (let key in americanToBritishTitles) {
        const regex = new RegExp(`\\b${key}.\\b`, "gi");
        const replacement =
          americanToBritishTitles[key].charAt(0).toUpperCase() +
          americanToBritishTitles[key].slice(1);
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag} `
          );
        } else {
          translatedText = translatedText.replace(regex, replacement + " ");
        }
      }
      // replace the time format from american to british
      const timeRegex = new RegExp(/([0-9]{1,2}):([0-9]{2})/, "g");
      if (wrap) {
        translatedText = translatedText.replace(
          timeRegex,
          `${openTag}$1.$2${closeTag}`
        );
      } else {
        translatedText = translatedText.replace(timeRegex, "$1.$2");
      }
    } else if (locale === "british-to-american") {
      for (let key in britishOnly) {
        const regex = new RegExp(`(?<!-)\\b${key}\\b(?!-)`, "gi");
        const replacement = britishOnly[key];
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag}`
          );
        } else {
          translatedText = translatedText.replace(regex, replacement);
        }
      }
      for (let key in americanToBritishSpelling) {
        const regex = new RegExp(
          `\\b${americanToBritishSpelling[key]}\\b`,
          "gi"
        );
        const replacement = key;
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag}`
          );
        } else {
          translatedText = translatedText.replace(regex, replacement);
        }
      }
      for (let key in americanToBritishTitles) {
        const regex = new RegExp(`\\b${americanToBritishTitles[key]}\\b`, "gi");
        const replacement = key.charAt(0).toUpperCase() + key.slice(1);
        if (wrap) {
          translatedText = translatedText.replace(
            regex,
            `${openTag}${replacement}${closeTag}`
          );
        } else {
          translatedText = translatedText.replace(regex, replacement);
        }
      }
      const timeRegex = new RegExp(/([0-9]{1,2}).([0-9]{2})/, "g");
      if (wrap) {
        translatedText = translatedText.replace(
          timeRegex,
          `${openTag}$1:$2${closeTag}`
        );
      } else {
        translatedText = translatedText.replace(timeRegex, "$1:$2");
      }
    }
    return translatedText;
  }
}

module.exports = Translator;
