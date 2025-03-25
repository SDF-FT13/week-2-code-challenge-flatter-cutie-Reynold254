document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/characters";

  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      const characterBar = document.getElementById("character-bar");

      data.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer"; // Change cursor to indicate interactivity

        // Show full character details on click
        span.addEventListener("click", () => showCharacterDetails(character));

        // Show image preview when hovering
        span.addEventListener("mouseenter", () => {
          showCharacterImage(character.image, character.name);
        });

        // Revert image back to default on mouse leave
        span.addEventListener("mouseleave", () => {
          resetCharacterImage();
        });

        characterBar.appendChild(span);
      });
    });
});

// Function to show character details when clicked
function showCharacterDetails(character) {
  document.getElementById("name").textContent = character.name;
  const imageElement = document.getElementById("image");
  imageElement.src = character.image;
  imageElement.alt = character.name;
  document.getElementById("vote-count").textContent = character.votes;

  currentCharacter = character;
}

// Function to show character image preview on hover
function showCharacterImage(imageSrc, altText) {
  const imageElement = document.getElementById("image");
  imageElement.src = imageSrc;
  imageElement.alt = altText;
}

// Function to reset image to default when mouse leaves
function resetCharacterImage() {
  document.getElementById("image").src = "assets/dummy.gif";
  document.getElementById("image").alt = "Character's Name";
}

// Ensure `currentCharacter` is defined to avoid errors
let currentCharacter = null;

// Handling vote submission
document.getElementById("votes-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const votesInput = document.getElementById("votes").value;
  if (currentCharacter) {
    currentCharacter.votes += parseInt(votesInput);
    document.getElementById("vote-count").textContent = currentCharacter.votes;

    document.getElementById("votes").value = "";
  } else {
    alert("Please select a character first!");
  }
});

// Reset votes button functionality
document.getElementById("reset-btn").addEventListener("click", () => {
  if (currentCharacter) {
    currentCharacter.votes = 0;
    document.getElementById("vote-count").textContent = currentCharacter.votes;
  } else {
    alert("Please select a character first!");
  }
});
