// NOTE *****************
// For example:
// List<Event> does not mean the specific Event class returned in the List data structure
// We're just tring to say we need all the events


/**
 * Description: Returns all the calendar events for this user from the database
 */
List<Event> getCalendarEvents();


/**
 * Description: Adds a new calendar event to the database for this user
 * 
 * Key = date
 */
void addCalendarEvents(String date, String eventTitle, int startTime, int endTime);



