/*jshint esversion: 6 */
import { getDataFromWp, acfNews } from "./services/api.js";
import { loadGalleryContent } from "./gallery.js";
import { setupHeader } from "./header.js";
import {
  importTemplate,
  setImageProperties,
  changeLangValue,
  setupTranslations,
  runTranslationMutation,
  setupPageHead
} from "./functions.js";

let pageName = "news";
// IMPORTING MAIN MENU
importTemplate("./header.html", "header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// IMPORTING NEWS DATA:
let params = new URLSearchParams(document.location.search.substring(1));
let newsId = params.get("id");
getDataFromWp(acfNews + "/" + newsId)
  .then((newsItem) => {
    loadExtendedNews(newsItem);
    setupPageHead(newsItem[0]);

    // IMPORTING GALLERY
    importTemplate("./gallery.html", "gallery", null).then(() => {
      loadGalleryContent(newsItem[0].acf.photoGallery);
    });

    // BUTTONS "NEXT" AND "PREVIOUS"
    getDataFromWp(acfNews).then((newsItems) => {
      setUpNextPrevButtons(newsItems);
    });
  })
  .then(() => {
    document.querySelectorAll(".news-image").forEach((element) => (element.src += ""));
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
  newsItems.forEach((newsItem, i, allItems) => {
    if (newsItem.id == newsId) {
      if (i == 0) {
        previousNewButton.style = "display: none";
      } else {
        previousNewButton.addEventListener("click", () => goToPrevNew(allItems[i - 1].id));
      }
      if (i == allItems.length - 1) {
        nextNewButton.style = "display: none";
      } else {
        nextNewButton.addEventListener("click", () => goToPrevNew(allItems[i + 1].id));
      }
    }
  });
}

function goToPrevNew(id) {
  window.location.href = "./news.html?id=" + id;
}

function loadExtendedNews(newsItem) {
 
  let extendedNewsItem = newsItem[0].acf;

  // CLONE NEWS TEMPLATE:
  let newsTemplate = document.getElementById("extended-news-page");
  let newsParent = document.getElementById("news-page-parent");
  newsParent.textContent = "";
  let clone = newsTemplate.content.cloneNode(true);
  let newsTopImage = clone.getElementById("news-top-image");
  setImageProperties(newsTopImage, extendedNewsItem.newsImage);
  let articleDate = clone.getElementById("article-date");
  articleDate.textContent = extendedNewsItem.newArticleDate;
  let articleTitle = clone.getElementById("article-header");
  articleTitle.textContent = extendedNewsItem.newsTitle;
  let anotation = clone.getElementById("anotation");
  anotation.innerHTML = extendedNewsItem.shortNewstext;
  let extendedNewContent = clone.getElementById("extended-content-paragraph");
  extendedNewContent.innerHTML = extendedNewsItem.extendedNewsContent;

  if (extendedNewsItem.articleParagraphs) {
    extendedNewsItem.articleParagraphs.forEach((element) => {
      let cloneRepBlock = loadRepeatingParagraphBlock(element);
      let repeatingBlockParent = clone.getElementById("repeating-block-parent");
      repeatingBlockParent.appendChild(cloneRepBlock);
    });
  }
  extendedNewContent.querySelectorAll("img").forEach(element => {
    
    if (element.classList.contains("alignleft")) {
      element.style = "float: left";
    } else if (element.classList.contains("alignright")) {
      element.style = "float: right";
    } else if (element.classList.contains("aligncenter")) {
      element.style = "float: left";
    }
  });
  let readMore = clone.querySelector("#news-link p");
  readMore.textContent = extendedNewsItem.readMore;
  let readMoreHref = clone.getElementById("original-article-link");
  readMoreHref.href = extendedNewsItem.readMoreLink;
  readMoreHref.textContent = extendedNewsItem.readMorelinktext;
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
