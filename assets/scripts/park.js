let pageName = "park";

let templateToLoad = "basis_templ1";
let selectedMenuItem = "a";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// // IMPORTING LEFT SIDE MENU
importTemplate("./sidebar.html", "#sidebar", "./assets/scripts/sidebar.js");

// IMPORTING ONE OF PARK TEMPLATES
importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");



// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

function loadSelectedTemplate(template, menuId) {
  let previousTemplate = templateToLoad;
  templateToLoad = template;
  selectedMenuItem = menuId;
  let contentLocation = document.querySelector("#" + previousTemplate);
  contentLocation.textContent = "";
  let galleryLocation = document.querySelector("#gallery");
  galleryLocation.textContent = "";
  importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");
}
