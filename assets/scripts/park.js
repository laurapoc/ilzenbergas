let pageName = "park";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");
// IMPORTING park templ1
// importTemplate("./park_templ1.html", "#park-templ1", "./assets/scripts/park_templ1.js");

// IMPORTING park templ2
importTemplate("./park_templ2.html", "#park-templ2", "./assets/scripts/park_templ2.js");


// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);


// CHANGING PARK PAGE TEMPLATE
// 1. detect selected menu item
// 2. asign id template name
// 3. asign template to park's page

// let menuItem = document.querySelector("#selected-menu-item");
// console.log(menuItem);

