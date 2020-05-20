/*jshint esversion: 6 */
import { getDataFromWp, acfContacts} from "./services/api.js";

// IMPORTING CONTACTS DATA
getDataFromWp(acfContacts)
  .then((contactsData) => {
    loadFooterContactsData(contactsData[0].acf);
    loadSheduleHeading(contactsData[0].acf);
    loadShedule(contactsData[0].acf);
    loadAdditionalInfo(contactsData[0].acf);
  })
  .catch((e) => {
    console.log(e);
  });


function loadFooterContactsData(contactsData) {
  let clone;
  let template = document.getElementById("contact-page-template");
  let parent = document.getElementById("footer-contact-template-parent");
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
      console.log(clone.getElementById("additional-link").href);
      console.log(clone.getElementById("additional-link").textContent);
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
