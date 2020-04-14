function importTemplate(templateUrl, templateId, jsLocation) {
  // console.log(templateUrl, templateId, jsLocation);
  return fetch(templateUrl)
    .then(response => {
      return response.text();
    })
    .then(text => {
      $(templateId).html(text);
    })
    .then(text => {
      if (jsLocation) {
        let newScript = document.createElement("script");
        newScript.src = jsLocation;
        document.body.appendChild(newScript);
      }
    }).catch( e => {
      console.log(e);
    });
}

// CHANGE ICONS COLOR ON HOVER

function changeIconColor(htmlElement) {
  htmlElement.addEventListener("mousemove", function (event) {
    event.target.src = event.target.src.replace("_grey", "_yelow");
  });
  htmlElement.addEventListener("mouseleave", function (event) {
    event.target.src = event.target.src.replace("_yelow", "_grey");
  });
}
