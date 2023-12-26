import Event from './Event'; // Import the Event class

const MyCustomModule = {
  createEvent: (title, date, startTime, endTime) => {
    const event = new Event(title, date, startTime, endTime);
    return event;
  },
};

// export default MyCustomModule;
module.exports = MyCustomModule;
