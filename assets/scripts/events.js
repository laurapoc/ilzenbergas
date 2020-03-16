let pageName = "events";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);


// 1. susirasti template'a, kuri klonuosiu
const eventProperties = [
  {
    contentImage: "assets/img/calendar/jazzu.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "30 eur",
    buyButton: "https://www.tiketa.lt/"
  },
  {
    contentImage: "assets/img/calendar/piano.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "40 eur",
    buyButton: "https://ozas.lt/paslauga/tiketa-lt/"
  },
  {
    contentImage: "assets/img/calendar/foje.png",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "20 eur",
    buyButton: "https://www.tiketa.lt/"
  },
  {
    contentImage: "assets/img/calendar/jazzu-1.jpg",
    eventText: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, 
    impedit aliquam deleniti possimus in amet explicabo excepturi necessitatibus accusamus consectetur quasi perspiciatis blanditiis dolores,
     tenetur nostrum nulla. Veniam, quasi nesciunt placeat, cumque minima amet exercitationem maiores odit soluta repellat laboriosam rem impedit aliquid.
      Sed debitis itaque eaque est eligendi temporibus.
`,
    price: "25 eur",
    buyButton: "https://ozas.lt/paslauga/tiketa-lt/"
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
  // "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum voluptatibus, ipsa esse non exercitationem consectetur similique atque nam placeat provident?";
  // priskiriam turini prie nurodyto tevo:
  eventParent.appendChild(clone);
}
