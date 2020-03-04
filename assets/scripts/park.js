let pageName = "park";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");
// IMPORTING park templ1
importTemplate("./park_templ1.html", "#park-templ1", "./assets/scripts/park_templ1.js");

// IMPORTING GALLERY
importTemplate("./gallery.html", "#gallery", "./assets/scripts/gallery.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);
