let pageName = "events";

// IMPORTING MAIN MENU
importTemplate("./header.html", "#header", "./assets/scripts/header.js");

// IMPORTING FOOTER
importTemplate("./footer.html", "#footer", null);

// IMPORTING BACKGROUND
importTemplate("./background.html", "#background", null);

// CALENDAR:

document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");

  let eventsList = [
    {
      title: "All Day Event",
      start: "2020-02-01"
    },
    {
      title: "Long Event",
      start: "2020-02-07",
      end: "2020-02-10"
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: "2020-02-09T16:00:00"
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: "2020-02-16T16:00:00"
    },
    {
      title: "Conference",
      start: "2020-02-11",
      end: "2020-02-13"
    },
    {
      title: "Meeting",
      start: "2020-02-12T10:30:00",
      end: "2020-02-12T12:30:00"
    },
    {
      title: "Lunch",
      start: "2020-02-12T12:00:00"
    },
    {
      title: "Meeting",
      start: "2020-02-12T14:30:00"
    },
    {
      title: "Birthday Party",
      start: "2020-02-13T07:00:00"
    },
    {
      title: "Click for Google",
      url: "http://google.com/",
      start: "2020-02-28"
    }
  ];

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "list", "timeGrid"],
    defaultView: "dayGridMonth",
    defaultDate: "2020-02-07",
    header: {
      left: "prev, today",
      center: "title",
      right: "next"
    },
    events: eventsList
  });

  calendar.render();
});
