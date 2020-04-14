// SHOW NAVBAR DROPDOWN'S MENU
$("div.dropdown li.dropdown").hover(
  function () {
    $(this).find(".dropdown-menu").stop(true, true).delay(200).fadeIn(500);
  },
  function () {
    $(this).find(".dropdown-menu").stop(true, true).delay(200).fadeOut(500);
  }
);

// CHANGE ICONS COLOR ON HOVER
let img = document.querySelectorAll(".nav-link img");
img.forEach((element) => {
  changeIconColor(element);
});

// CHANGE ICON'S COLOR ON HOVER

let mapIcon = document.querySelector("#map-icon img");
changeIconColor(mapIcon);

// changing header icons color
let url = pageName;
if (url.includes("water")) {
  document.querySelector("#water").src = "assets/img/round_icons/vanduo_yelow.png";
} else if (url.includes("map")) {
  document.querySelector("#map").src = "assets/img/round_icons/map_yelow.png";
} else if (url.includes("events")) {
  document.querySelector("#events").src = "assets/img/round_icons/renginiai_yelow.png";
} else if (url.includes("excursions")) {
  document.querySelector("#excursions").src = "assets/img/round_icons/ekskursijos_yelow.png";
} else if (url.includes("tastings")) {
  document.querySelector("#tastings").src = "assets/img/round_icons/degustacijos_yelow.png";
} else if (url.includes("restaurant")) {
  document.querySelector("#restaurant").src = "assets/img/round_icons/restoranas_yelow.png";
} else if (url.includes("accommodation")) {
  document.querySelector("#accommodation").src = "assets/img/round_icons/nakvyne_yelow.png";
} else if (url.includes("potato")) {
  document.querySelector("#potato").src = "assets/img/round_icons/potato_yelow.png";
} else if (url.includes("farm")) {
  document.querySelector("#open-farm").src = "assets/img/round_icons/ukis_yelow.png";
} else if (url.includes("food")) {
  document.querySelector("#natural-food").src = "assets/img/round_icons/produktai_yelow.png";
} else if (url.includes("wine")) {
  document.querySelector("#wine").src = "assets/img/round_icons/vynas_yelow.png";
} else if (url.includes("shoping")) {
  document.querySelector("#shop-areas").src = "assets/img/round_icons/krautuves_yelow.png";
} else if (url.includes("agriculture")) {
  document.querySelector("#agriculture").src = "assets/img/round_icons/ukininkyste_yelow.png";
} else if (url.includes("principles")) {
  document.querySelector("#principles").src = "assets/img/round_icons/principai1_yelow.png";
}

// hiding menu items after clicking
$(".nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});
