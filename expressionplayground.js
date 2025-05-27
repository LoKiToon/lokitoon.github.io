// import json from characters.js
const charactersJSON = JSON.parse(chaJSONdata);
const charaDdElement = document.getElementById("characterDropdown");
const charaSliders = document.getElementById("characterSliders");

const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

// init canvas
canvasElement.width = 512;
canvasElement.height = 512;

function loadCharacter(chaIndex) {
  charaSliders.innerHTML = "";
  // load sliders
  
  const eyeLabel = document.createElement("span");
  eyeLabel.innerText = "Eye Control";
  charaSliders.appendChild(eyeLabel);
  
  const l_EyeSlider = document.createElement("input");
  l_EyeSlider.type = "range";
  l_EyeSlider.value = 0;
  l_EyeSlider.max = charactersJSON.characters[chaIndex].chaEyeDiv - 1;
  l_EyeSlider.oninput = function() { changeEyeExpression(chaIndex, this.value); };
  charaSliders.appendChild(l_EyeSlider);
  
  const mouthLabel = document.createElement("span");
  mouthLabel.innerText = "Mouth Control";
  charaSliders.appendChild(mouthLabel);
  
  const mouthSlider = document.createElement("input");
  mouthSlider.type = "range";
  mouthSlider.value = 0;
  mouthSlider.max = charactersJSON.characters[chaIndex].chaMouthDiv - 1;
  mouthSlider.oninput = function() { changeMouthExpression(chaIndex, this.value); };
  charaSliders.appendChild(mouthSlider);
  
  // show character
  ctx.clearRect(0, 0, 512, 512);
  const mainImg = new Image(512, 512);
  mainImg.src = `resources/faces/${charactersJSON.characters[chaIndex].chaName}/Main.png`;
  mainImg.addEventListener("load", (e) => {
    ctx.drawImage(mainImg, 0, 0);
  });
}

function changeEyeExpression(chaIndex, leftEyeIndex, rightEyeIndex) {
  const chaData = charactersJSON.characters[chaIndex];
  const chaName = chaData.chaName;
  const chaEyeDiv = chaData.chaEyeDiv;

  // draw eyes
  if (charactersJSON.characters[chaIndex].chaSymmetricalEyes) {
    const eyeImg = new Image();
    eyeImg.src = `resources/faces/${chaName}/EyeSheet.png`;
    eyeImg.addEventListener("load", (e) => {
      // draw the left eye
      ctx.drawImage(
        eyeImg,
        Math.floor(leftEyeIndex * (eyeImg.width / chaEyeDiv)),
        0,
        Math.floor(eyeImg.width / chaEyeDiv),
        eyeImg.height,
        chaData.chaLEyeXOff,
        chaData.chaLEyeYOff,
        Math.floor(eyeImg.width / chaEyeDiv),
        eyeImg.height
      );

      // flip canvas, draw the right eye
      ctx.save();
      ctx.scale(-1, 1);

      ctx.drawImage(
        eyeImg,
        Math.floor(leftEyeIndex * (eyeImg.width / chaEyeDiv)),
        0,
        Math.floor(eyeImg.width / chaData.chaEyeDiv),
        eyeImg.height,
        chaData.chaLEyeXOff - 512,
        chaData.chaLEyeYOff,
        Math.floor(eyeImg.width / chaData.chaEyeDiv),
        eyeImg.height
      );

      ctx.restore();
    });
  } else {
    const leftEyeImg = new Image();
    leftEyeImg.src = `resources/faces/${chaName}/LeftEyeSheet.png`;
    leftEyeImg.addEventListener("load", (e) => {
      // draw the left eye
      ctx.drawImage(
        leftEyeImg,
        Math.floor(leftEyeIndex * (leftEyeImg.width / chaEyeDiv)),
        0,
        Math.floor(leftEyeImg.width / chaEyeDiv),
        leftEyeImg.height,
        chaData.chaLEyeXOff,
        chaData.chaLEyeYOff,
        Math.floor(leftEyeImg.width / chaEyeDiv),
        leftEyeImg.height
      );
    });
    
    const rightEyeImg = new Image();
    rightEyeImg.src = `resources/faces/${chaName}/RightEyeSheet.png`;
    rightEyeImg.addEventListener("load", (e) => {
      // draw the left eye
      ctx.drawImage(
        rightEyeImg,
        Math.floor(rightEyeIndex * (rightEyeImg.width / chaEyeDiv)),
        0,
        Math.floor(rightEyeImg.width / chaEyeDiv),
        rightEyeImg.height,
        chaData.chaREyeXOff,
        chaData.chaREyeYOff,
        Math.floor(rightEyeImg.width / chaEyeDiv),
        rightEyeImg.height
      );
    });
  }
}

function changeMouthExpression(chaIndex, mouthIndex) {
  const chaData = charactersJSON.characters[chaIndex];
  const chaMouthDiv = chaData.chaMouthDiv;

  const mouthImg = new Image();
    mouthImg.src = `resources/faces/${chaData.chaName}/MouthSheet.png`;
    mouthImg.addEventListener("load", (e) => {
      ctx.drawImage(
        mouthImg,
        Math.floor(mouthIndex * (mouthImg.width / chaMouthDiv)),
        0,
        Math.floor(mouthImg.width / chaMouthDiv),
        mouthImg.height,
        chaData.chaMouthXOff,
        chaData.chaMouthYOff,
        Math.floor(mouthImg.width / chaMouthDiv),
        mouthImg.height
      );
    });
}

// load character names from json and add them to the dropdown
for (let i = 0; i < charactersJSON.characters.length; i++) {
  const chaName = charactersJSON.characters[i].chaName;

  const menuElement = document.createElement("div");
  menuElement.innerText = chaName;
  menuElement.onclick = () => loadCharacter(i);
  charaDdElement.appendChild(menuElement);
}

function fltr() {
  const input = document.getElementById("dd-search");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("characterDropdown");
  const a = div.getElementsByTagName("div");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".dd-button") && !event.target.matches("#dd-search")) {
    if (charaDdElement.classList.contains("show")) {
      charaDdElement.classList.toggle("show");
    }
  }
};
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
