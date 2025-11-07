const menuElement = document.getElementById("menu");
const menuButtons = [
  // HREF, Icon, Title
  ["index.html", "resources/Home.svg", "Home"],
  ["portfolio.html", "resources/Folder.svg", "Portfolio"],
  ["expressionplayground.html", "resources/Faces.svg", "Expression Playground"],
  ["othersites.html", "resources/Website.svg", "My Friends' Websites"],
  ["fanart.html", "resources/Palette.svg", "Fan-Art"],
  ["downloads.html", "resources/Download.svg", "Public Downloads"]
];

for (let i = 0; i <= menuButtons.length - 1; i++) {
  let link = document.createElement("a")
  link.className = "menubutton"

  // make button inactive on current page
  if (document.URL.includes(menuButtons[i][0])) {
    link.className += " active";
  } else {
    link.href = menuButtons[i][0]
  }

  link.title = menuButtons[i][2]
  link.draggable = false
  menuElement.appendChild(link)
  
  let image = document.createElement("img")
  image.src = menuButtons[i][1]
  image.draggable = false
  link.appendChild(image)
}
