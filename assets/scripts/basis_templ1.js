/*jshint esversion: 6 */
export function loadBasisTempl1(sidebarData, pageName) {
  // CLONE BASIS_TEMPL1 TEMPLATE:
  let basisTemplate1 = document.getElementById("basis_templ1_template");
  let basisTemplate1Parent = document.getElementById("subtemplate");
  basisTemplate1Parent.textContent = "";
  let cloneTemplate1 = basisTemplate1.content.cloneNode(true);
  let mainTemplate1Heading = cloneTemplate1.querySelector(".main-heading");
  mainTemplate1Heading.innerHTML = sidebarData.mainHeading;
  let template1ContentHeading = cloneTemplate1.querySelector(".page-content-heading");
  template1ContentHeading.innerHTML = sidebarData.pageContentHeading;
  let template1Subheading = cloneTemplate1.querySelector(".subheading");
  template1Subheading.innerHTML = sidebarData.subheading;

  if (sidebarData.t1_paragraphArray) {
    sidebarData.t1_paragraphArray.forEach((element) => {
      let paragraph = document.createElement("p");
      paragraph.innerHTML = element.t1_paragraph;
      let paragraphParent = cloneTemplate1.getElementById("template1-content");
      let masterLogoTag = cloneTemplate1.getElementById("master-logo");
      paragraphParent.insertBefore(paragraph, masterLogoTag);
    });
  }
  if (sidebarData.additionalInfo && sidebarData.additionalPhoto) {
    let additionalInfo = cloneTemplate1.querySelector("#master-logo p");
    additionalInfo.innerHTML = sidebarData.additionalInfo;
    if (pageName == "restaurant") {
      cloneTemplate1.querySelector("#master-logo a").href = sidebarData.imageLink;
      cloneTemplate1.querySelector("#master-logo a").target = "_blank";
    }
    let additionalPhoto = cloneTemplate1.getElementById("additional-photo");
    additionalPhoto.src = sidebarData.additionalPhoto;
    if (pageName == "park" || pageName == "restaurant") {
      additionalPhoto.style = "width: 70%";
    } else {
      additionalPhoto.style = "width: auto";
    }
  } else {
    cloneTemplate1.getElementById("template1-content").removeChild(cloneTemplate1.getElementById("master-logo"));
  }

  basisTemplate1Parent.appendChild(cloneTemplate1);
}
