const menuElement = document.getElementById("menu");
const menuButtons = [
  // HREF, Icon, Title
  ["index.html", "resources/Home.svg", "Home"],
  ["portfolio.html", "resources/Folder.svg", "Portfolio"],
  ["fanart.html", "resources/Palette.svg", "Fan Art"],
  ["references.html", "resources/References.svg", "Ref Sheets"],
  ["expressionplayground.html", "resources/Faces.svg", "Playground"],
  ["othersites.html", "resources/Website.svg", "Friends' Sites"],
  ["downloads.html", "resources/Download.svg", "Downloads"]
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

  let label = document.createElement("div")
  label.innerText = menuButtons[i][2]
  link.appendChild(label)
}
