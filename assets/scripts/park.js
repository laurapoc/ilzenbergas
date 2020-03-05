let pageName = "park";

let templateToLoad = "park_templ2";
let selectedMenuItem = "a";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING park templ1
// importTemplate("./park_templ1.html", "#park_templ1", "./assets/scripts/park_templ1.js");

// IMPORTING park templ2
// importTemplate("./park_templ2.html", "#park_templ2", "./assets/scripts/park_templ2.js");
importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");

// IMPORTING park templ3
// importTemplate("./park_templ3.html", "#park_templ3", "./assets/scripts/park_templ3.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);
