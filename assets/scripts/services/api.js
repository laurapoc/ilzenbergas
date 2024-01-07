/*jshint esversion: 8 */
const wpApiAddress = {
  lt: "https://api.ilzenbergas.lt/wp-json/",
  en: "https://api.ilzenbergas.lt/en/wp-json/",
  lv: "https://api.ilzenbergas.lt/lv/wp-json/",
};
export const acfPosts = "wp/v2/posts";
export const acfNews = "wp/v2/news";
export const acfContacts = "wp/v2/contacts";
export const acfPark = "wp/v2/park";
export const acfEvents = "wp/v2/events";
export const acfExcursions = "wp/v2/excursions";
export const acfTastings = "wp/v2/tastings";
export const acfAccommodation = "wp/v2/accommodation";
export const acfHomepage = "wp/v2/homepage";
export const acfRestaurant = "wp/v2/restaurant";
export const acfPotato = "wp/v2/potato";
export const acfFarm = "wp/v2/farm";
export const acfProducts = "wp/v2/products";
export const acfWater = "wp/v2/water";
export const acfWine = "wp/v2/wine";
export const acfShopping = "wp/v2/shopping";
export const acfAgriculture = "wp/v2/agriculture";
export const acfPrinciples = "wp/v2/principles";
export const acfMaps = "wp/v2/maps";
export const acfEkatamaranas = "wp/v2/ekatamaranas";
export const acfVynas = "wp/v2/vynas";
export const acfActivities = "wp/v2/activities";

export function getDataFromWp(endpoint, props, pagedResults) {
  let lang = sessionStorage.getItem("lang");
  if (!lang) {
    //ilzenbergas.lt/en =>
    let pathnamePieces = window.location.pathname.split("/");
    pathnamePieces.forEach((element) => {
      if (element === "en") {
        lang = "en";
      } else if (element === "lv") {
        lang = "lv";
      }
    });
    lang = lang ? lang : "lt";
    sessionStorage.setItem("lang", lang);
  }
  let finalDestination = wpApiAddress[lang] + endpoint;
  let params = new URLSearchParams();
  if (props) {
    props.forEach((property) => {
      params.append(property.name, property.value);
    });
    finalDestination = finalDestination + "?" + params.toString();
  }

  return fetch(finalDestination).then(async (response) => {
    if (!pagedResults) {
      pagedResults = [];
    }
    let rez = await response.json();
    pagedResults = pagedResults.concat(rez);

    let pages = response.headers.get("X-WP-TotalPages");
    let currentPage = params.get("page") ? params.get("page") : 1;

    if (pages > 1 && currentPage < pages) {
      return getDataFromWp(endpoint, [{ name: "page", value: currentPage + 1 }], pagedResults);
    }
    return pagedResults;
  });
}
