/*jshint esversion: 6 */
export const timeout = 1000;

export function importTemplate(templateUrl, templateId, jsLocation) {
  // console.log(templateUrl, templateId, jsLocation);
  return fetch(templateUrl)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      let templateAnchor = document.getElementById(templateId.replace("#", ""));

      let nodesToLoad = [];

      htmlToElements(text).forEach((node) => {
        nodesToLoad.push(waitForNode(node, templateId.replace("#", "")));

        templateAnchor.appendChild(node);
      });

      return Promise.all(nodesToLoad);
    })
    .then((chainedPromise) => {
      if (jsLocation) {
        let newScript = document.createElement("script");
        newScript.type = "module";
        newScript.src = jsLocation;
        document.body.appendChild(newScript);
      }
      return chainedPromise;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function setImageProperties(imageTag, imageArray) {
  //imageTag.src = imageArray.sizes.large;
  // imageTag.removeAttribute("src");
  imageTag.srcset =
    imageArray.sizes.thumbnail +
    " " +
    imageArray.sizes["thumbnail-height"] +
    "w, " +
    imageArray.sizes.medium +
    " " +
    imageArray.sizes["medium-width"] +
    "w, " +
    imageArray.sizes.medium_large +
    " " +
    imageArray.sizes["medium_large-height"] +
    "w, " +
    imageArray.sizes.large +
    " " +
    imageArray.sizes["large-width"] +
    "w";

  imageTag.sizes = " (min-width: 400px) 85vw, (min-width: 800px) 600px, 800px";
}

// CHANGE ICONS COLOR ON HOVER

export function changeIconColor(htmlElement) {
  htmlElement.addEventListener("mousemove", function (event) {
    event.target.src = event.target.src.replace("_grey", "_yelow");
  });
  htmlElement.addEventListener("mouseleave", function (event) {
    event.target.src = event.target.src.replace("_yelow", "_grey");
  });
}

export function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.childNodes;
}

//selector or exact Node to wait for
export function waitForElement(selector, parent) {
  return new Promise(function (resolve, reject) {
    var element = document.querySelector(selector);

    if (element) {
      resolve(element);
      return;
    }

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for (var node of nodes) {
          if (node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });
    parent = parent ? parent : document;
    observer.observe(parent, { childList: true, subtree: true });
    setTimeout(() => {
      reject("Failed to load template" + selector);
    }, timeout);
  });
}

export function waitForNode(node, parent) {
  return new Promise(function (resolve, reject) {
    let parentNode = document.querySelector("#" + parent);
    parentNode = parentNode ? parentNode : document;
    if (parentNode && parentNode.contains(node)) {
      resolve(node);
      return;
    }

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for (var addedNode of nodes) {
          if (addedNode == node) {
            observer.disconnect();
            resolve(node);
            return;
          }
        }
      });
    });

    observer.observe(parentNode, { childList: true, subtree: true });
    setTimeout(() => {
      reject("Stopped waiting for" + node.id + " on parent " + parentNode.id);
    }, timeout);
  });
}

export function runTranslationMutation() {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var nodes = Array.from(mutation.addedNodes);
      for (var addedNode of nodes) {
        setupTranslations(addedNode);
      }
    });
  });
  observer.observe(document, { childList: true, subtree: true });
  setTimeout(() => {
    observer.disconnect();
  }, 10000);
}

// changing html lang value after flag cklicking:

export function changeLangValue() {
  let flag = document.querySelectorAll(".flag img");
  flag.forEach((element) => {
    element.addEventListener("click", () => {
      // htmlLanguage = element.alt;
      sessionStorage.setItem("lang", element.alt);
      location.reload();
    });
  });
}

export function setupTranslations(nodeToCheck) {
  let checkingNode = nodeToCheck ? nodeToCheck : document;
  if (checkingNode.nodeType == Node.ELEMENT_NODE || checkingNode.nodeType == Node.DOCUMENT_NODE) {
    checkingNode.querySelectorAll("[class*='trans-']").forEach((element) => {
      translateElement(element);
    });
  }
}

function translateElement(element) {
  let lang = sessionStorage.getItem("lang");
  lang = lang ? lang : "lt";
  let translationClass;
  if (element && element.classList) {
    element.classList.forEach((className) => {
      if (className.includes("trans-")) {
        translationClass = className;
      }
    });
    if (translationClass) {
      element.innerText = translations[lang][translationClass.replace("trans-", "")];
    }
  }
}

