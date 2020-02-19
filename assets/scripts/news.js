// const xhr = new XMLHttpRequest();
// const url = "../../templates.html";

// xhr.responseType = "json";
// xhr.onreadystatechange = () => {
//   if (xhr.readyState === XMLHttpRequest.DONE) {

    // document.body.append(
    //     document.importNode(
    //       document.querySelector('template').content,
    //       true
    //     )
    //   )
//   }
// };

// xhr.open("GET", url);
// xhr.send();




// let template = $(function template() {
//   $("#t1").load("../../templates.html");
//   alert("Load was performed.");
  
// });

// console.log(template);

  //get the imported document in doc:
  let link = document.querySelector( 'link#templates' );
  let doc = link.import;

  //fetch template2 1 and 2:
  let template1 = doc.querySelector( '#t1' );
 
