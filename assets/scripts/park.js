let pageName = "park";

let templateToLoad = "park_templ1";
let selectedMenuItem = "a";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING ONE OF PARK TEMPLATES
importTemplate("./" + templateToLoad + ".html", "#park-content", "./assets/scripts/" + templateToLoad + ".js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

function loadSelectedTemplate(template, menuId) {
  setTimeout(
    () => {
      templateToLoad = template;
      selectedMenuItem = menuId;
      let contentLocation = document.querySelector("#park-content");
      contentLocation.textContent = "";
      importTemplate("./" + templateToLoad + ".html", "#park-content", "./assets/scripts/" + templateToLoad + ".js");
    },
    500
  );
}
