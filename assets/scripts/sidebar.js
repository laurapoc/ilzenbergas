// alert("this is left side menu");
import { loadBasisTempl1 } from "./basis_templ1.js";
import { loadBasisTempl2 } from "./basis_templ2.js";
import { loadBasisTempl3 } from "./basis_templ3.js";
import { importTemplate } from "./functions.js";
import { loadGalleryContent } from "./gallery.js";

export class SideBar {
  sideBarData = [];
  selectedItem = {};
  templates = [
    { name: "basis_templ1", loader: loadBasisTempl1 },
    { name: "basis_templ2", loader: loadBasisTempl2 },
    { name: "basis_templ3", loader: loadBasisTempl3 },
  ];
  pageName = "";

  constructor(sideBarData, pageName) {
    console.log("Constructing sidebar:", sideBarData);
    this.sideBarData = sideBarData;
    if(this.sideBarData.length == 1) {
      document.getElementById("sidebar").classList.add("hidden");
    }
    this.selectedItem = sideBarData[0];
    this.pageName = pageName;

    let templatesToLoad = [];
    this.templates.forEach((template) =>
      templatesToLoad.push(
        importTemplate("./" + template.name + ".html", template.name, null)
      )
    );
    templatesToLoad.push(importTemplate("./gallery.html", "gallery", null));
    

    Promise.all(templatesToLoad).then(() => {
      // get template
      let template = document.querySelector("#menu-item");
      // get parent - ul
      let parent = document.querySelector("#side-menu");
      this.sideBarData.forEach((menuItem) => {
        this.setUpMenuItem(menuItem, template, parent, this.selectedItem);
      });
      this.loadSelectedTemplate(this.selectedItem);
    });
  }

  setUpMenuItem(menuItem, template, parent, selectedItem) {
    let clone = template.content.cloneNode(true);
    // asign menu item text
    let ancorELement = clone.querySelectorAll("a")[0];
    let sidebarInstance = this;
    ancorELement.addEventListener("click", (event) => sidebarInstance.menuItemClick(event, sidebarInstance));
    // append child to parent
    ancorELement.textContent = menuItem.text;
    ancorELement.id = menuItem.id;
    ancorELement.data = menuItem;
    if (menuItem.id == selectedItem.id) {
      ancorELement.classList.add("active");
      document.querySelector("#selected-menu-item").textContent = menuItem.text;
    }
    parent.appendChild(clone);
  }

  menuItemClick(event, sidebarInstance) {
    console.log("clicked on: ", event.target.data);
    if (event.target.data.href) {
      window.location = event.target.data.href;
    } else {
      sidebarInstance.selectedItem = event.target.data;
      sidebarInstance.refreshMenuItems(sidebarInstance);
      sidebarInstance.loadSelectedTemplate(event.target.data);
    }
  }

  //load template based on menuItemData
  loadSelectedTemplate(menuItemData) {
    //Cleanup existing content
    let contentLocation = document.querySelector("#subtemplate");
    contentLocation.textContent = "";

    this.templates.forEach((template) => {
      if (template.name == menuItemData.templateToUse) {
        template.loader(menuItemData, this.pageName);
      }
    });
    //load gallery if its defined
    if (menuItemData.photoGallery){
      console.log("loading gallery", menuItemData.photoGallery);
      loadGalleryContent(menuItemData.photoGallery);
    }
  }

  refreshMenuItems(sidebarInstance) {
    sidebarInstance.sideBarData.forEach((menuItem) => {
      let ancorELement = document.querySelector("#" + menuItem.id);
      // if selected menu item
      if (sidebarInstance.selectedItem.id == menuItem.id) {
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
}
