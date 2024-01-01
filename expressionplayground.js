const models = document.getElementsByClassName("model")
let a, b, i, modelName, modelParts, slider

//preloading images
function preImg(character, expressions, type) {
    for (i = 2; i <= expressions; i++) {
        const preloadLink = document.createElement("link")
        preloadLink.href = `resources/faces/${character}/${character}${type}${i}.png`
        preloadLink.rel = "preload"
        preloadLink.as = "image"
        document.head.appendChild(preloadLink)
    }
}

for (a = 0; a < models.length; a++) {
    for (b = 0; b < models[a].getElementsByClassName("slidecontainer").length; b++) {
        slider = models[a].getElementsByClassName("slidecontainer")[b].querySelector("input")
        preImg(models[a].querySelector("div").className, slider.max, slider.id)
    }
}

//face changing
for (a = 0; a < models.length; a++) {
    for (b = 0; b < models[a].getElementsByClassName("slidecontainer").length; b++) {
        models[a].getElementsByClassName("slidecontainer")[b].querySelector("input").addEventListener("input", function () {
            modelName = this.parentElement.parentElement.querySelector("div").className
            modelParts = this.parentElement.parentElement.querySelector("div").querySelectorAll("div")
            if (this.id == "Eye") {
                modelParts[1].querySelector("img").src = `resources/faces/${modelName}/${modelName}Eye${this.value}.png`
            }
            if (this.id == "Mouth") {
                modelParts[2].querySelector("img").src = `resources/faces/${modelName}/${modelName}Mouth${this.value}.png`
            }
            if (this.id == "Face") {
                modelParts[1].querySelector("img").src = `resources/faces/${modelName}/${modelName}Face${this.value}.png`
            }
        }, false)
    }
}