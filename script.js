const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners 
searchBtn.addEventListener('click', getMealList);
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
    let html = "";
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class="meal-item data-id ="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt = "food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href ="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
            `;
        });
    } else {
        html = "Sorry, we didn't find any meal!";
    }

    mealList.innerHTML = html;
   });
}