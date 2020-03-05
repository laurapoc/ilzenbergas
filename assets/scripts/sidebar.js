// alert("this is left side menu");
// get template
template = document.querySelector("#menu-item");
// get parent - ul
parent = document.querySelector("#side-menu");

// clone template to create menu item
parkMenuItems.forEach(menuItem => {
  setUpMenuItem(menuItem, template, parent);
});



