console.log("headers.js starts");
// SHOW NAVBAR DROPDOWN'S MENU
$("div.dropdown li.dropdown").hover(
  function() {
    $(this)
      .find(".dropdown-menu")
      .stop(true, true)
      .delay(200)
      .fadeIn(500);
  },
  function() {
    $(this)
      .find(".dropdown-menu")
      .stop(true, true)
      .delay(200)
      .fadeOut(500);
  }
);

// CHANGE ICONS COLOR ON HOVER
let img = document.querySelectorAll(".nav-link img");

img.forEach(element => {
  element.addEventListener("mousemove", function(event) {
    event.target.src = event.target.src.replace("_grey", "_yelow");
  });
  element.addEventListener("mouseleave", function(event) {
    event.target.src = event.target.src.replace("_yelow", "_grey");
  });
});

// changing header icons color
console.log("Page name: ", pageName);
let url = pageName;
if (url.includes("park")) {
  document.querySelector("#park").src = "assets/img/round_icons/parkas_yelow.png";
}

// hiding menu items after clicking
$('.nav-link').on('click',function() {
  $('.navbar-collapse').collapse('hide');
});