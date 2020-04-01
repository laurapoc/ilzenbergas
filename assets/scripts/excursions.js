let pageName = "excursions";

let templateToLoad = "basis_templ1";
let selectedMenuItem = "a";
let parkMenuItems = [];
let subTemplateData = {};
// let sidebarData = {};
let gallerySource = [];

// IMPORTING TEMPLATES:
fetch("./assets/json/sidebar_data.json")
  .then(response => response.json())
  .then(sidebarData => {
    // clone template to create menu item
    parkMenuItems = sidebarData.parkMenuItems;
    sidebarData =  sidebarData.parkMenuItems;
    // IMPORTING MAIN MENU
    importTemplate("./header.html", "#header", "./assets/scripts/header.js");

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "#sidebar", "./assets/scripts/sidebar.js");

    // IMPORTING ONE OF PARK TEMPLATES
    subTemplateData = parkMenuItems[0];
    importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");
    //loadBasisTempl1(sidebarData);
  })
  .catch(e => {
    console.log(e);
  });

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

