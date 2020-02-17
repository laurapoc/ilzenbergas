let newsBtn = document.querySelector("#newsBtn");
let restNews = document.querySelector("#btn-dark .btn");
let showRows = document.querySelector(".not-show");



newsBtn.addEventListener("click", function() {
restNews.classList.toggle("toggle-news");
showRows.classList.toggle("show");
console.log(showRows);
});

