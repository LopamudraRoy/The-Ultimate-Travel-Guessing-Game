const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const fs = require("fs");

const baseDestinations = [
  {
    name: "Paris",
    clues: [
      "Home to a famous tower finished in 1889",
      "Called the City of Light",
    ],
    funFacts: [
      "The Louvre is the world's largest art museum.",
      "Famous for café culture and haute cuisine.",
    ],
  },
  {
    name: "Tokyo",
    clues: [
      "Capital city with over 13 million residents",
      "Known for high-tech, anime, and cherry blossoms",
    ],
    funFacts: [
      "It's the most populous metropolitan area in the world.",
      "Tsukiji once was the world's largest fish market.",
    ],
  },
  {
    name: "New York City",
    clues: ["Home to Times Square and Broadway", "Nicknamed the Big Apple"],
    funFacts: [
      "Central Park is larger than Monaco.",
      "The Statue of Liberty was a gift from France.",
    ],
  },
  {
    name: "Rome",
    clues: ["Once the center of a vast empire", "Home to the Colosseum"],
    funFacts: [
      "The Vatican City is inside Rome.",
      "It has more fountains than any other city.",
    ],
  },
  {
    name: "London",
    clues: ["Home to a famous clock tower", "The River Thames runs through it"],
    funFacts: [
      "London has over 170 museums.",
      "The London Underground is the world's oldest metro system.",
    ],
  },
  {
    name: "Bangkok",
    clues: [
      "Capital of a Southeast Asian country known for street food",
      "Home to the Grand Palace and floating markets",
    ],
    funFacts: [
      "Bangkok has the longest city name in the world in Thai.",
      "It\u2019s the most visited city in the world according to Mastercard.",
    ],
  },
  {
    name: "Cairo",
    clues: [
      "Capital city near the Great Pyramid of Giza",
      "Located on the Nile River",
    ],
    funFacts: [
      "Cairo is the largest city in the Arab world.",
      "The Pyramids were the tallest structures in the world for 3,800 years.",
    ],
  },
  {
    name: "Rio de Janeiro",
    clues: [
      "Famous for its Christ the Redeemer statue",
      "Hosts the world\u2019s biggest Carnival festival",
    ],
    funFacts: [
      "Copacabana Beach is one of the most famous beaches in the world.",
      "Sugarloaf Mountain offers panoramic views of the city.",
    ],
  },
  {
    name: "Dubai",
    clues: [
      "Home to the tallest building in the world",
      "Located in the Arabian Desert",
    ],
    funFacts: [
      "The Burj Khalifa is over 828 meters tall.",
      "Dubai Mall has an indoor ice rink and a giant aquarium.",
    ],
  },
];

const destinations = [];
const totalDestinations = 102;

for (let i = 1; i <= totalDestinations; i++) {
  const base = baseDestinations[i % baseDestinations.length];
  const randomIndex = Math.floor(Math.random() * baseDestinations.length);
  const extraFact = baseDestinations[randomIndex].funFacts[0];

  destinations.push({
    alias: `dst${i}`,
    name: base.name,
    clues: [...base.clues, `A popular destination for tourists (#${i})`], // Add uniqueness
    funFacts: [...base.funFacts, extraFact],
  });
}

fs.writeFileSync("destinations.json", JSON.stringify(destinations, null, 2));

console.log("Generated 100+ destinations!");
console.log(destinations);

app.get("/api/destination", (req, res) => {
  const randomDestination =
    destinations[Math.floor(Math.random() * destinations.length)];

  res.json({
    alias: randomDestination.alias,
    clues: randomDestination.clues,
    correctName: randomDestination.name,
  });
});

app.post("/api/check-answer", (req, res) => {
  const { alias, answer } = req.body;

  const destination = destinations.find((d) => d.alias === alias);

  if (!destination) {
    return res.status(404).json({ message: "Destination not found" });
  }

  if (destination.name.toLowerCase() === answer.toLowerCase()) {
    res.json({
      correct: true,
      funFact: destination.funFacts[0],
    });
  } else {
    res.json({
      correct: false,
      funFact: destination.funFacts[1],
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
