let pageName = "events";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

// CALENDAR:

document.addEventListener("DOMContentLoaded", function() {
  let calendarEl = document.getElementById("calendar");
  let initialLocaleCode = "lt";

  let eventsList = [
    {
  
      title: "Koncertas",
      start: "2020-03-11T19:00",
      end: "2020-03-11T23:00",
      info: "some more info"
      
    },
    {
      title: "dar vienas koncertas",
      start: "2020-03-13T19:00",
      end: "2020-03-13T23:00",
      info: "papildoma informacija"
    },
    {
      title: "Jazzu",
      date: "2020-06-06",
      info: "jazzu aprašymas"
    },
    {
      title: "something else",
      date: "2020-06-02",
      info: "some more info"
    },
    {
      title: "some concert",
      date: "2020-06-07",
      info: "some more info"
    }
  ],


  
  today = new Date();
  y = today.getFullYear();
  m = today.getMonth();
  d = today.getDate();
  let calendar = new FullCalendar.Calendar(calendarEl, {
    firstDay: 1,
    locale: initialLocaleCode,
    plugins: ["dayGrid", "list", "timeGrid"],
    defaultView: $(window).width() < 765 ? "listWeek" : "dayGridMonth",
    defaultDate: today,
    nowIndicator: true,
    navLinks: true, // Click day/week names to navigate to date
    editable: true, // Allows drag/drop
    eventLimit: true, // Allow "more" link when too many events
    themeSystem: "standart",
    eventTimeFormat: {
      hour: '2-digit', //2-digit, numeric
      minute: '2-digit', //2-digit, numeric
      meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
      hour12: false //true, false
    },
    header: {
      left: "title",
      center: "",
      right: "prev, today, next"
    },
    contentHeight: "auto",
    events: eventsList,
    eventRender: function (info) {
      $(info.el).tooltip({ title: info.event.extendedProps.info ? info.event.extendedProps.info : "default"});     
    },
    windowResize: function(view) {
      // alert('The calendar has adjusted to a window resize');
      let adjustedView = $(window).width() < 765 ? "listWeek" : "dayGridMonth";
      calendar.changeView(adjustedView);
    }
  });

  calendar.render();
});
