import { importTemplate } from "./functions.js";
import { SideBar } from "./sidebar.js";
import { setupHeader } from "./header.js";

let pageName = "park";

// IMPORTING TEMPLATES:
fetch("./assets/json/park_data.json")
  .then((response) => response.json())
  .then((sidebarData) => {

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "sidebar", null).then(() => {
      new SideBar(sidebarData.sideMenuItems);
    });

  })
  .catch((e) => {
    console.log(e);
  });

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);
