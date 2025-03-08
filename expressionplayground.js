//const models = document.getElementsByClassName("model")
//let a, b, i, modelName, modelParts, slider
//
//for (a = 0; a < models.length; a++) {
//    for (b = 0; b < models[a].getElementsByClassName("slidecontainer").length; b++) {
//        slider = models[a].getElementsByClassName("slidecontainer")[b].querySelector("input")
//        preImg(models[a].querySelector("div").className, slider.max, slider.id)
//    }
//}
//
////face changing
//for (a = 0; a < models.length; a++) {
//    for (b = 0; b < models[a].getElementsByClassName("slidecontainer").length; b++) {
//        models[a].getElementsByClassName("slidecontainer")[b].querySelector("input").addEventListener("input", function () {
//            modelName = this.parentElement.parentElement.querySelector("div").className
//            modelParts = this.parentElement.parentElement.querySelector("div").querySelectorAll("div")
//            if (this.id == "Eye") {
//                modelParts[1].querySelector("img").src = `resources/faces/${modelName}/${modelName}Eye${this.value}.png`
//            }
//            if (this.id == "Mouth") {
//                modelParts[2].querySelector("img").src = `resources/faces/${modelName}/${modelName}Mouth${this.value}.png`
//            }
//            if (this.id == "Face") {
//                modelParts[1].querySelector("img").src = `resources/faces/${modelName}/${modelName}Face${this.value}.png`
//            }
//        }, false)
//    }
//}
//
//
//
//// get the element with the id "spritesheet"
//const spritesheet = document.getElementById("spritesheet");
//// find a slider in the page
//const slider = document.querySelector("input");
//// create a variable for easy reference
//let index;
//// the gap of pixels for each part of the image. automatically set to element's width
//const cellWidth = spritesheet.offsetWidth
//
//slider.addEventListener('input', function () {
//    // index variable will be the slider's value
//    index = slider.value;
//    // now to the advanced part.
//    // when index reaches 6, loop back to 0.
//    // multiply that value negatively by the cell width.
//    spritesheet.style.backgroundPositionX = `${index % 6 * -cellWidth}px`
//    // when index reaches 6, count up by 1.
//    // multiply that value negatively by the cell height. will always be 400 px.
//    spritesheet.style.backgroundPositionY = `${Math.floor(index / 6) * -400}px`
//}, false);