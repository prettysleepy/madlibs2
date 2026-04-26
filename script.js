const fields = [
  { key: "adj1", label: "Adjective", example: "sparkly" },
  { key: "animal", label: "Animal", example: "otter" },
  { key: "adj2", label: "Adjective", example: "wobbly" },
  { key: "noun1", label: "Noun", example: "teapot" },
  { key: "verbEd1", label: "Verb ending in -ed", example: "zoomed" },
  { key: "verbIng1", label: "Verb ending in -ing", example: "juggling" },
  { key: "adj3", label: "Adjective", example: "jazzy" },
  { key: "adj4", label: "Adjective", example: "thunderous" },
  { key: "onomatopoeia", label: "Onomatopoeia", example: "kaboom" },
  { key: "verb1", label: "Verb", example: "giggle" },
  { key: "interjection", label: "Interjection", example: "Yikes" },
  { key: "noun2", label: "Noun", example: "umbrella" },
  { key: "adverb1", label: "Adverb", example: "dramatically" },
  { key: "adj5", label: "Adjective", example: "purple" },
  { key: "pluralNoun1", label: "Plural noun", example: "cupcakes" },
  { key: "pluralNoun2", label: "Plural noun", example: "marbles" },
  { key: "adj6", label: "Adjective", example: "ridiculous" },
  { key: "noun3", label: "Noun", example: "backpack" },
  { key: "adj7", label: "Adjective", example: "soggy" },
  { key: "verb2", label: "Verb", example: "dance" },
  { key: "place", label: "Place", example: "library" },
  { key: "adj8", label: "Adjective", example: "mysterious" },
  { key: "profession", label: "Profession", example: "astronaut" },
  { key: "adj9", label: "Adjective", example: "crispy" },
  { key: "food", label: "Food", example: "waffles" },
  { key: "noun4", label: "Noun", example: "glitter" },
  { key: "adj10", label: "Adjective", example: "legendary" },
  { key: "verbEd2", label: "Verb ending in -ed", example: "nodded" },
  { key: "exclamation", label: "Exclamation", example: "Hooray" },
  { key: "verbIng2", label: "Verb ending in -ing", example: "singing" },
  { key: "noun5", label: "Noun", example: "pickle" },
  { key: "adverb2", label: "Adverb", example: "happily" }
];

const form = document.getElementById("madLibForm");
const inputs = document.getElementById("inputs");
const storySection = document.getElementById("storySection");
const storyBox = document.getElementById("story");
const exampleBtn = document.getElementById("exampleBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

fields.forEach((field) => {
  const wrapper = document.createElement("div");
  wrapper.className = "word-field";

  const label = document.createElement("label");
  label.setAttribute("for", field.key);
  label.textContent = field.label;

  const input = document.createElement("input");
  input.id = field.key;
  input.name = field.key;
  input.type = "text";
  input.autocomplete = "off";
  input.placeholder = field.example;
  input.required = true;

  wrapper.append(label, input);
  inputs.appendChild(wrapper);
});

function word(key) {
  const value = document.getElementById(key).value.trim();
  return value || "_____";
}

function marked(key) {
  return `<strong>${escapeHtml(word(key))}</strong>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function buildStory() {
  return `“Did you hear about the ${marked("adj1")} ${marked("animal")}?” they asked.

Before I could answer, a ${marked("adj2")} ${marked("noun1")} ${marked("verbEd1")} past us, ${marked("verbIng1")} ${marked("adj3")} music. Suddenly, there was a loud ${marked("adj4")} ${marked("onomatopoeia")} that made us both ${marked("verb1")}.

“${marked("interjection")}!” I yelled, waving my ${marked("noun2")} at them ${marked("adverb1")}.

Suddenly, the sky turned ${marked("adj5")} and it started raining ${marked("pluralNoun1")} and ${marked("pluralNoun2")}!

“Well, this is just ${marked("adj6")}! Now my ${marked("noun3")} is all ${marked("adj7")}.”

We decided this was the perfect time to ${marked("verb2")} all the way to the ${marked("place")}. Along the way, we met a ${marked("adj8")} ${marked("profession")} who offered us ${marked("adj9")} ${marked("food")}.

By the end of the day, we were covered in ${marked("noun4")} but agreed it was the most ${marked("adj10")} adventure ever.

“Same time tomorrow?” my friend asked.

I ${marked("verbEd2")} and said, “${marked("exclamation")}. Yes, but only if I can bring a ${marked("verbIng2")} ${marked("noun5")}.”

And we both lived ${marked("adverb2")} ever after.

The end.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  storyBox.innerHTML = buildStory();
  storySection.classList.remove("hidden");
  storySection.scrollIntoView({ behavior: "smooth", block: "start" });
});

exampleBtn.addEventListener("click", () => {
  fields.forEach((field) => {
    document.getElementById(field.key).value = field.example;
  });
});

clearBtn.addEventListener("click", () => {
  form.reset();
  storySection.classList.add("hidden");
  storyBox.innerHTML = "";
});

copyBtn.addEventListener("click", async () => {
  const text = storyBox.innerText;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = "Copy story", 1400);
  } catch {
    alert("Copy did not work in this browser. You can select the story text and copy it manually.");
  }
});
