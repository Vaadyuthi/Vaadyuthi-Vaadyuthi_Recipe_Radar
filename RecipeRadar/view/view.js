document.addEventListener("DOMContentLoaded", () => {

    const defaultRecipes = [
        { name: "Classic Pancakes", category: "Breakfast", ingredients: "Flour, Milk, Eggs", process: "Mix and cook." },
        { name: "Omelette", category: "Breakfast", ingredients: "Eggs, Onion, Spices", process: "Beat and fry." },
        { name: "Tomato Pasta", category: "Lunch", ingredients: "Pasta, Tomato sauce", process: "Boil pasta, add sauce." },
        { name: "Veg Pulao", category: "Lunch", ingredients: "Rice, Vegetables", process: "Cook rice with vegetables." },
        { name: "Veg Sandwich", category: "Snacks", ingredients: "Bread, Veggies", process: "Assemble and toast." },
        { name: "Fruit Salad", category: "Snacks", ingredients: "Fruits", process: "Chop and mix." },
        { name: "Palak Paneer", category: "Dinner", ingredients: "Spinach, Paneer", process: "Cook spinach and add paneer." },
        { name: "Dal Tadka", category: "Dinner", ingredients: "Lentils, Spices", process: "Boil dal, add tadka." }
    ];


    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipes = [...defaultRecipes, ...storedRecipes];

    const categoryButtons = document.querySelectorAll(".cat-btn");
    const searchInput = document.getElementById("search");
    const recipeList = document.getElementById("recipe-list");

    let selectedCategory = null;

    function displayRecipes(recipesToShow) {
        recipeList.innerHTML = "";

        if (recipesToShow.length === 0) {
            recipeList.innerHTML = "<li>No recipes found.</li>";
            return;
        }

        recipesToShow.forEach((recipe, index) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `recipe.html?id=${index}`;
            a.textContent = recipe.name;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
                window.open("recipe.html", "_blank");
            });
            li.appendChild(a);
            recipeList.appendChild(li);
        });
    }

    function filterAndDisplay() {
        const searchTerm = searchInput.value.toLowerCase();
        let filtered = recipes.filter(r => r.category === selectedCategory);

        if (searchTerm) {
            filtered = filtered.filter(r => r.name.toLowerCase().includes(searchTerm));
        }

        displayRecipes(filtered);
    }

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            selectedCategory = button.getAttribute("data-category");
            searchInput.disabled = false;
            searchInput.value = "";

            filterAndDisplay();
        });
    });

    searchInput.addEventListener("input", filterAndDisplay);
});