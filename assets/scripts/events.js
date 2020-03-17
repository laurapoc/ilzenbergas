let pageName = "events";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

const eventProperties = [
  {
    contentImage: "assets/img/calendar/jazzu.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "30 eur",
    buyButton: "https://www.tiketa.lt/",
    extendedContent: `JAZZU-Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Excepturi magni beatae necessitatibus? Sequi explicabo magnam omnis nesciunt,
      nisi animi vero natus provident nostrum et inventore unde totam, deserunt perspiciatis!
       At aliquid beatae atque veritatis hic minima! Recusandae cumque quasi explicabo quisquam ratione,
        dolorum soluta. Distinctio rem, architecto delectus quia consectetur voluptatum, placeat odit quo ex minima,
         nihil vel numquam labore provident dolorum mollitia accusantium ut ab nam commodi asperiores! Debitis dignissimos nisi quia.
          Cupiditate deleniti atque perspiciatis libero deserunt sit aperiam labore quia exercitationem eveniet.
           Magnam odit enim nesciunt porro omnis amet, tempore, est labore sunt nam, nemo error. Officia!
    `
  },
  {
    contentImage: "assets/img/calendar/piano.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "40 eur",
    buyButton: "https://ozas.lt/paslauga/tiketa-lt/",
    extendedContent: `PIANO-Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Excepturi magni beatae necessitatibus? Sequi explicabo magnam omnis nesciunt,
     nisi animi vero natus provident nostrum et inventore unde totam, deserunt perspiciatis!
      At aliquid beatae atque veritatis hic minima! Recusandae cumque quasi explicabo quisquam ratione,
       dolorum soluta. Distinctio rem, architecto delectus quia consectetur voluptatum, placeat odit quo ex minima,
        nihil vel numquam labore provident dolorum mollitia accusantium ut ab nam commodi asperiores! Debitis dignissimos nisi quia.
         Cupiditate deleniti atque perspiciatis libero deserunt sit aperiam labore quia exercitationem eveniet.
          Magnam odit enim nesciunt porro omnis amet, tempore, est labore sunt nam, nemo error. Officia!
   `
  },
  {
    contentImage: "assets/img/calendar/foje.png",
    eventText: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Ipsum quo corporis dicta vitae non corrupti iste quaerat perspiciatis, ducimus eos,
      delectus magnam voluptatibus commodi quisquam facere nostrum eveniet dolores?

`,
    price: "20 eur",
    buyButton: "https://www.tiketa.lt/",
    extendedContent: `FOJE-Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Excepturi magni beatae necessitatibus? Sequi explicabo magnam omnis nesciunt,
     nisi animi vero natus provident nostrum et inventore unde totam, deserunt perspiciatis!
      At aliquid beatae atque veritatis hic minima! Recusandae cumque quasi explicabo quisquam ratione,
       dolorum soluta. Distinctio rem, architecto delectus quia consectetur voluptatum, placeat odit quo ex minima,
        nihil vel numquam labore provident dolorum mollitia accusantium ut ab nam commodi asperiores! Debitis dignissimos nisi quia.
         Cupiditate deleniti atque perspiciatis libero deserunt sit aperiam labore quia exercitationem eveniet.
          Magnam odit enim nesciunt porro omnis amet, tempore, est labore sunt nam, nemo error. Officia!
   `
  },
  {
    contentImage: "assets/img/calendar/jazzu-1.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "25 eur",
    buyButton: "https://ozas.lt/paslauga/tiketa-lt/",
    extendedContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Excepturi magni beatae necessitatibus? Sequi explicabo magnam omnis nesciunt,
     nisi animi vero natus provident nostrum et inventore unde totam, deserunt perspiciatis!
      At aliquid beatae atque veritatis hic minima! Recusandae cumque quasi explicabo quisquam ratione,
       dolorum soluta. Distinctio rem, architecto delectus quia consectetur voluptatum, placeat odit quo ex minima,
        nihil vel numquam labore provident dolorum mollitia accusantium ut ab nam commodi asperiores! Debitis dignissimos nisi quia.
         Cupiditate deleniti atque perspiciatis libero deserunt sit aperiam labore quia exercitationem eveniet.
          Magnam odit enim nesciunt porro omnis amet, tempore, est labore sunt nam, nemo error. Officia!
   `
  }
];

const youtubeVideos = [
  {
    youtubeEmbededVideo: `<iframe
  width="769"
  height="433"
  src="https://www.youtube.com/embed/rQi_ys11yfE"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>`
  },
  {
    youtubeEmbededVideo: `<iframe
width="769"
height="433"
src="https://www.youtube.com/embed/68MNjuBwFuQ?list=RDEMdRM3ETeNwmlcB4t8WBTMhg"
frameborder="0"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe>`
  },
  {
    youtubeEmbededVideo: `<iframe
width="769"
height="433"
src="https://www.youtube.com/embed/CyFF5Ka9pss"
frameborder="0"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe>`
  }
];
// loadEvent();

// CALENDAR:

