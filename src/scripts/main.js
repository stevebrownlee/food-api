const $ = require("jquery")

$.ajax("http://localhost:8088/food")
.then(response => {
    console.log(response)
})
.then(() => {
    $.ajax({
        url: "http://localhost:8088/food",
        method: "POST",
        data: {
            name: "Hamburger",
            type: "meat",
            ethnicity: "Murica",
            sideDishes: ["fries", "tater tots", "tater salad"]
        }
    })
})