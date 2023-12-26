import React, {useEffect, useState, memo} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Switch,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styles } from '../Styles.js';
import { routes } from '../Routes.js';


/**
 * Purpose: Show the Calendar Agenda to the user
 */
function CalendarScreen({ navigation, route }) {

  const { updateShownDataCallback } = route.params || {};
  
  // Load in the data from the database
  const [data, setData] = useState([]);
  const [shownData, setShownData] = useState([]);

  // Function for updating the data after it has changed
  const updateShownData = () => {
    // Fetch updated data and update shownData
    fetch(routes.GET_CALENDAR_EVENTS_URL)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setShownData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };


  // Load in the data every time it changes
  useEffect(() => {
    fetch(routes.GET_CALENDAR_EVENTS_URL)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setShownData(result); // Update shownData when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    // Update the data being displayed
    updateShownData();
    }, []);

  // Make the shownData the same as the data if they are different
  if (JSON.stringify(shownData) != JSON.stringify(data)) {
    setShownData(data);
  }


  // Function to display an item in the Agenda
  const AgendaItem = memo( ({item}) => {
    return (
      <Pressable style={styles.calendarItem}>
      <Text style={styles.calendarItemText}>
        {item.startTime}-{item.endTime}: {item.event}
      </Text>
    </Pressable>
    );
  });

  // Function to display an empty Agenda item
  const EmptyAgendaItem = memo( () => {
    return (<View style={styles.container}>
    <Text style={styles.calendarItemText}>
      Nothing Here!
    </Text>

  </View>);
  });

  // Function to display an empty date with no items
  const EmptyDate = memo( () => {
    return (<View style={styles.calendarItem}>
      <Text style={styles.calendarItemText}>
        Nothing Here!
      </Text>

    </View>);
  });




  // Show the Agenda to the user
  return (
    <View style={styles.verticalView}>

    <Agenda

      style={styles.calendarWrapper}
      scrollEnabled={true}
      pastScrollRange={2}
      futureScrollRange={12}
      selected={new Date()}
      markingType="custom"
      theme={{
          todayTextColor: '#00adf5',

      }}

      items = {shownData}

      // Render each event into the Agenda
      renderItem={(item) => <AgendaItem item={item} />}

      // Render in empty dates and data
      renderEmptyDate={() => <EmptyDate />}
      renderEmptyData={() => <EmptyAgendaItem />}
      

    />


    <View style={styles.bottomButton}>
      <Button
        title="Add New Event"
        color="black"
        onPress={() => navigation.navigate('Add Event', { updateShownDataCallback: updateShownData })}
      />
    </View>

    </View>

    
  )
}




/**
 * Purpose: Add an event to the Calendar
 */
function AddEvent({ navigation, route }) {
  const { updateShownDataCallback } = route.params || {};

  // Make variables to hold each aspect of the event
  const [eventTitle, onChangeText] = useState('');
  const [date, onChangeDate] = useState(new Date());
  const [startTime, onChangeStart] = useState(new Date());
  const [endTime, onChangeEnd] = useState(new Date());

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  /**
   * Purpose: Write the data gathered from the user to the database
   */
  const addUserEvent = async (date, eventTitle, startTime, endTime, navigation) => {
    // Group the data
    const data = {
      date,
      eventTitle,
      startTime,
      endTime
    };

    // Check if the data is valid
    if (date == null || eventTitle == '' || startTime == null || endTime == null) {
      Alert.alert("Invalid date. Please fill out all the required information.")
    }
    else if (startTime >= endTime) {
      Alert.alert("Invalid date. The start time cannot be later than the end time.")
    }
    else {
      // Send the data to the database
      try {
        const response = await fetch(routes.ADD_CALENDAR_EVENT_URL, {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          // Call the callback function to update shownData
          if (updateShownDataCallback) {
            updateShownDataCallback();
          }
        } else {
          Alert.alert('Error adding event');
        }
      }
      catch (error) {
        console.error('Error posting data:', error);
      }

      // Navigate back to the Calendar page
      navigation.navigate('Calendar');
    }
  };

  // Function to format the date needed for the Agenda
  const formatDateToYYYYMMDD = (date) => {
    // Ensure that the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
      return 'Invalid Date';
    }

    // Get the year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // Function for updating the date in the date picker
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    onChangeDate(currentDate);
  }

  // Function for updating the start time in the date picker
  const changeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    onChangeStart(currentDate);
  }

  // Function for updating the start time in the date picker
  const changeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    onChangeEnd(currentDate);
  }

  // Show the input events to the user
  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.verticalView}>
        <Text style={styles.searchBoxTitle}>
          Description:
        </Text>
        <TextInput
          multiline={true}
          placeholder="Enter event description..."
          style={styles.textInput}
          onChangeText={onChangeText}
          value={eventTitle}
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.searchBoxTitle}>
            Date:
          </Text>

          <View style={styles.fill}></View>

          <DateTimePicker
            mode="date"
            display="calendar"
            dateFormat="year-month-day"
            onChange={changeDate}
            value={date}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.searchBoxTitle}>
            Start Time:
          </Text>

          <View style={styles.fill}></View>

          <DateTimePicker
            mode="time"
            onChange={changeStart}
            value={startTime}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.searchBoxTitle}>
            End Time:
          </Text>

          <View style={styles.fill}></View>

          <DateTimePicker
            mode="time"
            onChange={changeEnd}
            value={endTime}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={styles.fill}></View>

        <View style={styles.bottomButton}>
          <Button
            title="Done"
            color='black'
            onPress={() => {
              handleDismissKeyboard();
              addUserEvent(
                formatDateToYYYYMMDD(date),
                eventTitle,
                startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                navigation
              );
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}





const stack = createNativeStackNavigator();

/**
 * Purpose: Create main navigation page
 */
export function CalendarMain() {
  return (
    
      <stack.Navigator initialRouteName='Calendar'
        screenOptions={{
          headerShown: true
        }}
      >
        <stack.Screen name='Calendar' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={CalendarScreen} />
        <stack.Screen name='Add Event' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={AddEvent} />
      </stack.Navigator>
    
  );
}

