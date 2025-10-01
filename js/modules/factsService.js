// factsService.js
// A simple fun facts generator

const facts = [
    "The Earth is the only planet known to support life.",
    "Mount Everest is the tallest mountain above sea level.",
    "The Amazon rainforest produces about 20% of the world’s oxygen.",
    "The Sahara is the largest hot desert on Earth.",
    "The Pacific Ocean is the largest ocean on Earth."
];

export function getFact() {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
}
