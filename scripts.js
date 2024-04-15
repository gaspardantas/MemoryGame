// JavaScript Logic
// Get the elements that display score and tries
const scoreDisplay = document.getElementById("score");
const triesDisplay = document.getElementById("tries");

// Define an array of card objects, each containing a name and an image URL
const cardArray = [
  { name: "bjj", img: "img1.png" },
  { name: "karate", img: "img2.png" },
  { name: "judo", img: "img3.png" },
  { name: "kungfu", img: "img4.png" },
  { name: "boxing", img: "img5.png" },
  { name: "muaythai", img: "img6.png" },
  { name: "capoeira", img: "img7.png" },
  { name: "kravmaga", img: "img8.png" },
  { name: "bjj", img: "img1.png" },
  { name: "karate", img: "img2.png" },
  { name: "judo", img: "img3.png" },
  { name: "kungfu", img: "img4.png" },
  { name: "boxing", img: "img5.png" },
  { name: "muaythai", img: "img6.png" },
  { name: "capoeira", img: "img7.png" },
  { name: "kravmaga", img: "img8.png" },
];

// Shuffle the card array randomly
cardArray.sort(() => 0.5 - Math.random());

// Select the grid element
const gridDisplay = document.querySelector("#grid");

// Initialize variables for tracking chosen cards, score, and tries
let cardsChosen = [];
let cardsIdChosen = [];
let score = 0;
let tries = 1;

// Update the display with initial score and tries
triesDisplay.innerHTML = tries;
scoreDisplay.innerHTML = score;

// Function to create the game grid
function createTable() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.className = "grid-cell";
    card.setAttribute("src", "blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

// Function to check if two chosen cards match
function checkMatch() {
  const cards = document.querySelectorAll("img");
  if (cardsIdChosen[0] == cardsIdChosen[1]) {
    // If the same card is clicked twice
    alert("You need to pick 2 different cards");
    cards[cardsIdChosen[0]].setAttribute("src", "blank.png");
  } else if (cardsChosen[0] == cardsChosen[1]) {
    // If the chosen cards match
    score++;
    scoreDisplay.innerHTML = score; // Update score display
    alert("Nice job");
    for (let i = 0; i < 2; i++) {
      cards[cardsIdChosen[i]].setAttribute("src", "blank2.png"); // Show matched cards
      cards[cardsIdChosen[i]].removeEventListener("click", flipCard); // Remove click event listener;
    }
  } else {
    // If the chosen cards do not match
    alert("Wrong match");
    for (let i = 0; i < 2; i++) {
      cards[cardsIdChosen[i]].setAttribute("src", "blank.png"); // Hide cards
    }
  }
  if (score < 8) {
    //game not over, update tries
    tries++;
    triesDisplay.innerHTML = tries; // Update tries display
  }
  cardsChosen = []; // Clear chosen cards array
  cardsIdChosen = []; // Clear chosen card IDs array
  if (score == 8) {
    triesDisplay.innerHTML = tries + " for the win!!";
  }
}

// Function to handle flipping a card when clicked
function flipCard() {
  const cardId = this.getAttribute("data-id");
  const cardName = cardArray[cardId].name;
  cardsChosen.push(cardName); // Add card name to chosen cards array
  cardsIdChosen.push(cardId); // Add card ID to chosen card IDs array
  this.setAttribute("src", cardArray[cardId].img); // Show card image
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500); // Check for match after a short delay
  }
}

// Function to restart the game
function restartGame() {
  location.reload(); // Reload the page to restart the game
}

createTable();
