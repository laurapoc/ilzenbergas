let pageName = "accommodation";

let templateToLoad = "basis_templ1";
let selectedMenuItem = "a";
let sideMenuItems = [];
let subTemplateData = {};
// let sidebarData = {};
let gallerySource = [];

// IMPORTING TEMPLATES:
fetch("./assets/json/accommodation_data.json")
  .then(response => response.json())
  .then(sidebarData => {
    console.log("accommodation data");
    // clone template to create menu item
    sideMenuItems = sidebarData.sideMenuItems;
    sidebarData =  sidebarData.sideMenuItems;
    // IMPORTING MAIN MENU
    importTemplate("./header.html", "#header", "./assets/scripts/header.js");

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "#sidebar", "./assets/scripts/sidebar.js");

    // IMPORTING ONE OF PARK TEMPLATES
    subTemplateData = sideMenuItems[0];
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
