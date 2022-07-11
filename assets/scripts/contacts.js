/*jshint esversion: 6 */
import { importTemplate, changeLangValue, setupTranslations, runTranslationMutation, setupPageHead } from "./functions.js";
import { setupHeader } from "./header.js";
import { getDataFromWp, acfContacts } from "./services/api.js";

let pageName = "contacts";

// IMPORTING MAIN MENU
importTemplate("./header.html", "header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// IMPORTING CONTACTS DATA
getDataFromWp(acfContacts)
  .then((contactsData) => {
    loadContactsData(contactsData[0].acf);
    loadSheduleHeading(contactsData[0].acf);
    loadShedule(contactsData[0].acf);
    loadAdditionalInfo(contactsData[0].acf);
    setupPageHead(contactsData[0]);
  })
  .catch((e) => {
    console.log(e);
  });

// changing html lang value after flag cklicking:
runTranslationMutation();
changeLangValue();
setupTranslations();

function loadContactsData(contactsData) {
  let clone;
  let template = document.getElementById("contact-page-template");
  let parent = document.getElementById("contact-template-parent");
  parent.textContent = "";
  clone = template.content.cloneNode(true);
  contactsData.contacts.forEach((contact) => {
    clone = template.content.cloneNode(true);
    clone.getElementById("mansion-heading").textContent = contact.contactTitle;
    clone.getElementById("phone-link").href = contact.phoneLink;
    clone.getElementById("phone").textContent = contact.phoneNumber;
    clone.getElementById("email-link").href = contact.mailLink;
    clone.getElementById("mail").textContent = contact.mail;
    clone.getElementById("address").textContent = contact.address;
    clone.getElementById("region").textContent = contact.postCodeRegion;
    if(clone.getElementById("additional-link")) {
      clone.getElementById("additional-link").href = contact.additionalLink;
      clone.getElementById("additional-link").textContent = contact.additionalLinkText;
    }
    
    parent.appendChild(clone);
  });
}

function loadSheduleHeading(contactsData) {
  let sheduleHeading = document.getElementById("shedule-heading");
  sheduleHeading.textContent = contactsData.sheduleHeading;
}

function loadShedule(contactsData) {
  let shedule = contactsData.workTimeArray;
  let sheduleTemplate = document.getElementById("shedule");
  let sheduleTemplateParent = document.getElementById("shedule-template-parent");
  let cloneTemplate = sheduleTemplate.content.cloneNode(true);
  sheduleTemplateParent.textContent = "";
  shedule.forEach((workTime) => {
    cloneTemplate = sheduleTemplate.content.cloneNode(true);
    cloneTemplate.getElementById("season").textContent = workTime.season;
    cloneTemplate.getElementById("working-hours").textContent = workTime.workingHours;
    // changing span string to dots:
    let dotParent = cloneTemplate.getElementById("dot-parent");
    let dotsString = workTime.dotsSpan;
    let dot;
    for (let i = 0; i < dotsString.length; i++) {
      dot = document.createElement("span");
      if (dotsString[i] == 0) {
        dot.classList.add("not-work");
      } else {
        dot.classList.add("work");
      }
      dotParent.appendChild(dot);
    }

    sheduleTemplateParent.appendChild(cloneTemplate);
  });
}

function loadAdditionalInfo(contactsData) {
  document.getElementById("info").innerHTML = contactsData.additionalInfo;
}
