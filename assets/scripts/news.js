let pageName = "news";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");


  // IMPORTING GALLERY
importTemplate("./gallery.html", "#gallery", "./assets/scripts/gallery.js");


  // IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);


  // IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

// photo gallery
// $('[data-fancybox="gallery"]').fancybox({
//   loop: true,
//   animationDuration: 500,
//   protect: true

// });

// CODE TEMPLATE FOR FETCHING FILES:
// fetch("./header.html")
//   .then(response => {
//     return response.text();
//   })
//   .then(data => {
//     document.querySelector("header").innerHTML = data;
//   });
// fetch("./footer.html")
//   .then(response => {
//     return response.text();
//   })
//   .then(data => {
//     document.querySelector("footer").innerHTML = data;
//   });
