/*jshint esversion: 6 */
import {
  importTemplate,
  changeLangValue,
  setupTranslations,
  runTranslationMutation,
  showAgeAlertModal,
} from "./functions.js";
import { SideBar } from "./sidebar.js";
import { setupHeader } from "./header.js";
import { getDataFromWp, acfVynas } from "./services/api.js";

let pageName = "vynas";

// IMPORTING TEMPLATES:
getDataFromWp(acfVynas)
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
importTemplate("./header.html", "header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

//SHOW AGE ALERT MODAL
showAgeAlertModal();
