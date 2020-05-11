/*jshint esversion: 6 */
import { importTemplate, changeLangValue, setupTranslations, runTranslationMutation } from "./functions.js";
import { SideBar } from "./sidebar.js";
import { setupHeader } from "./farm_header.js";
import { getDataFromWp, acfPrinciples } from "./services/api.js";


let pageName = "principles";

// IMPORTING TEMPLATES:
getDataFromWp(acfPrinciples)
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
importTemplate("./farm_header.html", "farm_header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);
