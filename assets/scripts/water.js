import { importTemplate } from "./functions.js";
import { SideBar } from "./sidebar.js";
import { setupHeader } from "./farm_header.js";

let pageName = "water";

// IMPORTING TEMPLATES:
fetch("./assets/json/water_data.json")
  .then((response) => response.json())
  .then((sidebarData) => {

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "sidebar", null).then(() => {
      new SideBar(sidebarData.sideMenuItems, pageName);
    });

  })
  .catch((e) => {
    console.log(e);
  });

// IMPORTING MAIN MENU
importTemplate("./farm_header.html", "farm_header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);
