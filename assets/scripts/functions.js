function importTemplate(templateUrl, templateId, jsLocation) {
  // console.log(templateUrl, templateId, jsLocation);
  fetch(templateUrl)
    .then(response => {
      return response.text();
    })
    .then(text => {
      $(templateId).html(text);
    })
    .then(text => {
      if (jsLocation) {
        let newScript = document.createElement("script");
        newScript.src = jsLocation;
        document.body.appendChild(newScript);
      }
    }).catch( e => {
      // console.log(e);
    });
}

// Used in sidebar.js:
const parkMenuItems = [
  { text: "500 metų menanti istorija", id: "a", templateToUse: "basis_templ1" },
  { text: "Parko-muziejaus lankymas", id: "b", templateToUse: "basis_templ2" },
  { text: "Rūmų interjeras XIX a.", id: "c", templateToUse: "basis_templ3" },
  { text: "Akmens mūrai  XIX a.", id: "d", templateToUse: "basis_templ3" },
  { text: "500 metų ąžuolas ILZENBERG", id: "e", templateToUse: "basis_templ1" },
  { text: "Skulptūrų parkas", id: "f", templateToUse: "basis_templ2" },
  { text: "Stelmužė ir stelmužiukai", id: "g", templateToUse: "basis_templ1" },
  { text: "Meilės sala, Meilės tiltas", id: "h", templateToUse: "basis_templ3" },
  { text: "Kalvystė", id: "i", templateToUse: "basis_templ3" },
  { text: "Patrankų aikštelė", id: "j", templateToUse: "basis_templ3" },
  { text: "Parko gyvūnai", id: "k", templateToUse: "basis_templ3" },
  { text: "Apylinkės. Pėsčiųjų žygiai", id: "l", templateToUse: "basis_templ2" }
];

// changing sidebars menu items

// get template
let template = document.querySelector("#menu-item");
// get parent - ul
let parent = document.querySelector("#side-menu");


function setUpMenuItem(menuItem, template, parent) {
  let clone = template.content.cloneNode(true);
  // asign menu item text
  let ancorELement = clone.querySelectorAll("a")[0];
  ancorELement.addEventListener("click", menuItemClick);
  // append child to parent
  ancorELement.textContent = menuItem.text;
  ancorELement.id = menuItem.id;
  ancorELement.data = menuItem;
  parent.appendChild(clone);
  if (menuItem.id == selectedMenuItem) {
    ancorELement.classList.add("active");
    document.querySelector("#selected-menu-item").textContent = menuItem.text;
  }
}

function menuItemClick(event) {
  // console.log(event.target.data);
  selectedMenuItem = event.target.id;
  selectedTemplate = event.target.data.templateToUse;
  refreshMenuItems();
  loadSelectedTemplate(selectedTemplate, selectedMenuItem);
}

function refreshMenuItems() {
  parkMenuItems.forEach(menuItem => {
    let ancorELement = document.querySelector("#" + menuItem.id);
    // if selected menu item
    if (selectedMenuItem == menuItem.id) {
      // class active
      ancorELement.classList.add("active");
      document.querySelector("#selected-menu-item").textContent = menuItem.text;
    }
    // else remove class active
    else {
      ancorELement.classList.remove("active");
    }

  });
}