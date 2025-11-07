// tab gallery
const tabContent = document.getElementsByClassName("tabcontent");
const tabLinks = document.getElementsByClassName("tablinks");

function showArt(evt, groupName) {
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(groupName).style.display = "block";
  evt.currentTarget.className += " active";
}

// image modal
const modalElement = document.getElementById("modal");
const modalImgElement = document.getElementById("modal_img");
const altTxtElement = document.getElementById("alt_txt");

function showVideoModal(e) {
  // disable scroll
  document.body.style.overflow = "hidden";
  
  modalElement.style.display = "flex";
  modalImgElement.style.backgroundImage = "";
  altTxtElement.style.display = "none";

  let video = document.createElement("video");
  video.style = "width: 100%;height: 100%";
  video.controls = true;
  video.autoplay = true;
  video.loop = true;
  video.src = e;
  
  modalElement.appendChild(video);
}

function showImgModal(e) {
  // disable scroll
  document.body.style.overflow = "hidden";
  
  modalElement.style.display = "flex";
  modalImgElement.style.backgroundImage = `url(${e.src})`;
  altTxtElement.innerHTML = e.alt;
  
  // hide alt text if there's none
  e.alt == "" ? altTxtElement.style.display = "none" : altTxtElement.style.removeProperty('display');
}

function hideModal() {
  // enable scroll
  document.body.style.removeProperty('overflow');
  
  // remove video element (if it exists)
  let video = modalElement.querySelector("video");
  if (video !== null) {video.remove()};

  modalElement.style.display = "none";
}
