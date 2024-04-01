const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  const translator = new Translator();
  // Translate Mangoes are my favorite fruit. to British English
  test("Translate Mangoes are my favorite fruit. to British English", (done) => {
    const input = "Mangoes are my favorite fruit.";
    const output = "Mangoes are my favourite fruit.";
    assert.equal(translator.translate(input, "american-to-british"), output);
    done();
  });
});
