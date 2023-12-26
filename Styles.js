import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

export const styles = StyleSheet.create({
  
  mealItem: {
      alignItems: 'left',
      flexDirection: 'row',
      padding: 10,
    },

    progressCircle: {
      margin: 10,
      alignItems: 'center'
    },



  mealText: {
    fontSize:25,
    alignSelf: 'left'
  },
  calorieText: {
    fontSize: 15,
  },

  buttonText: {
    fontSize: 20,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
  },
  centerTitle: {
    textAlign: 'center',
    fontSize: 30,
  },
  mealInfoText: {
    textAlign: 'left',
    fontSize: 22,
    paddingBottom: 5,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 22,
    paddingBottom: 5,
  },

  weightBox: {
    borderWidth: 2,            // Border width
    borderColor: 'black',      // Border color
    borderRadius: 15,          // Border radius (optional for rounded corners)
    padding: 10,  
    backgroundColor: 'lightpink',
    marginTop:10,
    flex: 1,
  },

  weightText: {
    fontSize: 50,
    textAlign: 'center',
  },

  weightTitleText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },



  bottomButton: {
    borderWidth: 2,            // Border width
    borderColor: 'black',      // Border color
    borderRadius: 15,          // Border radius (optional for rounded corners)
    padding: 10,  
    backgroundColor: 'lightpink',
    marginTop:10,
  },
  bottomButtonHorizontal: {
    flex: 1,
    borderWidth: 2,            // Border width
    borderColor: 'black',      // Border color
    borderRadius: 15,          // Border radius (optional for rounded corners)
    padding: 10,  
    backgroundColor: 'lightpink',
    marginTop:10,
  },


  weightBoxSeparator: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: '#737373',

  },

  macroText: {
    fontSize: 18,
  },


  separator: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
  textInputTitle: {
    fontSize: 15,
    paddingHorizontal: 10,
  },
  calendarItemText: {
    color: '#888',
    fontSize: 16,
  },
  calendarItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },



  loggedFood: {
    alignItems: 'left',
    flexDirection: 'row',
  },
  blackBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },



  verticalView: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'right',
  },
  fill: {
    flex: 1,
  },
  input: {
    flex: 1, // Takes twice as much space as the name
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  inputFieldTitle: {
    fontSize: 20,
    marginRight: 10,
    borderRadius: 5,
  },


  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchBoxTitle: {
    fontSize: 20,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '600',
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },



  instruction: {
    flex: 0.5, // Takes twice as much space as the name
    padding: 8,
    marginRight: 10,
    height: 100
  },


});



export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black', // Change the color of the bottom navigation bar
    secondary: 'black'
  },
};

