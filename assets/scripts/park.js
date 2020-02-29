let pageName = "park";
// IMPORTING MAIN MENU
fetch("./header.html")
  .then(response => {
    console.log(response.text);
    return response.text();
  })
  .then(text => {
    $("#header").html(text);
  })
  .then(text => {
    let newScript = document.createElement("script");
    newScript.src = "./assets/scripts/header.js";
    document.body.appendChild(newScript);
  });

// IMPORTING FOOTER
fetch("./footer.html")
  .then(response => {
    return response.text();
  })
  .then(text => {
    document.querySelector("#footer").innerHTML = text;
  });



// IMPORTING BACKGROUND
fetch("./background.html")
  .then(response => {
    return response.text();
  })
  .then(text => {
    document.querySelector("#background").innerHTML = text;
  });

