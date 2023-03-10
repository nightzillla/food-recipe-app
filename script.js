const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// EVENT LISTENER
searchBtn.addEventListener('click', getMealList);
// searchBtn.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter'){
//         getMealList();
//     }
// });
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
/** 
 * !.trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string 
 * !.value property sets or returns the value of the value attribute of a text field.
*/
// get meal list that matches with the ingredients
function getMealList(){
   let searchInputTxt = document.getElementById('search-input').value.trim();
   /**
    * ! The fetch() function returns a Promise, which is an object representing the eventual completion or failure of an asynchronous operation. The Promise returned by fetch() resolves to the Response object representing the response to the request.
    */
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
   /**
    * ! we chain two .then() methods to the Promise returned by fetch(). The first .then() method takes the Response object returned by fetch() and converts it to JSON data using the response.json() method. This returns a new Promise that resolves with the JSON data.
    */
   .then(response => response.json())
   .then(data => {
    console.log("prints out meals")
    console.log(data)
    let html = "";
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href ="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
   });
}

// Get recipe of meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem)
        console.log(mealItem.dataset.id)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
        }
    }
     
// creating MODAL Function
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}