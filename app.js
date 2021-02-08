const searchButton = document.getElementById('button');
const mealItems = document.getElementById('meal');
const mealInfo = document.getElementById('meal-ingridients-info');

// added event listener
searchButton.addEventListener('click', getMeal)
mealItems.addEventListener('click', mealDetails);

// called function for get the meal items
function getMeal(){
    let inputInnerText = document.getElementById('input-text').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputInnerText}`)
    .then(response => response.json())
    .then(data => {
        let html = ''
        if(data.meals){             
            data.meals.forEach(meal => {
               html += `
               <div  class="col mb-5">
               <div class="card h-100 card-style" data-id ="${meal.idMeal}">
                 <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title card-text">${meal.strMeal}</h5>
                 </div>
               </div>
             </div>
               ` 
            });
        }
        else{           // showed result for notfound meals
            html = "Sorry, We didn't Find Any Meal"
            mealItems.classList.add('not-found');
        }
            mealItems.innerHTML = html;
        
    })
};

// called function for get meal details
function mealDetails (e) {
    e.preventDefault();
    let mealItem = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data => getMealInfo (data.meals))
}

// called function for show meal details
function getMealInfo (meal){
    console.log(meal)
    meal = meal[0];
    let html = `
    <div  class="meal-ingridients">
    <div class="image">
        <img class="img-fluid" src="${meal.strMealThumb}" alt="">
    </div>
    <div class="text">
        <h3 class="p-4">${meal.strMeal}</h3>
        <p class ="text-start ms-3"><span><i class="fas fa-check-square"></i></span> ${meal.strIngredient1}</p>
        <p class ="text-start ms-3"> <span><i class="fas fa-check-square"></i></span> ${meal.strIngredient2}</p>
        <p class ="text-start ms-3"> <span><i class="fas fa-check-square"></i></span> ${meal.strIngredient3}</p>
        <p class ="text-start ms-3"> <span><i class="fas fa-check-square"></i></span> ${meal.strIngredient4}</p>
        <p class ="text-start ms-3"> <span><i class="fas fa-check-square"></i></span> ${meal.strIngredient5}</p>
        <p class ="text-start ms-3"> <span><i class="fas fa-check-square"></i></span> ${meal.strIngredient6}</p>
    </div>

  </div>
    `;
    mealInfo.innerHTML = html;

}