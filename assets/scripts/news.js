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

// IMPORTING BACKGROUND
fetch("./background.html")
  .then(response => {
    return response.text();
  })
  .then(text => {
    document.querySelector("#background").innerHTML = text;
  });

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
