document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value.trim();
    const process = document.getElementById('process').value.trim();


    const recipe = { name, category, ingredients, process };

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];


    recipes.push(recipe);


    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Recipe submitted successfully!');


    this.reset();
});