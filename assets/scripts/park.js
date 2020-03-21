let pageName = "park";

let templateToLoad = "basis_templ1";
let selectedMenuItem = "a";
let parkMenuItems = [];
let subTemplateData = {};

// IMPORTING TEMPLATES:
fetch("./assets/json/sidebar_data.json")
  .then(response => response.json())
  .then(sidebarData => {
    console.log(sidebarData);
    // clone template to create menu item
    parkMenuItems = sidebarData.parkMenuItems;

    // IMPORTING MAIN MENU
    importTemplate("./header.html", "#header", "./assets/scripts/header.js");

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "#sidebar", "./assets/scripts/sidebar.js");

    // IMPORTING ONE OF PARK TEMPLATES
    subTemplateData = sidebarData.parkMenuItems[0];
    importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");
    //loadBasisTempl1(sidebarData);
  })
  .catch(e => {
    console.log(e);
  });

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

  subTemplateData = sidebarData.parkMenuItems.find(element => element.id == menuId);
  importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");
}
