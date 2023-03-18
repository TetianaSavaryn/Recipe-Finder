// -- search --
const searchBtn = document.getElementById('search-btn');
const recipes = document.getElementById('recipes');
const searchText = document.getElementById('search-text');
const pagination = document.getElementById('pagination');
const spoonacularKey = '337bf0fe4f2949f1b5807bba385fdb43';
const resultsPerPage = 6;
let numberOfResults;
const filterCuisine = document.getElementById('filterCuisine');
let filters = {};

filterCuisine.style.display = "none";

// search button event listener
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    let searchInput = "";
    searchInput += document.getElementById('search-input').value.trim();
    
    //if the input was empty:
    if (searchInput === '') {
        recipes.innerHTML = "<h2 style='text-align: center;'>The search bar cannot be empty</h2>";
        pagination.innerHTML = "";
    } else {

        // filter search
        // add event listeners to clicking checkboxes
        let checkboxes = document.querySelectorAll('.form-check-input');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(){
                filters[checkbox.id] = checkbox.checked;
                let searchParams = new URLSearchParams(); // create new URLSearchParams object
                for (let key in filters) {
                    if (filters[key]) {
                        searchParams.append('cuisine', key); // add filter to search params
                    }
                }
                let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchInput}&${searchParams.toString()}`; // construct search URL with filters
                fetchResults(url, 1);
            });
        });


    let searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&query=${searchInput}`;
    
    fetchResults(searchUrl, 1); // call fetchResults with pageNumber = 1

    }
});



//fetch test
/*
async function fetchResults(){
    let searchUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=71e4a356f7e44493bb3f45decfc5b3a7&query=pasta';
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

function fetchResults(searchUrl, pageNumber){
    
    let offset = (pageNumber - 1) * resultsPerPage; // calculate the offset based on pageNumber
    let url = `${searchUrl}&offset=${offset}&number=${resultsPerPage}`; // limiting searchUrl to already paginated
    filterCuisine.style.display = "block";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let html = "";
        numberOfResults = JSON.parse(data.totalResults);
        // if the prompt is some random phrase
        if(numberOfResults == 0) {
            html = `<h2 style="text-align: center;">We couldn't find what you're looking for</h2>`
            style.display = "none";
            pagination.style.display = "none";
        } else
        // if the prompt is a key word(s)
        if(data.results) {
            //console.log(numberOfResults);
            data.results.forEach(
                result => {
                html += `
                            <div class="result-item" id="${result.id}">
                                <a href="/recipe.html?id=${result.id}" id="openRecipePage">
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

            filterCuisine.style.display = "block"; //display the checkboxes

        // pagination links
        let totalPages = Math.ceil(numberOfResults / resultsPerPage);
        let paginationHtml = '';

        for(let i = 1; i <= totalPages; i++){
            if(i == pageNumber){
                paginationHtml += `<div class="page-item active col text-align-left"><a class="page-link">${i}</a></div>`; //active page
            }else{
                paginationHtml += `<div class="page-item col text-align-left"><a href="#" class="page-link" data-page="${i}">${i}</a></div>`;
            }
        }
        pagination.innerHTML = paginationHtml;
        
        // add event listeners to clicking page links
        let paginationLinks = pagination.querySelectorAll('.page-link');
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(event){
                event.preventDefault();
                let clickedPage = this.getAttribute('data-page');
                fetchResults(searchUrl, clickedPage);
            });
        });

        } else {
            // if there's no results
            html = `<h2 style="text-align: center;">We couldn't find what you're looking for</h2>`
            
        }

        searchText.innerHTML = "Search Results:"

        recipes.innerHTML = html;
        console.log(searchUrl);
        

    })
    .catch(rejected => {
        console.log(rejected);
    })
}
