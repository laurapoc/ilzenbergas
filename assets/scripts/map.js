import { importTemplate } from "./functions.js";
import { setupHeader } from "./header.js";

let pageName = "map";

// IMPORTING MAIN MENU
importTemplate("./header.html", "header", null).then(() => {
    setupHeader(pageName);
  });

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);