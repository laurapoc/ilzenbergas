import { importTemplate } from "./functions.js";
import { setupHeader } from "./header.js";
import { getDataFromWp, categoryContacts, acfPosts } from "./services/api.js";


let pageName = "contacts";

// IMPORTING MAIN MENU
importTemplate("./header.html", "header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// IMPORTING CONTACTS DATA
getDataFromWp(acfPosts + "?" + categoryContacts)
.then((contactsData) => {
  console.log(contactsData[0].acf);
  loadContactsData(contactsData[0].acf);
  loadSheduleHeading(contactsData[0].acf);
  loadShedule(contactsData[0].acf);
  loadAdditionalInfo(contactsData[0].acf);
})
.catch((e) => {
  console.log(e);
});



// IMPORTING CONTACTS DATA
// fetch("./assets/json/contacts_data.json")
//   .then(response => response.json())
//   .then(contactsData => {
//     loadContactsData(contactsData);
//     loadSheduleHeading(contactsData);
//     loadShedule(contactsData);
//     loadAdditionalInfo(contactsData);
//   })
//   .catch(e => {
//     console.log(e);
//   });

function loadContactsData(contactsData) {
  let clone;
  let template = document.getElementById("contact-page-template");
  let parent = document.getElementById("contact-template-parent");
  parent.textContent = "";
  clone = template.content.cloneNode(true);
  console.log(contactsData);
  contactsData.contacts.forEach(contact => {
    clone = template.content.cloneNode(true);
    clone.getElementById("mansion-heading").textContent = contact.contactTitle;
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
  sheduleHeading.textContent = contactsData.sheduleHeading;
}

function loadShedule(contactsData) {
  let shedule = contactsData.workTimeArray;
  let sheduleTemplate = document.getElementById("shedule");
  let sheduleTemplateParent = document.getElementById("shedule-template-parent");
  let cloneTemplate = sheduleTemplate.content.cloneNode(true);
  sheduleTemplateParent.textContent = "";
  shedule.forEach(workTime => {
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
  document.getElementById("info").innerHTML = contactsData.additionalInfo;
};

