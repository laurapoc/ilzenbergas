import { getDataFromWp, acfNews } from "./services/api.js";
import { loadGalleryContent } from "./gallery.js";
import { importTemplate, setImageProperties } from "./functions.js";
sessionStorage.setItem("page", "news");

// IMPORTING MAIN MENU
importTemplate("./header.html", "header", "./assets/scripts/header.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

// IMPORTING NEWS DATA:
let params = new URLSearchParams(document.location.search.substring(1));
let newsId = params.get("id");
getDataFromWp(acfNews + "/" + newsId)
  .then((newsItem) => {
    console.log(newsItem);
    loadExtendedNews(newsItem.acf);

    // IMPORTING GALLERY
    importTemplate("./gallery.html", "gallery", null).then(() => {
      loadGalleryContent(newsItem.acf.photoGallery);
    });

    // BUTTONS "NEXT" AND "PREVIOUS"
    let previousNewButton = document.getElementById("button-prev");
    let nextNewButton = document.getElementById("button-next");
    previousNewButton.onclick = function goToPrevNew() {
      console.log("prev button clicked");
      window.location.href = "./news.html?id=" + 0;
    };

    nextNewButton.onclick = function goToPrevNew() {
      console.log("next button clicked");
      window.location.href = "./news.html?id=" + 1;
    };
  })
  .catch((e) => {
    console.log(e);
  });

function loadExtendedNews(newsData) {
  // CLONE NEWS TEMPLATE:
  let newsTemplate = document.getElementById("extended-news-page");
  let newsParent = document.getElementById("news-page-parent");
  newsParent.textContent = "";
  let clone = newsTemplate.content.cloneNode(true);
  let newsTopImage = clone.getElementById("news-top-image");
  //newsTopImage.src = newsData.newsImage;
  console.log(newsData.newsImage);
  setImageProperties(newsTopImage, newsData.newsImage);
  let articleDate = clone.getElementById("article-date");
  articleDate.textContent = newsData.newArticleDate;
  let articleTitle = clone.getElementById("article-header");
  articleTitle.textContent = newsData.newsTitle;
  let anotation = clone.getElementById("anotation");
  anotation.innerHTML = newsData.shortNewstext;
  let extendedNewContent = clone.getElementById("extended-content-paragraph");
  extendedNewContent.innerHTML = newsData.extendedNewsContent;

  if (newsData.articleParagraphs) {
    newsData.articleParagraphs.forEach((element) => {
      let cloneRepBlock = loadRepeatingParagraphBlock(element);
      let repeatingBlockParent = clone.getElementById("repeating-block-parent");
      repeatingBlockParent.appendChild(cloneRepBlock);
    });
  }


  let readMore = clone.querySelector("#news-link p");
  readMore.textContent = newsData.readMore;
  let readMoreHref = clone.getElementById("original-article-link");
  readMoreHref.href = "./news.html?id=" + newsData.id;
  readMoreHref.textContent = newsData.readMorelinktext;
  newsParent.appendChild(clone);
}

function loadRepeatingParagraphBlock(paragraphData) {
  // CLONE REPEATING NEWS BLOCK TEMPLATE:
  let repeatingBlockTemplate = document.getElementById("repeating-paragraph-block");
  //console.log(repeatingBlockTemplate);
  let cloneRepBlock = repeatingBlockTemplate.content.cloneNode(true);
  let paragraphHeader = cloneRepBlock.querySelector(".paragraph-header");
  paragraphHeader.textContent = paragraphData.paragraphHeader;
  let paragraphText = cloneRepBlock.querySelector(".paragraph-text");
  paragraphText.innerHTML = paragraphData.paragraphText;
  return cloneRepBlock;
}

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
