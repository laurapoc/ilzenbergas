import { getDataFromWp, acfNews } from "./services/api.js";
import { loadGalleryContent } from "./gallery.js";
import { setupHeader } from "./header.js";
import {
  importTemplate,
  setImageProperties,
  changeLangValue,
  setupTranslations,
  runTranslationMutation } from "./functions.js";

sessionStorage.setItem("page", "news");

let pageName = "news";
// IMPORTING MAIN MENU
importTemplate("./header.html", "header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

// IMPORTING NEWS DATA:
let params = new URLSearchParams(document.location.search.substring(1));
let newsId = params.get("id");
getDataFromWp(acfNews + "/" + newsId)
  .then((newsItem) => {
    loadExtendedNews(newsItem);


    // IMPORTING GALLERY
    importTemplate("./gallery.html", "gallery", null).then(() => {
      loadGalleryContent(newsItem[0].acf.photoGallery);
    });

    // BUTTONS "NEXT" AND "PREVIOUS"
    getDataFromWp(acfNews).then((newsItems) => {
      setUpNextPrevButtons(newsItems);
    });
  })
  .catch((e) => {
    console.log(e);
  });

// changing html lang value after flag cklicking:
runTranslationMutation();
changeLangValue();
setupTranslations();

function setUpNextPrevButtons(newsItems) {
  let previousNewButton = document.getElementById("button-prev");
  let nextNewButton = document.getElementById("button-next");
  for (let i = 0; i < newsItems.length; i++) {
    if (newsItems[i].id == newsId) {
      if (i == 0) {
        previousNewButton.style = "display: none";
      } else {
        previousNewButton.onclick = function goToPrevNew() {
          window.location.href = "./news.html?id=" + newsItems[i - 1].id;
        };
      }
      if (i == newsItems.length - 1) {
        nextNewButton.style = "display: none";
      } else {
        nextNewButton.onclick = function goToPrevNew() {
          window.location.href = "./news.html?id=" + newsItems[i + 1].id;
        };
      }
    }
  }
}

function loadExtendedNews(newsItem) {
  let ExtendednewsItem = newsItem[0].acf;
  // CLONE NEWS TEMPLATE:
  let newsTemplate = document.getElementById("extended-news-page");
  let newsParent = document.getElementById("news-page-parent");
  newsParent.textContent = "";
  let clone = newsTemplate.content.cloneNode(true);
  let newsTopImage = clone.getElementById("news-top-image");
  setImageProperties(newsTopImage, ExtendednewsItem.newsImage);
  let articleDate = clone.getElementById("article-date");
  articleDate.textContent = ExtendednewsItem.newArticleDate;
  let articleTitle = clone.getElementById("article-header");
  articleTitle.textContent = ExtendednewsItem.newsTitle;
  let anotation = clone.getElementById("anotation");
  anotation.innerHTML = ExtendednewsItem.shortNewstext;
  let extendedNewContent = clone.getElementById("extended-content-paragraph");
  extendedNewContent.innerHTML = ExtendednewsItem.extendedNewsContent;

  if (ExtendednewsItem.articleParagraphs) {
    ExtendednewsItem.articleParagraphs.forEach((element) => {
      let cloneRepBlock = loadRepeatingParagraphBlock(element);
      let repeatingBlockParent = clone.getElementById("repeating-block-parent");
      repeatingBlockParent.appendChild(cloneRepBlock);
    });
  }

  let readMore = clone.querySelector("#news-link p");
  readMore.textContent = ExtendednewsItem.readMore;
  let readMoreHref = clone.getElementById("original-article-link");
  readMoreHref.href = "./news.html?id=" + ExtendednewsItem.id;
  readMoreHref.textContent = ExtendednewsItem.readMorelinktext;
  newsParent.appendChild(clone);
}

function loadRepeatingParagraphBlock(paragraphData) {
  // CLONE REPEATING NEWS BLOCK TEMPLATE:
  let repeatingBlockTemplate = document.getElementById("repeating-paragraph-block");
  let cloneRepBlock = repeatingBlockTemplate.content.cloneNode(true);
  let paragraphHeader = cloneRepBlock.querySelector(".paragraph-header");
  paragraphHeader.textContent = paragraphData.paragraphHeader;
  let paragraphText = cloneRepBlock.querySelector(".paragraph-text");
  paragraphText.innerHTML = paragraphData.paragraphText;
  return cloneRepBlock;
}
