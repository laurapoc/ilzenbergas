import { importTemplate, setImageProperties, changeLangValue, setupTranslations, runTranslationMutation } from "./functions.js";
import { setupHeader } from "./farm_header.js";
import { getDataFromWp, acfMaps } from "./services/api.js";

let pageName = "farm_map";

// IMPORTING MAP DATA
getDataFromWp(acfMaps)
.then((mapData) => {
  console.log(mapData);
  loadMapData(mapData[0].acf);
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

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);


function loadMapData(mapData) {
  let clone;
  let template = document.getElementById("map-template");
  let parent = document.getElementById("map-content");
  clone = template.content.cloneNode(true);
  console.log(mapData);
  clone.getElementById("map-heading").textContent = mapData.mapHeading;
  let mapImage = clone.getElementById("map-image");
  console.log(mapData);
  setImageProperties(mapImage, mapData.mapImage);
  clone.getElementById("pdf-link").href = mapData.mapPdfLink;
  clone.getElementById("pdf-link").textContent = mapData.mapPdfLinkText;
  parent.appendChild(clone);  
}