const transLt = {
  news: "Naujienos",
  awards: "Apdovanojimai",
  moreNews: "Daugiau naujienų",
  extendedNew: "Plačiau",
  accommodation: "Ilzenbergas.lt/Jūsų veikla ir nakvynė",
  agriculture: "Ilzenbergas.lt/Augalininkystė, gyvulininkystė",
  contacts: "Ilzenbergas.lt/kontaktai",
  events: "Ilzenbergas.lt/renginiai",
  buy: "PIRKTI",
  moreAboutEvent: "Plačiau",
  lessAboutEvent: "Suskleisti",
  excursions: "Ilzenbergas.lt/ekskursijos",
  farmFood: "Ilzenbergas.lt/100 natūralių maisto produktų",
  map: "Ilzenbergas.lt/planas lankytojams",
  wine: "Ilzenbergas.lt/vynuogynas ILZENBERG",
  farm: "Ilzenbergas.lt/Ilzenbergo ūkis",
  newsPage: "Ilzenbergas.lt/naujienos",
  newsPrevious: "Ankstesnis",
  newsNext: "Sekantis",
  park: "Ilzenbergas.lt/parko lankymas",
  potato: "Ilzenbergas.lt/bulvės muziejus",
  principles: "Ilzenbergas.lt/10 ūkininkavimo principų",
  restaurant: "Ilzenbergas.lt/restoranas",
  shoppingAreas: "Ilzenbergas.lt/krautuvėlių vietos",
  tastings: "Ilzenbergas.lt/degustacijos",
  water: "Ilzenbergas.lt/vanduo",
  cookies: "Siekiant geresnių naršymo sąlygų, šioje svetainėje yra naudojami slapukai (angl. cookies).",
  cookiesRead: "Sužinoti daugiau",
  cookieClose: "Supratau",
};
const transEn = {
  news: "News",
  awards: "Awards",
  moreNews: "Load more news",
  extendedNew: "Show more",
  accommodation: "Ilzenbergas.lt/Activities and accommodation",
  agriculture: "Ilzenbergas.lt/Crop and animal production",
  contacts: "Ilzenbergas.lt/contacts",
  events: "Ilzenbergas.lt/events",
  buy: "BUY",
  moreAboutEvent: "Show more",
  lessAboutEvent: "Show less",
  excursions: "Ilzenbergas.lt/excursions",
  farmFood: "Ilzenbergas.lt/100 natural foods",
  map: "Ilzenbergas.lt/plan for visitors",
  wine: "Ilzenbergas.lt/vineyard ILZENBERG",
  farm: "Ilzenbergas.lt/Ilzenberg farm",
  newsPage: "Ilzenbergas.lt/news",
  newsPrevious: "Previous",
  newsNext: "Next",
  park: "Ilzenbergas.lt/visiting the park",
  potato: "Ilzenbergas.lt/potato museum",
  principles: "Ilzenbergas.lt/10 principles of farming",
  restaurant: "Ilzenbergas.lt/restaurant",
  shoppingAreas: "Ilzenbergas.lt/shop locations",
  tastings: "Ilzenbergas.lt/tastings",
  water: "Ilzenbergas.lt/water",
  cookies: "To ensure better browsing experience this website uses cookies.",
  cookiesRead: "Read more",
  cookieClose: "Got it",
};
const transLv = {
  news: "Šviežums",
  awards: "Apbalvojumi",
  moreNews: "Vairāk jaunumu",
  extendedNew: "Rādīt vairāk",
  accommodation: "Ilzenbergas.lt/Jūsu aktivitātes un izmitināšana",
  agriculture: "Ilzenbergas.lt/Augkopība un lopkopība",
  contacts: "Ilzenbergas.lt/kontaktpersonas",
  events: "Ilzenbergas.lt/notikumi",
  buy: "PIRKT",
  moreAboutEvent: "Rādīt vairāk",
  lessAboutEvent: "Rādīt mazāk",
  excursions: "Ilzenbergas.lt/ekskursijas",
  farmFood: "Ilzenbergas.lt/100 dabiski pārtikas produkti",
  map: "Ilzenbergas.lt/apmeklētāju plāns",
  wine: "Ilzenbergas.lt/vīna dārzs ILZENBERG",
  farm: "Ilzenbergas.lt/Ilzenbergas saimniecība",
  newsPage: "Ilzenbergas.lt/ziņas",
  newsPrevious: "Iepriekšējās ziņas",
  newsNext: "Nākamās ziņas",
  park: "Ilzenbergas.lt/apmeklējot parku",
  potato: "Ilzenbergas.lt/kartupeļu muzejs",
  principles: "Ilzenbergas.lt/10 zemkopības principi",
  restaurant: "Ilzenbergas.lt/restorāns",
  shoppingAreas: "Ilzenbergas.lt/veikalu atrašanās vietas",
  tastings: "Ilzenbergas.lt/degustācijas",
  water: "Ilzenbergas.lt/ūdens",
  cookies: "Šī vietne izmanto sīkfailus, lai uzlabotu jūsu pārlūkošanas pieredzi.",
  cookiesRead: "Uzzināt vairāk",
  cookieClose: "Sapratu",
};

export const translations = {
  lt: transLt,
  en: transEn,
  lv: transLv,
};

// show cookie baner:
export function loadCookieBaner() {
  if (localStorage.getItem("cookieSeen") != "shown") {
    $(".cookie-banner").delay(2000).fadeIn();
    localStorage.setItem("cookieSeen", "shown");
  }
  $(".close").click(function () {
    $(".cookie-banner").fadeOut();
  });
}
