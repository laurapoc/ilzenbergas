// alert("this is left side menu");
// get template
let template = document.querySelector("#menu-item");
// get parent - ul
let parent = document.querySelector("#side-menu");


  parkMenuItems.forEach(menuItem => {
    setUpMenuItem(menuItem, template, parent);
  });

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
  selectedMenuItem = event.target.id;
  selectedTemplate = event.target.data.templateToUse;
  gallerySource = [];
  refreshMenuItems();
  loadSelectedTemplate(selectedTemplate, selectedMenuItem);
}

function loadSelectedTemplate(template, menuId) {
  let previousTemplate = templateToLoad;
  templateToLoad = template;
  selectedMenuItem = menuId;
  let contentLocation = document.querySelector("#" + previousTemplate);
  contentLocation.textContent = "";
  let galleryLocation = document.querySelector("#gallery");
  galleryLocation.textContent = "";

  subTemplateData = parkMenuItems.find(element => element.id == menuId);
  importTemplate("./" + templateToLoad + ".html", "#" + templateToLoad, "./assets/scripts/" + templateToLoad + ".js");
}

