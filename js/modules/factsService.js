/**
 * js/modules/factsService.js
 * GeoSphere Facts Service Module
 * Responsibility: Provide random fun facts about Earth, weather, and geography.
 */

const facts = [
    "The Amazon rainforest produces 20% of the world's oxygen.",
    "Mount Everest grows about 4 millimeters every year.",
    "The Sahara Desert is roughly the size of the United States.",
    "The Pacific Ocean is larger than all landmasses combined.",
    "Lake Baikal in Russia holds 20% of the world's unfrozen freshwater.",
    "Iceland has more volcanoes than any other country in the world.",
    "The Nile is the longest river, stretching over 6,600 kilometers.",
    "The Dead Sea is so salty that people float effortlessly on its surface.",
    "Hurricanes in the Southern Hemisphere rotate clockwise.",
    "Earth is the only planet known to have plate tectonics.",
    "Antarctica holds 60% of the world’s freshwater in its ice sheets.",
    "The Mariana Trench is deeper than Mount Everest is tall.",
    "Weather in the tropics changes rapidly due to high humidity.",
    "Tornadoes can reach wind speeds of over 300 mph.",
    "Greenland is the world’s largest island that is not a continent."
];

/**
 * Get a random fact.
 * @returns {string} fact
 */
export function getRandomFact() {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
}
