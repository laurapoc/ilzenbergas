import { changeIconColor, changeLangValue } from "./functions.js";

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
    case "park":
      document.querySelector("#park").src = "assets/img/round_icons/parkas_yelow.png";
      break;
    case "map":
      document.querySelector("#map").src = "assets/img/round_icons/map_yelow.png";
      break;
    case "events":
      document.querySelector("#events").src = "assets/img/round_icons/renginiai_yelow.png";
      break;
    case "excursions":
      document.querySelector("#excursions").src = "assets/img/round_icons/ekskursijos_yelow.png";
      break;
    case "tastings":
      document.querySelector("#tastings").src = "assets/img/round_icons/degustacijos_yelow.png";
      break;
    case "restaurant":
      document.querySelector("#restaurant").src = "assets/img/round_icons/restoranas_yelow.png";
      break;
    case "accommodation":
      document.querySelector("#accommodation").src = "assets/img/round_icons/nakvyne_yelow.png";
      break;
    case "potato":
      document.querySelector("#potato").src = "assets/img/round_icons/potato_yelow.png";
      break;
  }

  // hiding menu items after clicking
  $(".nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
}
