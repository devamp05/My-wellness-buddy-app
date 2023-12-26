const Calendar = require("./Calendar");
const Event = require("./Event");
const Log = require("./Log");
const LogBook = require("./LogBook");

// Testing Event
console.log("Testing Event class");
const testEvent = new Event("15/11/2023", "testEvent", "12:00", "13:00");
console.log("Creating a new object of Event with data: date: 15/11/2023, eventTitle: testEvent, startTime: 12:00, endTime: 13:00");
console.log('data of the created object: \ndate: ',testEvent.date + '\neventTitle: ', testEvent.eventTitle + '\nstartTime: ', testEvent.startTime + '\nendTime: ', testEvent.endTime);

// Testing Calendar
console.log("Testing Calendar class");
const testCalendar = new Calendar();
console.log("Testing addCalendarEvent method ");
testCalendar.addCalendarEvent("15/11/2023", "testEvent", "12:00", "13:00");
console.log("a new Event withh data: 15/11/2023, testEvent, 12:00, 13:00 should have been added to the Events array");
console.log(testCalendar.Events);
console.log("Testing getCalendarEvents method ");
console.log(testCalendar.getCalendarEvents());
console.log("Testing removeEvent method with title: testEvent");
testCalendar.removeEvent('testEvent');
console.log(testCalendar.getCalendarEvents());
console.log("Testing removeEvent method with multiple (3) events with same title, Expected to delete only one Event");
testCalendar.addCalendarEvent("15/11/2023", "testEvent", "12:00", "13:00");
testCalendar.addCalendarEvent("15/11/2023", "testEvent", "12:00", "13:00");
testCalendar.addCalendarEvent("15/11/2023", "testEvent", "12:00", "13:00");
console.log(testCalendar.getCalendarEvents());
testCalendar.removeEvent('testEvent');
console.log(testCalendar.getCalendarEvents());

// Testing Log
console.log("Testing Log class");
const testLog = new Log("15/11/2023");
console.log("Testing addMeal method with {foodName : Banana, Nutrients: {calories: 200, carbohydrates: 5, protein: 2g, fats: 5g}");
testLog.addMeal({foodName : "Banana", Nutrients: {calories: "200", carbohydrates: "5", protein: "2g", fats: "5g"}})
console.log("Meals list:", testLog.Meals );
console.log("totalNutrients:", testLog.totalNutrients);
console.log("testing addWater()");
console.log("water before: ", testLog.water);
testLog.addWater();
console.log("water after: ", testLog.water);
// Testing removeMeal
const testLog2 = new Log();
testLog2.addMeal({Name: "banana", Nutrients: {calories: "200", carbohydrates: "5", protein: "2g", fats: "5g"}});
console.log("Testing removeMeal")
console.log("Meals in log before: ",testLog2.Meals);
testLog2.removeMeal("banana");
console.log("Meals in log after: ",testLog2.Meals);



// Testing LogBook
console.log("Testing LogBook class");
const testLogBook = new LogBook();
console.log("Testing LogMeal method with {foodName : Banana, Nutrients: {calories: 200, carbohydrates: 5, protein: 2g, fats: 5g}")
testLogBook.logMeal({foodName : "Banana", Nutrients: {calories: "200", carbohydrates: "5", protein: "2g", fats: "5g"}});
console.log("after adding meal: ",testLogBook.Logs);
console.log("Testing findLog method with a date ('17102023') present in logs");
console.log(testLogBook.findLog('17102023'));
console.log("Testing findLog method with a date not in the logs ('15102023') present in logs");
console.log(testLogBook.findLog('15102023'));
