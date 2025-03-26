// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const resetBtn = document.getElementById("reset-btn");

    // Fetch and display characters
    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => showCharacter(character));
                characterBar.appendChild(span);
            });
        });

    // Function to display a character's details
    function showCharacter(character) {
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        voteCount.textContent = character.votes;
        detailedInfo.dataset.id = character.id; // Store ID for voting
    }

    // Handle voting
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesToAdd = parseInt(event.target.votes.value);
        if (!isNaN(votesToAdd)) {
            voteCount.textContent = parseInt(voteCount.textContent) + votesToAdd;
        }
        event.target.reset();
    });

    // Reset votes (Bonus)
    resetBtn.addEventListener("click", () => {
        voteCount.textContent = 0;
    });
});
document.getElementById("character-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name-input").value;
    const image = document.getElementById("image-url").value;
    const newCharacter = { name, image, votes: 0 };

    // Add to character bar
    addCharacterToBar(newCharacter);

    // Clear form fields
    event.target.reset();

    // (Bonus) Save to the server
    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(data => console.log("Character added:", data));
});
