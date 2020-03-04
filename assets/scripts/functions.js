function importTemplate(templateUrl, templateId, jsLocation) {
  fetch(templateUrl)
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
    });
}
