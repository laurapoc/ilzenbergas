// alert("ok");
let pageName = "homepage";
let newsBtn = document.querySelector("#newsBtn");
let showRows = document.querySelector(".not-show");

newsBtn.addEventListener("click", function() {
  // adding class "show"
  showRows.classList.toggle("show");
  console.log(showRows);
  // changing button text
  let btnText = newsBtn;
  if (btnText.textContent === "Visos naujienos") {
    btnText.textContent = "Suskleisti naujienas";
  } else {
    btnText.textContent = "Visos naujienos";
  }
});
 