document.addEventListener("DOMContentLoaded", function() {
  let calendarEl = document.getElementById("calendar");
  let initialLocaleCode = "lt";

  let eventsList = [
      {
        title: "Foje",
        start: "2020-03-11T19:00",
        end: "2020-03-11T23:00",
        info: "some more info",
        id: 2
      },
      {
        title: "Fortepijono koncertas",
        start: "2020-03-13T12:00",
        end: "2020-03-13T17:00",
        info: "papildoma informacija",
        id: 1
      },
      {
        title: "Jazzu",
        start: "2020-03-13T19:00",
        end: "2020-03-13T23:00",
        info: "papildomas trumpas aprašymas apie koncertą, laiką ar pan.",
        id: 0
      },

      {
        title: "Jazzu",
        start: "2020-06-06T19:00",
        end: "2020-06-06T23:00",
        info: "jazzu aprašymas",
        id: 3
      }
    ],
    today = new Date();
  y = today.getFullYear();
  m = today.getMonth();
  d = today.getDate();

  let listView = "listWeek";
  let monthView = "dayGridMonth";

  let headerProperties = {
    left: "title",
    center: "",
    right: "prev, today, next"
  };
  $(".fc-prev-button").hide();

  let calendarProperties = {
    firstDay: 1,
    locale: initialLocaleCode,
    plugins: ["dayGrid", "list", "timeGrid", "interaction"],
    defaultView: $(window).width() < 765 ? "listWeek" : "dayGridMonth",
    defaultDate: today,
    selectable: true,
    nowIndicator: true,
    navLinks: true, // Click day/week names to navigate to date
    editable: true, // Allows drag/drop
    eventLimit: true, // Allow "more" link when too many events
    themeSystem: "standart",
    eventTimeFormat: {
      hour: "2-digit", //2-digit, numeric
      minute: "2-digit", //2-digit, numeric
      meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
      hour12: false //true, false
    },
    header: headerProperties,
    contentHeight: "auto",
    events: eventsList,
    // show event popup:
    eventRender: function(info) {
      $(info.el).tooltip({ title: info.event.extendedProps.info ? info.event.extendedProps.info : "default" });
    },
    // date cklick
    dateClick: function(info) {
      console.log("date clicked");
    },
    // day number click
    navLinkDayClick: function(date, jsEvent) {
      console.log(date, jsEvent);
      calendar.gotoDate(date);
      calendar.changeView("dayGrid");
      if ($(window).width() < 765) {
        // console.log("less than 765");
        // changing header properties list by reaching it with calendar.setOption()
        (headerProperties.center = "listWeek"), calendar.setOption("header", headerProperties);
        $(".fc-listWeek-button").click(function() {
          // changing header properties list by reaching it with calendar.setOption()
          (headerProperties.center = ""), calendar.setOption("header", headerProperties);
        });
      } else {
        // console.log("more then 765");
        // changing header properties list by reaching it with calendar.setOption()
        (headerProperties.center = "dayGridMonth"), calendar.setOption("header", headerProperties);
        $(".fc-dayGridMonth-button").click(function() {
          // changing header properties list by reaching it with calendar.setOption()
          (headerProperties.center = ""), calendar.setOption("header", headerProperties);
        });
      }
    },
    // event click:

    eventClick: function(info) {
      console.log("event clicked");
      loadEvent(eventProperties[info.event.id]);
    },
    // Change view on windows resize:
    windowResize: function(view) {
      // alert('The calendar has adjusted to a window resize');
      if ($(window).width() < 765) {
        calendarProperties.defaultView = listView;
      } else {
        calendarProperties.defaultView = monthView;
      }

      calendar.destroy();

      calendar = new FullCalendar.Calendar(calendarEl, calendarProperties);

      calendar.render();
    }
  };

  let calendar = new FullCalendar.Calendar(calendarEl, calendarProperties);

  calendar.render();
});

function loadEvent(eventContent) {
  // 1. susirasti template'a, kuri klonuosiu
  let eventTemplate = document.querySelector("#event-info");
  // 2. susirasti prie ko kabinsiu template'a
  let eventParent = document.querySelector("#event-parent");
  eventParent.textContent = "";
  // 3. klonuojam template'a
  let clone = eventTemplate.content.cloneNode(true);
  // 4. manipuliuoju template'o turiniu:
  let imageTag = clone.getElementById("event-picture");
  imageTag.src = eventContent.contentImage;
  let price = clone.getElementById("event-price");
  price.textContent = eventContent.price;
  let buyButton = clone.getElementById("buy-button");
  buyButton.href = eventContent.buyButton;
  console.log(buyButton);
  let eventText = clone.getElementById("event-text");
  eventText.textContent = eventContent.eventText;

  // priskiriam turini prie nurodyto tevo:
  eventParent.appendChild(clone);

  // papildomo turinio template'as:
  let extendedEventContentTemplate = document.getElementById("event-more-info");
  let extendedContentParent = document.getElementById("event-more-content-parent");
  extendedContentParent.textContent = "";
  let cloneExtendedContent = extendedEventContentTemplate.content.cloneNode(true);
  let paragraphTag = cloneExtendedContent.getElementById("extended-text");
  paragraphTag.textContent = eventContent.extendedContent;
  extendedContentParent.appendChild(cloneExtendedContent);
}
// youtube video clone:
let youtubeEmbededVideoTemplate = document.getElementById("youtube-link-template");
let youtubeEmbededVideoParent = document.getElementById("youtube-link-parent");
youtubeEmbededVideoParent.textContent = "";

youtubeVideos.forEach(youtubeVideo => {
  let cloneVideo = youtubeEmbededVideoTemplate.content.cloneNode(true);
  let innerDivTag = cloneVideo.querySelector("div");
  
  innerDivTag.innerHTML = youtubeVideo.youtubeEmbededVideo;
  youtubeEmbededVideoParent.appendChild(cloneVideo);
});



function toggleExtendedContent() {
  // toggle text content
  let extendedContentOnButton = document.querySelector(".toggle-extended-text");
  extendedContentOnButton.classList.toggle("show");
  // toggle button text content
  let buttonOfExtendedContent = document.getElementById("button-extend-content");
  console.log(buttonOfExtendedContent.innerText);
  if (buttonOfExtendedContent.innerText === "Plačiau") {
    buttonOfExtendedContent.innerText = "Suskleisti";
    console.log(buttonOfExtendedContent.innerText);
  } else {
    buttonOfExtendedContent.innerText = "Plačiau";
  }
}
