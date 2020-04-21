import { importTemplate, waitForElement } from "./functions.js";
import { setupHeader } from "./header.js";

let pageName = "events";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", null).then(() => {
  setupHeader(pageName);
});

// IMPORTING FOOTER
importTemplate("./footer.html", "footer", "./assets/scripts/footer.js");

// IMPORTING BACKGROUND
importTemplate("./background.html", "background", null);

// IMPORTING EVENTS DATA:
fetch("./assets/json/objects_data.json")
  .then((response) => response.json())
  .then((dataObject) => {
    console.log(dataObject);
    loadCalendar(dataObject);
  })
  .catch((e) => {
    console.log(e);
  });

// IMPORTING YOUTUBE VIDEO DATA:
fetch("./assets/json/video_data.json")
  .then((response) => response.json())
  .then((videoData) => {
    console.log(videoData);
    loadVideoData(videoData);
  })
  .catch((e) => {
    console.log(e);
  });

function loadVideoData(videoData) {
  console.log(videoData);
  // youtube video clone:
  let youtubeEmbededVideoTemplate = document.getElementById("youtube-link-template");
  let youtubeEmbededVideoParent = document.getElementById("youtube-link-parent");
  youtubeEmbededVideoParent.textContent = "";

  videoData.videos.forEach((youtubeVideo) => {
    let cloneVideo = youtubeEmbededVideoTemplate.content.cloneNode(true);
    let innerDivTag = cloneVideo.querySelector("div");

    innerDivTag.innerHTML = youtubeVideo.youtubeEmbededVideo;
    youtubeEmbededVideoParent.appendChild(cloneVideo);
  });
}

// CALENDAR:

function loadCalendar(dataObject) {
  let calendarEl = document.getElementById("calendar");
  let initialLocaleCode = "lt";

  let eventsList = dataObject.events;

  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();
  let d = today.getDate();

  let listView = "listYear";
  let monthView = "dayGridMonth";

  let headerProperties = {
    left: "title",
    center: "",
    right: "prev, today, next",
  };
  $(".fc-prev-button").hide();

  let calendarProperties = {
    firstDay: 1,
    locale: initialLocaleCode,
    plugins: ["dayGrid", "list", "timeGrid", "interaction"],
    defaultView: $(window).width() < 765 ? "listYear" : "dayGridMonth",
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
      hour12: false, //true, false
    },
    header: headerProperties,
    contentHeight: "auto",
    events: eventsList,
    // show event popup:
    eventRender: function (info) {
      $(info.el).tooltip({ title: info.event.extendedProps.info ? info.event.extendedProps.info : "default" });
    },
    // date cklick
    dateClick: function (info) {
      console.log("date clicked");
    },
    // day number click
    navLinkDayClick: function (date, jsEvent) {
      console.log(date, jsEvent);
      calendar.gotoDate(date);
      calendar.changeView("dayGrid");
      if ($(window).width() < 765) {
        // console.log("less than 765");
        // changing header properties list by reaching it with calendar.setOption()
        (headerProperties.center = "listYear"), calendar.setOption("header", headerProperties);
        $(".fc-listYear-button").click(function () {
          // changing header properties list by reaching it with calendar.setOption()
          (headerProperties.center = ""), calendar.setOption("header", headerProperties);
        });
      } else {
        // console.log("more then 765");
        // changing header properties list by reaching it with calendar.setOption()
        (headerProperties.center = "dayGridMonth"), calendar.setOption("header", headerProperties);
        $(".fc-dayGridMonth-button").click(function () {
          // changing header properties list by reaching it with calendar.setOption()
          (headerProperties.center = ""), calendar.setOption("header", headerProperties);
        });
      }
    },
    // event click:

    eventClick: function (info) {
      console.log("event clicked");
      loadEvent(eventsList[info.event.id]);
    },
    // Change view on windows resize:
    windowResize: function (view) {
      // alert('The calendar has adjusted to a window resize');
      if ($(window).width() < 765) {
        calendarProperties.defaultView = listView;
      } else {
        calendarProperties.defaultView = monthView;
      }

      calendar.destroy();

      calendar = new FullCalendar.Calendar(calendarEl, calendarProperties);

      calendar.render();
    },
  };

  let calendar = new FullCalendar.Calendar(calendarEl, calendarProperties);

  calendar.render();
}

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

  waitForElement(".toggle-extended-text", document).then(() => {
    document.getElementById("button-extend-content").addEventListener("click", toggleExtendedContent);
  });

}

function toggleExtendedContent(event) {
  console.log(event);
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
