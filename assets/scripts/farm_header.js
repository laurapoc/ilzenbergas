/*jshint esversion: 6 */
import { changeIconColor, changeLangValue, loadCookieBaner } from "./functions.js";

// changing header icons color
export function setupHeader(pageName) {
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

  // changing html lang value after flag cklicking:
  changeLangValue();

  // CHANGE ICON'S COLOR ON HOVER

  let mapIcon = document.querySelector("#map-icon img");
  changeIconColor(mapIcon);

  pageName = pageName;
  switch (pageName) {
    case "water":
      document.querySelector("#water").src = "assets/img/round_icons/vanduo_yelow.png";
      break;
    case "farm":
      document.querySelector("#open-farm").src = "assets/img/round_icons/ukis_yelow.png";
      break;
    case "food":
      document.querySelector("#natural-food").src = "assets/img/round_icons/produktai_yelow.png";
      break;
    case "wine":
      document.querySelector("#wine").src = "assets/img/round_icons/vynas_yelow.png";
      break;
    case "shoping areas":
      document.querySelector("#shop-areas").src = "assets/img/round_icons/krautuves_yelow.png";
      break;
    case "agriculture":
      document.querySelector("#agriculture").src = "assets/img/round_icons/ukininkyste_yelow.png";
      break;
    case "principles":
      document.querySelector("#principles").src = "assets/img/round_icons/principai1_yelow.png";
      break;
    case "farm_map":
      document.querySelector("#map").src = "assets/img/round_icons/map_yelow.png";
      break;
  }

  // hiding menu items after clicking
  $(".nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // show cookie banner:
  loadCookieBaner();
}
