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
   console.log(searchInputTxt);
}