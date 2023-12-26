import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Switch,
  ActivityIndicator,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { styles } from '../Styles.js';
import { routes } from '../Routes.js';


/**
 * Purpose: Show the user the ma
ofni ersu eht gniniatnoc neercs eliforp n
 */
function ProfileScreen({navigation}) {

    // Load in the data from the database
    const [data, setData] = useState([]);

    // Fetch the data every time it changes
    useEffect(() => {
        fetch(routes.GET_USER_INFO)
        .then((response) => response.json())
        .then((result) => {
        setData(result.userInfo);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    })



    return (

        <View style={styles.verticalView} >


            <View style={styles.blackBorder} >
            <FlatList
                data={data}
                
                // Render each data item
                renderItem={({item}) => (
                <View style={styles.verticalView}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.titleText} >
                    User Information:
                    </Text>

                    <View style={styles.separator}/>
                    
                    <Text style={styles.mealText}>
                    Username: {item.userName}
                    </Text> 

                    <View style={styles.separator}/>

                    <Text style={styles.mealText}>
                    Name: {item.name}
                    </Text>

                    <View style={styles.separator}/>

                    <Text style={styles.mealText}>  
                    Age: {item.age} years
                    </Text>

                    <View style={styles.separator}/>

                    <Text style={styles.mealText}>   
                    Height: {item.height} cm
                    </Text>
        
                    <View style={styles.fill}></View>
        
            
                </View>
                </View>
                )}
            />
            </View>            



            <View style={styles.bottomButton} >
                <Button
                title="Add Forbidden Food"
                color="black"
                onPress={() => navigation.navigate('Forbidden Foods')}
                />
            </View>
            <View style={styles.bottomButton} >
                <Button
                title="Update Activity Level"
                color="black"
                style={{}}
                onPress={() => Alert.prompt(`Enter Activity Level:` + 
                                      `\n` + `1: Little to no exercise` + 
                                      `\n` + `2. Exercise 1-3 times/week` + 
                                      `\n` + `3. Exercise 4-5 times/week` + 
                                      `\n` + `4. Daily exercise` + 
                                      `\n` + `5. Intense exercise daily` + 
                                      `\n` + `6. Very intense exercise daily, or physical job` ,
                 '', (value) => UpdateActivityLevel(value, navigation), 'plain-text', '', 'number-pad')}
                />
            </View>            
            <View style={styles.bottomButton} >
                <Button
                title="My Weight"
                color="black"
                onPress={() => navigation.navigate('My Weight')}
                />
            </View>
        </View>
    );
}



/**
 * Update the activity level of the user
 * @param {*} activityLevel 
 */
const UpdateActivityLevel = async(activityLevel) => {

  if (parseInt(activityLevel) > 6 || parseInt(activityLevel) < 1) {
    Alert.alert("Invalid Input. Try Again");
  }
  else {
    const data = {
      activityLevel
    };
  
    // Send the data to the database
    try {
    const response = await fetch(routes.SET_ACTIVITY_LEVEL, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  
  
    if (response.ok) {
        Alert.alert('Activity Level Updated Successfully!');
    }
    }
    catch (error) {
    console.error('Error posting data:', error);
    } 
  }
 
}


/**
 * Purpose: Display bthe forbidden foods to the user
 * @returns: View with the forbidden foods 
 */
function ForbiddenFoods() {
  // Variables for the current food entered and total food entered
  const [newFood, setNewFood] = useState('');
  const [data, setData] = useState([]);



    // Fetch the Forbidden Foods from the db
    useEffect(() => {
        fetch(routes.GET_FORBIDDEN_FOOD)
        .then((response) => response.json())
        .then((result) => {
        setData(result.forbiddenIngredients);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    })




    // Individual added food items that show up on screen
    const renderItem = ({ item }) => (
        <View style={styles.item}>
        <Text>{item}</Text>
        <TouchableOpacity onPress={() => removeForbiddenIngredient(item)} style={styles.removeButton}>
            <Text style={{color: 'red'}}>Remove</Text>
        </TouchableOpacity>
        </View>
    );
    
    
    return (
        <View style={styles.verticalView} >

            <View style={styles.inputContainer}>
                
                <Text style={styles.inputFieldTitle}>
                Food Name:
                </Text>
                <TextInput
                style={styles.input}
                placeholder="Enter food name..."
                value={newFood}
                onChangeText={(food) => setNewFood(food)}
                />
                <TouchableOpacity onPress={() => {
                            addForbiddenIngredient(newFood)
                            setNewFood('')
                    }} style={styles.bottomButton}>
                <Text style={styles.mealText}>Add</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.blackBorder}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                />
            </View>

      
        </View>


    );
}

/**
 * Purpose: Add a forbidden food to the user's forbidden foods
 * @param {*} ingredient : Food to add
 */
const addForbiddenIngredient = async(ingredient) => {
    const data = {
        ingredient
    };


  // Send the data to the database
  try {
    const response = await fetch(routes.ADD_FORBIDDEN_FOOD, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });


    if (!response.ok) {
        Alert.alert('Error adding forbidden food');
    }
  }
  catch (error) {
    console.error('Error posting data:', error);
  }
  
}


/**
 * Purpose: Remove a forbidden food from the user's forbidden foods
 * @param {*} ingredient : Food to be removed
 */
const removeForbiddenIngredient = async(ingredient) => {
    const data = {
        ingredient
    };


  // Send the data to the database
  try {
    const response = await fetch(routes.REMOVE_FORBIDDEN_FOOD, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });


    if (!response.ok) {
        Alert.alert('Error removing forbidden food');
    }
  }
  catch (error) {
    console.error('Error posting data:', error);
  }
  
}



/**
 * Purpose: Show the user's last entered weight
 */
function ShowMyWeight({navigation}) {

    // Load in the data from the database
    const [data, setData] = useState([]);

    // Load in the data every time it changes
    useEffect(() => {
        fetch(routes.GET_WEIGHTS)
        .then((response) => response.json())
        .then((result) => {
        setData(result);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    })


    return (
        <View style={styles.verticalView}>
            <ImageBackground
                //source={require('../pictures/foodBackground.jpg')}
                style={styles.verticalView}
            >

                <FlatList
                    data={data}

                    renderItem={({item}) => (
                        <View style={{flex: 1}}>

                        <View style={styles.weightBox}>
                            <Text style={styles.weightTitleText} >
                                Current Weight:
                            </Text>

                            <View style={styles.separator} />

                            <Text style={styles.weightText}>
                                {item.currentWeight.weight} kg
                            </Text>

                            <View>
                                <Text>

                                </Text>
                            </View>
   
                        </View>

                        
                        <View style={styles.weightBoxSeparator} />


                        <View style={styles.weightBox}>
                        
                            <Text style={styles.weightTitleText} >
                                Previous Weight:
                            </Text>
                            

                            <View style={styles.separator} />

                            <Text style={styles.weightText}>
                                {item.previousWeight.weight} kg
                            </Text> 

                            <View>
                                <Text>
                                    
                                </Text>
                            </View>
 
                        </View>


                        <View style={styles.weightBoxSeparator} />


                        <View style={styles.weightBox}>
                            <Text style={styles.weightTitleText} >
                                Goal Weight:
                            </Text>

                            <View style={styles.separator} />

                            <Text style={styles.weightText}>
                                {item.goalWeight} kg
                            </Text>

                            <View>
                                <Text>
                                    
                                </Text>
                            </View>
   
                        </View>

                    </View>
                    )}


                />


            </ImageBackground>

            <View style={styles.bottomButton}>
                <Button
                title="Update Weight"
                color='black'
                onPress={() => Alert.prompt("Enter Weight", '', (value) => UpdateWeight(value, navigation), 'plain-text', '', 'number-pad')}
                />
            </View>
            <View style={styles.bottomButton}>
                <Button
                title="Enter Goal Weight"
                color='black'
                onPress={() => Alert.prompt("Enter Goal Weight", '', (value) => UpdateGoalWeight(value, navigation), 'plain-text', '', 'number-pad')}
                />
            </View>
        </View>
    );
}

/**
 * Purpose: Update the user's goal weight
 * @param {*} goalWeight : New goal weight
 */
const UpdateGoalWeight = async(goalWeight) => {
    // Group the data
    const data = {
      goalWeight
    };


    if (parseInt(goalWeight) < 40) {
      Alert.alert("Invalid goal weight. Weight must be greater than 40 kg.");
    }
    else {
      // Send the data to the database
      try {
        const response = await fetch(routes.SET_GOAL_WEIGHT, {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
    
    
        if (response.ok) {
          Alert.alert('Weight Updated Successfully!');
        }
        else {
          Alert.alert('Error updating weight');
        }
      }
      catch (error) {
        console.error('Error posting data:', error);
      }
    }
  
}


/**
 * Purpose: Update the user's current weight
 * @param {*} weight : New weight for the user
 */
const UpdateWeight = async(weight) => {
        // Group the data
  const data = {
    weight
  };

  if (parseInt(weight) < 20) {
    Alert.alert("Invalid weight. Weight must be greater than 20 kg.");
  }
  else {

  
  

    // Send the data to the database
    try {
      const response = await fetch(routes.ADD_WEIGHT, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });


      if (response.ok) {
        Alert.alert('Weight added Successfully!');
      }
      else {
        Alert.alert('Error adding weight');
      }
    }
    catch (error) {
      console.error('Error posting data:', error);
    }
  }


}

// Navigation function
const stack = createNativeStackNavigator();
export function ProfileMain() {
  return (
      <stack.Navigator initialRouteName='Profile'>
        <stack.Screen name='Profile' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ProfileScreen} />
        <stack.Screen name='Forbidden Foods' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ForbiddenFoods} />
        <stack.Screen name="My Weight" options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowMyWeight} />
      </stack.Navigator>
  );
}