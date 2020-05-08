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

      if (templateId[0] == "#") {
        console.warn("!!!!!!!!!!!!!!!!!!!!!!!please remove # from template ID " + templateId);
      }

      return Promise.all(nodesToLoad);
    })
    .then((templateAnchor) => {
      if (jsLocation) {
        let newScript = document.createElement("script");
        newScript.type = "module";
        newScript.src = jsLocation;
        document.body.appendChild(newScript);
      }
      return templateAnchor;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function setImageProperties(imageTag, imageArray) {
  imageTag.src = imageArray.sizes.thumbnail;
  imageTag.srcset =
    imageArray.sizes.medium +
    " " +
    imageArray.sizes["medium-width"] +
    "w," +
    imageArray.sizes.large +
    " " +
    imageArray.sizes["large-width"] +
    "w";
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

function htmlToElements(html) {
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
    parentNode = parentNode ? parentNode : document;
    observer.observe(parentNode, { childList: true, subtree: true });
    setTimeout(() => {
      reject("Failed to load template" + node);
    }, timeout);
  });
}

// changing html lang value after flag cklicking:

export function changeLangValue() {
  let flag = document.querySelectorAll(".flag img");
  let html = document.querySelector("html");
  let htmlLanguage = html.lang;
  flag.forEach((element) => {
    element.addEventListener("click", () => {
      htmlLanguage = element.alt;
      console.log(htmlLanguage);
    });
  });
}
