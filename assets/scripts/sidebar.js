// alert("this is left side menu");

const parkMenuItems = [
  { text: "500 metų menanti istorija", id: "a" },
  { text: "Parko-muziejaus lankymas", id: "b" },
  { text: "Rūmų interjeras XIX a.", id: "c"},
  { text: "Akmens mūrai  XIX a.", id: "d"},
  { text: "500 metų ąžuolas ILZENBERG", id: "e"},
  { text: "Skulptūrų parkas", id: "f"},
  { text: "Stelmužė ir stelmužiukai", id: "g"},
  { text: "Meilės sala, Meilės tiltas", id: "h"},
  { text: "Kalvystė", id: "i"},
  { text: "Patrankų aikštelė", id: "j"},
  { text: "Parko gyvūnai", id: "k"},
  { text: "Apylinkės. Pėsčiųjų žygiai", id: "l"}
];

let selectedMenuItem = "a";

// changing sidebars menu items
console.log("Page name: ", pageName);
url = pageName;
if (url.includes("park")) {
  // get template
  let template = document.querySelector("#menu-item");
  // get parent - ul
  let parent = document.querySelector("#side-menu");
  // clone template to create menu item
  parkMenuItems.forEach(menuItem => {
    setUpMenuItem(menuItem, template, parent);
  });
}

function setUpMenuItem(menuItem, template, parent) {
  let clone = template.content.cloneNode(true);
  // asign menu item text
  let ancorELement = clone.querySelectorAll("a")[0];
  ancorELement.addEventListener("click", menuItemClick);
  // append child to parent
  ancorELement.textContent = menuItem.text;
  ancorELement.id = menuItem.id;
  parent.appendChild(clone);
  if (menuItem.id == selectedMenuItem) {
    document.querySelector("#selected-menu-item").textContent = menuItem.text;
  }
}

function menuItemClick(event) {
  console.log(event.target.id);
  selectedMenuItem = event.target.id;
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