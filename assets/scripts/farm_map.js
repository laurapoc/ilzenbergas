import { importTemplate } from "./functions.js";
import { setupHeader } from "./farm_header.js";

let pageName = "farm_map";

// IMPORTING MAIN MENU
importTemplate("./farm_header.html", "farm_header", null).then(() => {
    setupHeader(pageName);
  });

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);