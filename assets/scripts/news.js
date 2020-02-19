// IMPORTING MAIN MENU
fetch("./header.html")
.then(response => {
  console.log(response.text);
  return response.text();
})
.then(text => {
    document.querySelector("#header").innerHTML = text;
});

// IMPORTING BACKGROUND
fetch("./background.html")
.then(response => {
  return response.text();
})
.then(text => {
  document.querySelector("#background").innerHTML = text;
});



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
