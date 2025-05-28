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
  const chaData = charactersJSON.characters[chaIndex];
  let chaEyeDiv, chaMouthDiv;
  // default values
  if (typeof chaData.chaEyeDiv !== 'undefined') { chaEyeDiv = chaData.chaEyeDiv; } else { chaEyeDiv = 8; }
  if (typeof chaData.chaMouthDiv !== 'undefined') { chaMouthDiv = chaData.chaMouthDiv; } else { chaMouthDiv = 8; }
  
  // load sliders
  charaSliders.innerHTML = "";
  
  if (chaData.chaHasEyes) {
    const eyeLabel = document.createElement("span");
    eyeLabel.innerText = "eye control";
    charaSliders.appendChild(eyeLabel);
    
    const eyeSlider = document.createElement("input");
    eyeSlider.type = "range";
    eyeSlider.value = 0;
    eyeSlider.max = chaEyeDiv - 1;
    eyeSlider.oninput = function() { changeEyeExpression(chaIndex, this.value); };
    charaSliders.appendChild(eyeSlider);
  }

  if (chaData.chaHasMouth) {
    const mouthLabel = document.createElement("span");
    mouthLabel.innerText = "mouth control";
    charaSliders.appendChild(mouthLabel);
    
    const mouthSlider = document.createElement("input");
    mouthSlider.type = "range";
    mouthSlider.value = 0;
    mouthSlider.max = chaMouthDiv - 1;
    mouthSlider.oninput = function() { changeMouthExpression(chaIndex, this.value); };
    charaSliders.appendChild(mouthSlider);
  }
  
  // show character
  ctx.clearRect(0, 0, 512, 512);
  const mainImg = new Image(512, 512);
  mainImg.src = `resources/faces/${chaData.chaName}/Main.png`;
  mainImg.onload = function() { ctx.drawImage(mainImg, 0, 0); };
}

function changeEyeExpression(chaIndex, leftEyeIndex, rightEyeIndex) {
  const chaData = charactersJSON.characters[chaIndex];
  const chaName = chaData.chaName;
  let chaEyeDiv, chaSymmetricalEyes;
  // default values
  if (typeof chaData.chaEyeDiv !== 'undefined') { chaEyeDiv = chaData.chaEyeDiv; } else { chaEyeDiv = 8; }
  if (typeof chaData.chaSymmetricalEyes !== 'undefined') { chaSymmetricalEyes = chaData.chaSymmetricalEyes; } else { chaSymmetricalEyes = true; }
  
  // draw eyes
  if (chaSymmetricalEyes) {
    const eyeImg = new Image();
    eyeImg.src = `resources/faces/${chaName}/EyeSheet.png`;
    eyeImg.onload = function() {
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
        Math.floor(eyeImg.width / chaEyeDiv),
        eyeImg.height,
        chaData.chaLEyeXOff - 512,
        chaData.chaLEyeYOff,
        Math.floor(eyeImg.width / chaEyeDiv),
        eyeImg.height
      );

      ctx.restore();
    };
  } else {
    const leftEyeImg = new Image();
    leftEyeImg.src = `resources/faces/${chaName}/LeftEyeSheet.png`;
    leftEyeImg.onload = function() {
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
    };
    
    const rightEyeImg = new Image();
    rightEyeImg.src = `resources/faces/${chaName}/RightEyeSheet.png`;
    rightEyeImg.onload = function() {
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
    };
  }
}

function changeMouthExpression(chaIndex, mouthIndex) {
  const chaData = charactersJSON.characters[chaIndex];
  let chaMouthDiv;
  // default values
  if (typeof chaData.chaMouthDiv !== 'undefined') { chaMouthDiv = chaData.chaMouthDiv; } else { chaMouthDiv = 8; }

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
  menuElement.onclick = function() { loadCharacter(i); };
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
