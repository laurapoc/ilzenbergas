/*jshint esversion: 6 */
import { getDataFromWp, acfHomepage, acfNews } from "./services/api.js";
import {
  changeIconColor,
  setImageProperties,
  changeLangValue,
  setupTranslations,
  runTranslationMutation,
  loadCookieBaner,
  importTemplate,
  setupPageHead,
} from "./functions.js";
// alert("ok");
let pageName = "homepage";
let newsBtn = document.querySelector("#newsBtn");
let allNews = [];
let shownNews = [];

// IMPORTING HOMEPAGE DATA
getDataFromWp(acfHomepage)
  .then((homepageData) => {
    loadHomepageMenu(homepageData[0].acf);
    loadAwards(homepageData[0].acf);
    setupPageHead(homepageData[0]);
  })
  .then(() => {})
  .catch((e) => {
    console.log(e);
  });

// IMPORTING NEWS ID DATA:
getDataFromWp(acfNews)
  .then((json) => {
    return json;
  })
  .then((newsIdData) => {
    allNews = newsIdData;
    let pictureOnRight = false;
    allNews.forEach((element, i) => {
      if (i < 2) {
        loadNewsItem(element, pictureOnRight);
        pictureOnRight = !pictureOnRight;
      }
    });
    newsBtn.addEventListener("click", loadMoreNews);
  })
  .then(() => {
    document.querySelectorAll(".card-img").forEach((element) => (element.src += ""));
    document.querySelectorAll(".news-image").forEach((element) => (element.src += ""));
  })
  .catch((e) => {
    console.log(e);
  });

// changing html lang value after flag cklicking:
runTranslationMutation();
changeLangValue();
setupTranslations();

function loadMoreNews() {
  let pictureOnRight = false;
  const newsLength = shownNews.length;
  let promiseArray = [];
  let buttonToHide = document.getElementById("newsBtn");
  for (let i = newsLength; i < newsLength + 2; i++) {
    if (allNews[i]) {
      promiseArray.push(loadNewsItem(allNews[i], pictureOnRight));
      pictureOnRight = !pictureOnRight;
    }
  }
  Promise.all(promiseArray).then(() => {
    if (shownNews.length == allNews.length) {
      buttonToHide.style = "display: none";
    }
  });
}

function loadNewsItem(newsItemRaw, pictureOnRight) {
  //fetch news data by id
  shownNews.push({ newsItemRaw, pictureOnRight });
  const newsItem = newsItemRaw.acf;
  let shortNewsTemplate = document.getElementById("short-new");
  let shortNewsParent = document.getElementById("news-parent");

  let clonedNewsItem = shortNewsTemplate.content.cloneNode(true);
  let newsImageTag = clonedNewsItem.querySelector("#news-image");
  setImageProperties(newsImageTag, newsItem.newsImage);
  let anchorTag = clonedNewsItem.querySelector(".anchor-tag");
  let newsLink = "./news.html?id=" + newsItemRaw.id;
  anchorTag.href = newsLink;
  let newTitle = clonedNewsItem.querySelector(".unic-news-title");
  newTitle.textContent = newsItem.newsTitle;
  let shortNewsParagraph = clonedNewsItem.querySelector(".short-paragraph");
  shortNewsParagraph.innerHTML = newsItem.shortNewstext;
  let buttonMore = clonedNewsItem.querySelector(".btn-translate-more");
  buttonMore.onclick = function () {
    window.location.href = newsLink;
  };
  // changing inner div's order:
  let order2 = clonedNewsItem.querySelector(".dummy-class-1");
  let order1 = clonedNewsItem.querySelector(".dummy-class-2");
  if (pictureOnRight) {
    order2.classList.add("order-lg-2");
    order1.classList.add("order-lg-1");
  }
  shortNewsParent.appendChild(clonedNewsItem);
}

let mapIcon = document.querySelector("#map-icon img");
changeIconColor(mapIcon);

function loadHomepageMenu(homepageData) {
  let template = document.getElementById("homepage-card");
  let parent = document.getElementById("homepage-card-parent");
  parent.textContent = "";
  homepageData.homepageCards.forEach((card) => {
    let clone = template.content.cloneNode(true);
    let imageHedaerLink = clone.getElementById("image-header-link");
    if (imageHedaerLink) {
      imageHedaerLink.href = card.imageHeaderLink;
    }
    setImageProperties(clone.getElementById("homepage-card-image"), card.homepageCardImage);
    let titleHeaderLink = clone.getElementById("title-header-link");
    if (titleHeaderLink) {
      titleHeaderLink.href = card.titleHeaderLink;
    }
    clone.getElementById("header-title").textContent = card.headerTitle;
    let buttonsTemplate = clone.getElementById("header-buttons-template");
    let buttonParent = clone.getElementById("card-header-buttons");
    card.homepageMenuArray.forEach((element) => {
      let clonedButton = buttonsTemplate.content.cloneNode(true);
      clonedButton.getElementById("link-to-page").href = element.linkToPage;
      clonedButton.getElementById("button-image").src = element.buttonImage;
      buttonParent.appendChild(clonedButton);
    });
    // console.log(clone.querySelectorAll("img"));
    // let watchers = [];
    // clone.querySelectorAll("img").forEach(node => {
    //   watchers.push(waitForNode(clone.getElementById("homepage-card-image"), parent.id).then(() => {
    //     node.src += "";
    //   }));
    // });

    parent.appendChild(clone);
    // Promise.all(watchers);
  });
}

function loadAwards(homepageData) {
  let template = document.getElementById("awords-template");
  let parent = document.getElementById("awords-parent");
  parent.textContent = "";
  let clone = template.content.cloneNode(true);
  homepageData.awordsArray.forEach((aword) => {
    clone = template.content.cloneNode(true);
    clone.getElementById("awords-image").src = aword.awordsImage;
    parent.appendChild(clone);
  });
  parent.appendChild(clone);
}


// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// show cookie banner:
loadCookieBaner();
