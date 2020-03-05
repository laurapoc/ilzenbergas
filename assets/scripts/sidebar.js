// alert("this is left side menu");

const parkMenuItems = [
  { text: "500 metų menanti istorija", id: "a", templateToUse: "park_templ1" },
  { text: "Parko-muziejaus lankymas", id: "b", templateToUse: "park_templ2" },
  { text: "Rūmų interjeras XIX a.", id: "c", templateToUse: "park_templ3" },
  { text: "Akmens mūrai  XIX a.", id: "d", templateToUse: "park_templ3" },
  { text: "500 metų ąžuolas ILZENBERG", id: "e", templateToUse: "park_templ1" },
  { text: "Skulptūrų parkas", id: "f", templateToUse: "park_templ2" },
  { text: "Stelmužė ir stelmužiukai", id: "g", templateToUse: "park_templ1" },
  { text: "Meilės sala, Meilės tiltas", id: "h", templateToUse: "park_templ3" },
  { text: "Kalvystė", id: "i", templateToUse: "park_templ3" },
  { text: "Patrankų aikštelė", id: "j", templateToUse: "park_templ3" },
  { text: "Parko gyvūnai", id: "k", templateToUse: "park_templ3" },
  { text: "Apylinkės. Pėsčiųjų žygiai", id: "l", templateToUse: "park_templ2" }
];

// changing sidebars menu items
console.log("Page name: ", pageName);
url = pageName;
// get template
let template = document.querySelector("#menu-item");
// get parent - ul
let parent = document.querySelector("#side-menu");
// clone template to create menu item
parkMenuItems.forEach(menuItem => {
  setUpMenuItem(menuItem, template, parent);
});

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
  console.log(event.target.data);
  selectedMenuItem = event.target.id;
  selectedTemplate = event.target.data.templateToUse;
  refreshMenuItems();
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

    // span get new value
  });
}

// hiding menu items after clicking
// $('.nav-link').on('click',function() {
//   $('.navbar-collapse').collapse('hide');
// });
