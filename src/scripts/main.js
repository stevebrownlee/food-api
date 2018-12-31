/*
    Food component factory function
*/
const createFoodSection = food => `
    <section class="foodItem bordered">
        <header>
            <h1>${food.name}</h1>
        </header>
        <div>
            ${food.ethnicity} ${food.type}
        </div>
        <div>
            ${food.ingredients.map(f=>f.text).join(", ")}
        </div>
    </section>
`

/*
    Code to add food to the DOM
*/
const listEl = document.querySelector(".foodlist")
const addFoodToDom = foodRepresentation => listEl.innerHTML += foodRepresentation


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients
                    food.countryOfOrigin = productInfo.product.countries_tags
                    food.calories = productInfo.product.nutriments.energy_serving
                    food.fatPerServing = productInfo.product.nutriments.fat_serving
                    food.sugarPerServing = productInfo.product.nutriments.sugars_serving
                    const foodAsHTML = createFoodSection(food)
                    addFoodToDom(foodAsHTML)
                })
        })
    })

