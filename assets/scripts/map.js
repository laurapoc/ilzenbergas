/*jshint esversion: 6 */
import {
  importTemplate,
  setImageProperties,
  changeLangValue,
  setupTranslations,
  runTranslationMutation,
  setupPageHead
} from "./functions.js";
import { setupHeader } from "./header.js";
import { getDataFromWp, acfMaps } from "./services/api.js";

let pageName = "map";

// IMPORTING MAP DATA
getDataFromWp(acfMaps)
  .then((mapData) => {
    loadMapData(mapData[0].acf);
    setupPageHead(mapData[0]);
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

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

function loadMapData(mapData) {
  let clone;
  let template = document.getElementById("map-template");
  let parent = document.getElementById("map-content");
  clone = template.content.cloneNode(true);
  clone.getElementById("map-heading").textContent = mapData.mapHeading;
  let mapImage = clone.getElementById("map-image");
  setImageProperties(mapImage, mapData.mapImage);
  clone.getElementById("pdf-link").href = mapData.mapPdfLink;
  clone.getElementById("pdf-link").textContent = mapData.mapPdfLinkText;
  parent.appendChild(clone);
}
