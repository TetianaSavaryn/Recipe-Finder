// -----recipe page------
const openRecipePage = document.getElementById('openRecipePage');
const recipePhoto = document.getElementById('recipe-photo');
const title = document.getElementById('item-title');
const ingredient = document.getElementById('ingredient-name');
const health = document.getElementById('health-information');
const instructions = document.getElementById('instructions');
const spoonacularKey = '337bf0fe4f2949f1b5807bba385fdb43';

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');


console.log('id sent' + recipeId);
fetchRecipe(recipeId);

function fetchRecipe(id){
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${spoonacularKey}`)
    .then(response => response.json())
    .then(data => {
        let html="";
        console.log(data);
        recipePhoto.innerHTML = `<img src="${data.image}" alt="recipe photo">`;
        title.innerHTML = `<h3>${data.title}</h3>`;

        //ingrediedients with measure
        data.extendedIngredients.forEach(
            ingredient => {
                html += `
                <li><p>${ingredient.name} - ${ingredient.amount} ${ingredient.unit}</p></li>
            `;
        });
        ingredient.innerHTML = html;

        //health ingormation
        if((data.vegetarian == false) && (data.vegan == false) && (data.glutenFree == false) && (data.dairyFree == false) && (data.veryHealthy == false)) {
            document.getElementById('health-info').style.display="none";
        }

        health.innerHTML = "";
        if (data.vegetarian == true) {
            health.innerHTML += `
            <div class="col">
                <p>vegetarian</p>
            </div>`;
        }
        if (data.vegan == true) {
            health.innerHTML += `
            <div class="col">
                <p>vegan</p>
            </div>`;
        }
        if (data.glutenFree == true) {
            health.innerHTML += `
            <div class="col">
                <p>gluten ree</p>
            </div>`;
        }
        if (data.dairyFree == true) {
            health.innerHTML += `
            <div class="col">
                <p>dairy free</p>
            </div>`;
        }
        if (data.veryHealthy == true) {
            health.innerHTML += `
            <div class="col">
                <p>very healthy</p>
            </div>`;
        }

        instructions.innerHTML = `<p>${data.instructions}</p>`;


    });
}



