// create scroll-to-top button
const totopElement = document.createElement("div");
totopElement.onclick = function() {window.scrollTo(0,0)};
totopElement.className = "totop";
document.body.appendChild(totopElement);

// check if we're low enough to show the button
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    totopElement.style.display = "block";
  } else {
    totopElement.style.display = "none";
  }
}
