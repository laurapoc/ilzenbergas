import { importTemplate } from "./functions.js";
import { setupHeader } from "./farm_header.js";

let pageName = "contacts";

// IMPORTING MAIN MENU
importTemplate("./farm_header.html", "farm_header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// IMPORTING CONTACTS DATA
fetch("./assets/json/contacts_data.json")
  .then(response => response.json())
  .then(contactsData => {
    loadContactsData(contactsData);
    loadSheduleHeading(contactsData);
    loadShedule(contactsData);
    loadAdditionalInfo(contactsData);
  })
  .catch(e => {
    console.log(e);
  });

function loadContactsData(contactsData) {
  let clone;
  let template = document.getElementById("contact-page-template");
  let parent = document.getElementById("contact-template-parent");
  parent.textContent = "";
  clone = template.content.cloneNode(true);
  contactsData.contacts.forEach(contact => {
    clone = template.content.cloneNode(true);
    clone.getElementById("mansion-heading").textContent = contact.title;
    clone.getElementById("phone-link").href = contact.phoneLink;
    clone.getElementById("phone").textContent = contact.phoneNumber;
    clone.getElementById("email-link").href = contact.mailLink;
    clone.getElementById("mail").textContent = contact.mail;
    clone.getElementById("address").textContent = contact.address;
    clone.getElementById("region").textContent = contact.postCodeRegion;
    parent.appendChild(clone);
  });
}

function loadSheduleHeading(contactsData) {
  let sheduleHeading = document.getElementById("shedule-heading");
  sheduleHeading.textContent = contactsData.workSchedule.heading;
}

function loadShedule(contactsData) {
  let shedule = contactsData.workSchedule;
  let sheduleTemplate = document.getElementById("shedule");
  let sheduleTemplateParent = document.getElementById("shedule-template-parent");
  let cloneTemplate = sheduleTemplate.content.cloneNode(true);
  sheduleTemplateParent.textContent = "";
  shedule.workTimeArray.forEach(workTime => {
    cloneTemplate = sheduleTemplate.content.cloneNode(true);
    cloneTemplate.getElementById("season").textContent = workTime.season;
    cloneTemplate.getElementById("working-hours").textContent = workTime.workingHours;
    // changing span string to dots:
    let dotParent = cloneTemplate.getElementById("dot-parent");
    let dotsString = workTime.dotsSpan;
    let dot;
    for(let i = 0; i < dotsString.length; i++) {
      dot = document.createElement("span");
      if(dotsString[i] == 0) {
        dot.classList.add("not-work");
      } else {
        dot.classList.add("work");
      }
      dotParent.appendChild(dot);
    }
    
    sheduleTemplateParent.appendChild(cloneTemplate);
  });
  
};

function loadAdditionalInfo(contactsData) {
  document.getElementById("info").textContent = contactsData.workSchedule.additionalInfo;
};