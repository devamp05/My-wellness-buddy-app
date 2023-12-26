// import Event class and Log class
const Event = require("./Event");
// const Log = require("./Log");

// Calendar class
class Calendar{
    constructor()
    {
      this.Events = [];     // Initialize an empty array to store a list of events
    }
    addEvent(Event)
    {
      this.Events.push(Event);  // Add the given event to the events list
    }
    removeEvent(eventTitle)
    {
      const indexToRemove = this.Events.findIndex(event => event.eventTitle == eventTitle);
  
      // Event should have been found but still do a check
      if(indexToRemove !== -1)
      {
        this.Events.splice(indexToRemove, 1);
      }
    }
    getCalendarEvents()
    {
      return this.Events;
    }
  
    addCalendarEvent(date, eventTitle, startTime, endTime)
    {
      // create a new Event object
      const event = new Event(date, eventTitle, startTime, endTime);
  
      // Add event to the user's calendar
      // this.addEvent(event);
      this.Events.push(event);
    }
  }

  module.exports = Calendar;