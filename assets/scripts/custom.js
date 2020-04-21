import { getDataFromWp, categoryNews, acfPosts } from "./services/api.js";
import { changeIconColor } from "./functions.js";
// alert("ok");
let pageName = "homepage";
let newsBtn = document.querySelector("#newsBtn");
let allNews = [];
let shownNews = [];

// IMPORTING NEWS ID DATA:
getDataFromWp(acfPosts + "?" + categoryNews)
  .then((json) => {
    console.log("ids:", json);
    return json;
  })
  .then((newsIdData) => {
    allNews = newsIdData;
    let pictureOnRight = false;
    let promiseArray = [];
    allNews.forEach((element, i) => {
      if (i < 2) {
        console.log("element:", element);
        promiseArray.push(loadNewsItem(element, pictureOnRight));
        pictureOnRight = !pictureOnRight;
      }
    });
    Promise.all(promiseArray);
    newsBtn.addEventListener("click", loadMoreNews);
  })
  .catch((e) => {
    console.log(e);
  });

async function loadMoreNews() {
  let pictureOnRight = false;
  const newsLength = shownNews.length;
  let promiseArray = [];
  let buttonToHide = document.getElementById("newsBtn");
  for (let i = newsLength; i < newsLength + 2; i++) {
    if (allNews[i]) {
      promiseArray.push(await loadNewsItem(allNews[i], pictureOnRight));
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
  console.log("received newsItem:", newsItemRaw);
  let shortNewsTemplate = document.getElementById("short-new");
  let shortNewsParent = document.getElementById("news-parent");

  let clonedNewsItem = shortNewsTemplate.content.cloneNode(true);
  let newsImageTag = clonedNewsItem.querySelector("#news-image");
  newsImageTag.src = newsItem.newsImage;
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

// function fetchNewsItem(newsId) {
//   return fetch("./assets/json/news_data.json")
//     .then((response) => response.json())
//     .then((allNewsData) => allNewsData.news.find((newsItem) => newsItem.id == newsId))
//     .then((newsItem) => {
//       return newsItem;
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }

// function loadNews(newsData) {
//   console.log(newsData);
//   // CLONE SHORT NEWS TEMPLATE:

//   shortNewsParent.textContent = "";
//   newsData.news.forEach((newsItem, i) => {
//     let cloneNews = shortNewsTemplate.content.cloneNode(true);
//     let newsImageTag = cloneNews.getElementById("news-image");
//     newsImageTag.src = newsItem.newsImage;
//     let anchorTag = cloneNews.querySelector(".anchor-tag");
//     let newsLink = newsItem.linkToNewsPage + "?id=" + newsItem.id;
//     anchorTag.href = newsLink;
//     let newTitle = cloneNews.querySelector(".unic-news-title");
//     newTitle.textContent = newsItem.newsTitle;
//     let shortNewsParagraph = cloneNews.querySelector(".short-paragraph");
//     shortNewsParagraph.textContent = newsItem.shortNewstext;
//     let buttonMore = cloneNews.querySelector(".btn-translate-more");
//     buttonMore.onclick = function () {
//       window.location.href = newsLink;
//     };
//     // changing inner div's order:
//     console.log(i);
//     let order2 = cloneNews.querySelector(".dummy-class-1");
//     let order1 = cloneNews.querySelector(".dummy-class-2");
//     if (i % 2 == 1) {
//       order2.classList.add("order-lg-2");
//       order1.classList.add("order-lg-1");
//     }
//     if (i > 1) {
//       cloneNews.querySelector(".row").classList.add("not-show");
//     }
//     shortNewsParent.appendChild(cloneNews);
//   });
// }

let mapIcon = document.querySelector("#map-icon img");
changeIconColor(mapIcon);
