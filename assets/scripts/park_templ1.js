let templateName = "park_templ1";

// // IMPORTING LEFT SIDE MENU
fetch("./sidebar.html")
.then(response => {
  return response.text();
})
.then(text => {
  $("#sidebar").html(text);
})
.then(text => {
  let newScript = document.createElement("script");
  newScript.src = "./assets/scripts/sidebar.js";
  document.body.appendChild(newScript);
});