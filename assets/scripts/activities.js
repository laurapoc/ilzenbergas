/*jshint esversion: 6 */
import { importTemplate, changeLangValue, setupTranslations, runTranslationMutation } from "./functions.js";
import { SideBar } from "./sidebar.js";
import { setupHeader } from "./header.js";
import { getDataFromWp, acfActivities } from "./services/api.js";

let pageName = "activities";

// IMPORTING TEMPLATES:
getDataFromWp(acfActivities)
  .then((sidebarData) => {

    // // IMPORTING LEFT SIDE MENU
    importTemplate("./sidebar.html", "sidebar", null).then(() => {
      new SideBar(sidebarData, pageName);
    });

  })
  .catch((e) => {
    console.log(e);
  });

  
// changing html lang value after flag cklicking:
runTranslationMutation();
changeLangValue();
setupTranslations();

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);
