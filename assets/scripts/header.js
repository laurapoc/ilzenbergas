
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
  changeIconColor(element);
});

// CHANGE ICON'S COLOR ON HOVER

function changeIconColor(htmlElement) {
  htmlElement.addEventListener("mousemove", function(event) {
    event.target.src = event.target.src.replace("_grey", "_yelow");
  });
  htmlElement.addEventListener("mouseleave", function(event) {
    event.target.src = event.target.src.replace("_yelow", "_grey");
  });
}
let mapIcon = document.querySelector("#map-icon img");
changeIconColor(mapIcon);

// changing header icons color
let url = pageName;
if (url.includes("park")) {
  document.querySelector("#park").src = "assets/img/round_icons/parkas_yelow.png";
} else if (url.includes("map")) {
  document.querySelector("#map").src = "assets/img/round_icons/map_yelow.png";
} else if (url.includes("events")) {
  document.querySelector("#events").src = "assets/img/round_icons/renginiai_yelow.png";
} else if (url.includes("excursions")) {
  document.querySelector("#excursions").src = "assets/img/round_icons/ekskursijos_yelow.png";
} else if (url.includes("tastings")) {
  document.querySelector("#tastings").src = "assets/img/round_icons/degustacijos_yelow.png";
}

// hiding menu items after clicking
$(".nav-link").on("click", function() {
  $(".navbar-collapse").collapse("hide");
});
