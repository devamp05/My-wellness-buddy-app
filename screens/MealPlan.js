/*********************************************/
/*********************************************/
/*                                           */
/*               UNUSED FILE                 */
/*                                           */
/*********************************************/
/*********************************************/




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

import { routes } from '../Routes.js';
import {styles} from '../Styles.js'


const Stack = createNativeStackNavigator();
const Separator = () => <View style={styles.separator} />;


export function MainMealPlan() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Meal Plan" options={{headerStyle: {backgroundColor: 'lightpink'}}} component={MealPlan} />
            <Stack.Screen name="My Weight" options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowMyWeight} />
        </Stack.Navigator>
    );
}

/* Create and display the user's meal plan */
function MealPlan({navigation}) {
    // Data for the days of the week
    const DATA = [
        {
        id: 'a',
        title: 'SUNDAY',
        },
        {
        id: 'b',
        title: 'MONDAY',
        },
        {
        id: 'c',
        title: 'TUESDAY',
        },
        {
        id: 'd',
        title: 'WEDNESDAY',
        },
        {
        id: 'e',
        title: 'THURSDAY',
        },
        {
        id: 'f',
        title: 'FRIDAY',
        },
        {
        id: 'g',
        title: 'SATURDAY',
        },
    ];

    // Render in the different meals for each day
    const Item = ({title}) => (
        <View>
            <Text style={styles.centerTitle}>
                {title}
            </Text>
            <View>
                <View style={styles.horizontalLayout}>
                    <Text style={styles.mealText}>
                        Breakfast:
                    </Text>
                    <Button
                        title='+'
                        onPress={() => {}}
                    />
                </View>
                <View style={styles.horizontalLayout}>
                    <Text style={styles.mealText}>
                        Lunch:
                    </Text>
                    <Button
                        title='+'
                    />
                </View>
                <View style={styles.horizontalLayout}>
                    <Text style={styles.mealText}>
                        Dinner:
                    </Text>
                    <Button
                        title='+'
                    />
                </View>
                
            </View>
            <Separator/>
        </View>
      );

    return (
        <View style={styles.verticalView}>
            


            <View style={styles.blackBorder}>
                <View style={{padding: 10}}>
                    <FlatList
                        data={DATA}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <Item title={item.title} />}
                    />
                </View>
            </View>

            <View style={styles.bottomButton}>
                <Button
                title="Check My Weight"
                color='black'
                onPress={() => navigation.navigate("My Weight")}
                
                />
            </View>
    
                
            
        </View>
    );
}

/**
 * Purpose: Show the user's last entered weight
 */
function ShowMyWeight({navigation}) {

    const sampleData = [{"currentWeight": 150, "previousWeight": 170, "goalWeight": 160}];

    return (
        <View style={styles.verticalView}>
            <ImageBackground
                //source={require('../pictures/foodBackground.jpg')}
                style={styles.verticalView}
            >

                <FlatList
                    data={sampleData}

                    renderItem={({item}) => (
                        <View style={{flex: 1}}>

                        <View style={styles.weightBox}>
                            <Text style={styles.weightTitleText} >
                                Current Weight:
                            </Text>

                            <View style={styles.separator} />

                            <Text style={styles.weightText}>
                                {item.currentWeight} lbs
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
                                {item.previousWeight} lbs
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
                                {item.goalWeight} lbs
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
        </View>
    );
}


/* Function to update the weight of the user based on user input */
const UpdateWeight = async(newWeight, navigation) => {
        // Group the data
  const data = {
    newWeight
  };
  

  // Send the data to the database
  try {
    const response = await fetch(UPDATE_WEIGHT_URL, {
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
    console.error('Error posting data in updateWeight:', error);
  }

  // Navigate back to the Weight page
  navigation.navigate('My Weight');
}

