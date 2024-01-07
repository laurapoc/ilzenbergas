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
  imageTag.alt = imageArray.alt;
  setTimeout(() => {
    imageTag.src += "";
  }, 0);
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
      let lang = element.getAttribute("class").split("-")[1];
      sessionStorage.setItem("lang", lang);
      let path = window.location.pathname
        .split("/")
        .filter((value) => value !== "en" && value !== "lv" && value !== "lt")
        .join("/");
      let newLocation = "/" + lang + path;
      console.log(path);
      window.location.assign(newLocation);
    });
  });
}

export function setupTranslations(nodeToCheck) {
  let checkingNode = nodeToCheck ? nodeToCheck : document;
  if (
    checkingNode.nodeType == Node.ELEMENT_NODE ||
    checkingNode.nodeType == Node.DOCUMENT_NODE
  ) {
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
      if (element.tagName == "IMG") {
        element.alt =
          translations[lang][translationClass.replace("trans-", "")];
      } else {
        element.innerText =
          translations[lang][translationClass.replace("trans-", "")];
      }
    }
  }
}

const transLt = {
  news: "Naujienos",
  awards: "Apdovanojimai",
  moreNews: "Daugiau naujienų",
  extendedNew: "Plačiau",
  buy: "PIRKTI",
  moreAboutEvent: "Plačiau",
  lessAboutEvent: "Suskleisti",
  newsPrevious: "Ankstesnis",
  newsNext: "Sekantis",
  cookies:
    "Siekiant geresnių naršymo sąlygų, šioje svetainėje yra naudojami slapukai (angl. cookies).",
  cookiesRead: "Sužinoti daugiau",
  cookieClose: "Supratau",
  eventsTitle: "Ilzenbergo dvaras - Renginiai",
  eventsMetaDescription: "Renginiai Ilzenbergo Dvare",
  eventsKeywords: "Renginiai Šventės Koncertai Parodos",
  mapAlt: "Dvarvietės plano nuoroda",
  contactsAlt: "Kontaktų nuoroda",
  "lt-alt": "Puslapis lietuviškai",
  "lv-alt": "Puslapis latviškai",
  "en-alt": "Puslapis angliškai",
  youtubeAlt: "Nuoroda į youtube",
  facebookAlt: "Nuoroda į facebook",
  parkAlt: "Parko lankymas nuoroda",
  eventsAlt: "Renginiai nuoroda",
  excursionsAlt: "Ekskursijos nuoroda",
  tastingsAlt: "Degustacijos nuoroda",
  accommodationAlt: "Veikla ir nakvynė nuoroda",
  restaurantAlt: "Restoranas nuoroda",
  potatoAlt: "Bulvės muziejus nuoroda",
  campAlt: "Vaikų stovykla nuoroda",
  farmAlt: "Ilzenbergo ūkis nuoroda",
  foodAlt: "100 natūralių produktų nuoroda",
  waterAlt: "Vanduo Ilzenberg nuoroda",
  wineAlt: "Vynuogynas Ilzenberg nuoroda",
  eShopAlt: "e-prekyba nuoroda",
  areasAlt: "Krautuvėlių vietos nuoroda",
  agricultureAlt: "Augalininkystė-gyvulininkystė nuoroda",
  principlesAlt: "10 ūkininkavimo principų nuoroda",
  wine: "Vynas",
  checkAgeText: "Man jau yra 20 metų",
  yes: "Taip",
  no: "Ne",
  eKatamaran: "eKatamaranas",
  activities: "Pramogos",
};
const transEn = {
  news: "News",
  awards: "Awards",
  moreNews: "Load more news",
  extendedNew: "Show more",
  buy: "BUY",
  moreAboutEvent: "Show more",
  lessAboutEvent: "Show less",
  newsPrevious: "Previous",
  newsNext: "Next",
  cookies: "To ensure better browsing experience this website uses cookies.",
  cookiesRead: "Read more",
  cookieClose: "Got it",
  eventsTitle: "Ilzenberg manor - Events",
  eventsMetaDescription: "Events at ilzenberg manor",
  eventsKeywords: "Events Concerts Exhibitions",
  mapAlt: "Manor plan link",
  contactsAlt: "Contact link",
  "lt-alt": "Page in Lithuanian",
  "lv-alt": "Page in Latvian",
  "en-alt": "Page in English",
  youtubeAlt: "Youtube link",
  facebookAlt: "Facebook link",
  parkAlt: "Visiting park link",
  eventsAlt: "Events link",
  excursionsAlt: "Excursions link",
  tastingsAlt: "Tastings link",
  accommodationAlt: "Activities and accommodation link",
  restaurantAlt: "Restaurant link",
  potatoAlt: "Potato museum link",
  campAlt: "Children's camp link",
  farmAlt: "Ilzenberg farm reference",
  foodAlt: "Reference of 100 natural products",
  waterAlt: "Water Ilzenberg reference",
  wineAlt: "Ilzenberg vineyard reference",
  eShopAlt: "e-shop link",
  areasAlt: "Stack location reference",
  agricultureAlt: "Crop and animal production",
  principlesAlt: "10 farming principles reference",
  wine: "Wine",
  checkAgeText: "I am 20 years old",
  yes: "Yes",
  no: "No",
  eKatamaran: "eKatamaran",
  activities: "Entertainment",
};
const transLv = {
  news: "Šviežums",
  awards: "Apbalvojumi",
  moreNews: "Vairāk jaunumu",
  extendedNew: "Rādīt vairāk",
  buy: "PIRKT",
  moreAboutEvent: "Rādīt vairāk",
  lessAboutEvent: "Rādīt mazāk",
  newsPrevious: "Iepriekšējās ziņas",
  newsNext: "Nākamās ziņas",
  cookies:
    "Šī vietne izmanto sīkfailus, lai uzlabotu jūsu pārlūkošanas pieredzi.",
  cookiesRead: "Uzzināt vairāk",
  cookieClose: "Sapratu",
  eventsTitle: "Ilzenbergas muiža - Notikumi",
  eventsMetaDescription: "Notikumi Ilzenbergas muižā",
  eventsKeywords: "Notikumi Svinības Koncerti Izstādes",
  mapAlt: "Muižas plāna atsauce",
  contactsAlt: "Kontaktinformācija",
  "lt-alt": "Vietne lietuviešu valodā",
  "lv-alt": "Vietne latviešu valodā",
  "en-alt": "Vietne angļu valodā",
  youtubeAlt: "Saite uz youtube",
  facebookAlt: "Saite uz facebook",
  parkAlt: "Parka apmeklējuma atsauce",
  eventsAlt: "Notikumu saite",
  excursionsAlt: "Ekskursijas saite",
  tastingsAlt: "Degustācijas saite",
  accommodationAlt: "Aktivitātes un izmitināšanas vietas saite",
  restaurantAlt: "Restorāns saite",
  potatoAlt: "Kartupeļu muzeja saite",
  campAlt: "Bērnu nometnes atsauce",
  farmAlt: "Ilzenbergas saimniecības atsauce",
  foodAlt: "Atsauce uz 100 dabīgiem produktiem",
  waterAlt: "Ūdens Ilzenberga atsauce",
  wineAlt: "Ilzenbergas vīna dārza atsauce",
  eShopAlt: "el. tirdzniecības atsauce",
  areasAlt: "Norāde uz steka atrašanās vietu",
  agricultureAlt: "Augkopība un lopkopība",
  principlesAlt: "Atsauce uz 10 lauksaimniecības principiem",
  wine: "Vīns",
  checkAgeText: "Man ir 20 gadi",
  yes: "Jā",
  no: "Nē",
  eKatamaran: "eKatamarānu",
  activities: "Izklaide",
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

// // assigning page title
export function setupPageHead(pageData) {
  let metaParent = document.querySelector("head");
  if (pageData.title.rendered) {
    let title = document.querySelector("title");
    title.textContent = pageData.title.rendered;
    let metaTitleTag = document.createElement("meta");
    metaTitleTag.setAttribute("property", "og:title");
    metaTitleTag.setAttribute("content", pageData.title.rendered);
    metaParent.appendChild(metaTitleTag);
  } else {
    title.textContent = "ilzenbergas.lt";
  }

  if (pageData.acf && pageData.acf.metaDescription) {
    let metaDescriptionTag = document.createElement("meta");
    metaDescriptionTag.setAttribute("name", "description");
    metaDescriptionTag.setAttribute("content", pageData.acf.metaDescription);
    let metaOgdescriptionTag = document.createElement("meta");
    metaOgdescriptionTag.setAttribute("property", "og:description");
    metaOgdescriptionTag.setAttribute("content", pageData.acf.metaDescription);
    metaParent.appendChild(metaDescriptionTag);
    metaParent.appendChild(metaOgdescriptionTag);
  }
  if (pageData.acf && pageData.acf.keywords) {
    let metaKeywordsTag = document.createElement("meta");
    metaKeywordsTag.setAttribute("name", "keywords");
    metaKeywordsTag.setAttribute("content", pageData.acf.keywords);
    metaParent.appendChild(metaKeywordsTag);
  }
  let metaOgUrlTag = document.createElement("meta");
  metaOgUrlTag.setAttribute("property", "og:url");
  metaOgUrlTag.setAttribute("content", location.href);
  let metaOgImageTag = document.createElement("meta");
  metaOgImageTag.setAttribute("property", "og:image");
  metaOgImageTag.setAttribute("content", "./img/dvaras_original.jpg");
  let metaTwitterCardTag = document.createElement("meta");
  metaTwitterCardTag.setAttribute("name", "twitter:card");
  metaTwitterCardTag.setAttribute("content", "summary_large_image");
  metaParent.appendChild(metaOgUrlTag);
  metaParent.appendChild(metaOgImageTag);
  metaParent.appendChild(metaTwitterCardTag);
}

export const showAgeAlertModal = () => {
  const isAgeValid = sessionStorage.getItem("ageValid");
  if (!isAgeValid) {
    jQuery(function () {
      jQuery("#exampleModalCenter").modal(
        {
          backdrop: "static",
          keyboard: false,
        },
        "show"
      );
    });
  }
  return;
};

export function saveAgeConfirmationToSession() {
  let ageValid = "valid";
  sessionStorage.setItem("ageValid", ageValid);
}
window.saveAgeConfirmationToSession = saveAgeConfirmationToSession;
