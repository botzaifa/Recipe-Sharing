// Function to handle the Like and Favorite buttons
function handleButtonToggle(button) {
    button.classList.toggle("active");
}

// Edit Recipe Modal
const editRecipeModal = document.getElementById("editRecipeModal");
const editRecipeForm = document.getElementById("editRecipeForm");
const closeEditModalButton = document.querySelector(".close-button");

let currentRecipeCard; // To keep track of the recipe being edited

// Function to open the edit modal with pre-filled data
function openEditModal(recipe) {
    currentRecipeCard = recipe;
    const recipeTitle = recipe.querySelector("h2").textContent;
    const ingredients = recipe.querySelector(".ingredients").textContent;
    const cookingInstructions = recipe.querySelector(".cooking-instructions").textContent;
    const preparationTime = recipe.querySelector(".preparation-time").textContent;

    document.getElementById("editRecipeTitle").value = recipeTitle;
    document.getElementById("editIngredients").value = ingredients;
    document.getElementById("editCookingInstructions").value = cookingInstructions;
    document.getElementById("editPreparationTime").value = preparationTime;

    editRecipeModal.style.display = "block";
}

// Event listener for edit button on each recipe
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
        const recipeCard = e.target.closest(".recipe-card");
        openEditModal(recipeCard);
    }
});

// Event listener for close button on the edit modal
closeEditModalButton.addEventListener("click", () => {
    editRecipeModal.style.display = "none";
});

// Event listener for clicking outside the modal to close it
window.addEventListener("click", (e) => {
    if (e.target === editRecipeModal) {
        editRecipeModal.style.display = "none";
    }
});

// Event listener for the edit form submission
editRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editedRecipeTitle = document.getElementById("editRecipeTitle").value;
    const editedIngredients = document.getElementById("editIngredients").value;
    const editedCookingInstructions = document.getElementById("editCookingInstructions").value;
    const editedPreparationTime = document.getElementById("editPreparationTime").value;

    currentRecipeCard.querySelector("h2").textContent = editedRecipeTitle;
    currentRecipeCard.querySelector(".ingredients").textContent = editedIngredients;
    currentRecipeCard.querySelector(".cooking-instructions").textContent = editedCookingInstructions;
    currentRecipeCard.querySelector(".preparation-time").textContent = `${editedPreparationTime} minutes`;

    editRecipeModal.style.display = "none";
});

// Function to handle search functionality
function handleSearch() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach((card) => {
        const recipeTitle = card.querySelector("h2").textContent.toLowerCase();
        if (recipeTitle.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Event listener for the search button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearch);

// Event listener for Like buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
        handleButtonToggle(e.target);
    }
});

// Event listener for Favorite buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-button")) {
        handleButtonToggle(e.target);
    }
});

// Event listener for the form submission
const recipeForm = document.getElementById("recipeForm");
const recipesList = document.getElementById("recipesList");

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const recipeTitle = document.getElementById("recipeTitle").value;
  const ingredients = document.getElementById("ingredients").value;
  const cookingInstructions = document.getElementById("cookingInstructions").value;
  const preparationTime = document.getElementById("preparationTime").value;

  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.innerHTML = `
    <h2>${recipeTitle}</h2>
    <p class="ingredients"><strong>Ingredients:</strong> ${ingredients}</p>
    <p class="cooking-instructions"><strong>Cooking Instructions:</strong></p>
    <p>${cookingInstructions}</p>
    <p class="preparation-time"><strong>Preparation Time:</strong> ${preparationTime} minutes</p>
    <button class="edit-button">Edit</button>
    <button class="like-button">Like</button>
    <button class="favorite-button">Favorite</button>
  `;

  recipesList.appendChild(recipeCard);

  recipeCard.querySelector(".edit-button").addEventListener("click", () => {
    openEditModal(recipeCard);
  });

  recipeForm.reset();
});

// ... Rest of the JavaScript code ...
