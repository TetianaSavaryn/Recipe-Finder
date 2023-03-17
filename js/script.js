// search
const searchBtn = document.getElementById('search-btn');
const resultItem = document.getElementById('result-item');
const recipes = document.getElementById('recipes');
const searchText = document.getElementById('search-text');
//const itemPhoto = document.getElementById('item-photo');
//const itemName = document.getElementById('item-name');

// search button event listener
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    let searchInput = "";
    searchInput += document.getElementById('search-input').value.trim();
    //let searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=73b9a76fc83e4d16a1e485b15383fc9f&query=${searchInput}`;
    //let searchUrl1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=73b9a76fc83e4d16a1e485b15383fc9f&query=pasta`;
    let searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=e6f5e7b827d24fd9a71f7ec3bdb3d5b7&query=${searchInput}`;
    
    fetchResults(searchUrl);
    
});


//fetch test
/*
async function fetchResults(){
    let searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=73b9a76fc83e4d16a1e485b15383fc9f&query=pasta';
    let response = await fetch(searchUrl);
    console.log(response.status); // 200
    console.log(response.statusText); // OK
    if (response.status === 200) {
        let data = await response.text();
        // handle data
    }
}
fetchResults();
*/

function fetchResults(searchUrl){
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        let html = "";
        if(data.results.length>0) {
            data.results.forEach(
                result => {
                html += `
                            <div class="result-item col" id="${result.id}">
                                <a href="/recipe.html">
                                    <div class="overlayer">
                                        <h3>Read more</h3>
                                    </div>
                                    <div class="item-photo" id="item-photo">
                                        <img src="${result.image}" alt="recipe photo">
                                    </div>
                                    <div class="item-name" id="item-name">
                                        <h4>${result.title}</h4>
                                    </div>
                                </a>
                            </div>

                `;
            });
        } else {
            // if there's no results
            html = `<h2 style="text-align: center;">We couldn't find what you're looking for</h2>`
        }
        searchText.innerHTML = "Search Results:"
        recipes.innerHTML = html;

    })
    .catch(rejected => {
        console.log(rejected);//handle the error
    })
}



