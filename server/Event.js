class Event {
    constructor(date, eventTitle, startTime, endTime)
    {
      this.eventTitle = eventTitle;
      this.date = date;
      this.startTime = startTime;
      // this.info = info;
      this.endTime = endTime;
    }
    // Adding duration to event is optional
    // addDescription(duration)
    // {
    //   this.duration = duration;
    // }
  }

  module.exports = Event;