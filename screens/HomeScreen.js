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
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProgressCircle from 'react-native-progress-circle';

import { styles } from '../Styles.js';
import { routes } from '../Routes.js';




/**
 * Purpose: Display the home screen of the app including the user's nutrients for today and a button
 * to navigate to a screen that shows the user's daily intake goals
 */
function HomeScreen({ navigation }) {


    // Load in the data from the database
    const [data, setData] = useState([]);

    // Fetch the data every time it changes
    useEffect(() => {
      fetch(routes.NUTRIENTS_LOGGED_TODAY_URL)
      .then((response) => response.json())
      .then((result) => {
        setData(result.dailyNutrients);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    })


    

  // Display information
  return (

      <View style={styles.verticalView}>
        <View>
          <Text style={styles.titleText}>Welcome to MyWellnessBuddy!</Text>
 
        </View>
        
        <View style={styles.separator}/>

        <View style={styles.blackBorder} >
          <FlatList
            data={data}
            
            // Render each data item
            renderItem={({item}) => (
              <View style={styles.verticalView}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.titleText} >
                  Daily Totals:
                </Text>

                <View style={styles.separator}/>
                
                <Text style={styles.mealText}>
                  Calories: {Math.abs(item.totalNutrients.calories)} kcal
                </Text> 

                <View style={styles.separator}/>

                <Text style={styles.mealText}>
                  Carbohydrates: {Math.abs(item.totalNutrients.carbohydrates)} g
                </Text>

                <View style={styles.separator}/>

                <Text style={styles.mealText}>  
                  Fats: {Math.abs(item.totalNutrients.fats)} g
                </Text>

                <View style={styles.separator}/>

                <Text style={styles.mealText}>   
                  Protein: {Math.abs(item.totalNutrients.protein)} g
                </Text>
      
                <View style={styles.fill}></View>
      
          
              </View>
            </View>
            )}
          />
        </View>
        
        
        <View style={styles.bottomButton} >
          <Button
            title="Check How You Have Done Today"
            color="black"
            onPress={() => navigation.navigate('How Have You Done?')}
          />
        </View>
      </View>
   
  );
}

/**
 * Purpose: Screen for checking the nutrient intake of the user compared to their goals
 */
function NutrientCheck( {navigation }) {
  // Import all logged food nutrients here

  // Load in the data from the database
  const [data, setData] = useState([]);

  // Import the data every time it changes
  useEffect(() => {
    fetch(routes.NUTRIENTS_LOGGED_TODAY_URL)
    .then((response) => response.json())
    .then((result) => {
      setData(result.dailyNutrients);
      
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  })

 


  // Display nutrient info to the user
  return (
    <View style={styles.verticalView}>
      <View style={styles.blackBorder}>

      <FlatList
          data={data}
          
          renderItem={({item}) => (


          <View style={styles.progressCircle}>

            <Text style={styles.titleText} >
              Progress for Today!
            </Text>

            <View style={styles.separator}/>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={{alignItems:'right'}}>
                <ProgressCircle
                  percent={item.percentNutrients.caloriesPercentage}
                  radius={100}
                  borderWidth={15}
                  color="lightpink"
                  shadowColor="#999"
                  bgColor="#fff"
                
                  >
                    <Text style={{ fontSize: 30 }}>{item.percentNutrients.caloriesPercentage}%</Text>
                  </ProgressCircle>
                </View>
              <Text style={{fontSize: 22}}>
                Calories: {Math.abs(item.totalNutrients.calories)} kcal / {item.dailyGoals.calories} kcal
              </Text> 

              <View style={styles.separator}/>

              <ProgressCircle
                percent={item.percentNutrients.carbohydratesPercentage}
                radius={100}
                borderWidth={15}
                color="lightpink"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 30 }}>{item.percentNutrients.carbohydratesPercentage}%</Text>
              </ProgressCircle>
              <Text style={{fontSize: 22}}>
                Carbohydrates: {Math.abs(item.totalNutrients.carbohydrates)} g / {item.dailyGoals.carbohydrates} g
              </Text>  

              <View style={styles.separator}/>

              <ProgressCircle
                percent={item.percentNutrients.fatsPercentage}
                radius={100}
                borderWidth={15}
                color="lightpink"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 30 }}>{item.percentNutrients.fatsPercentage}%</Text>
              </ProgressCircle>
              <Text style={{fontSize: 22}}>  
                Fats: {Math.abs(item.totalNutrients.fats)} g / {item.dailyGoals.fats} g
              </Text>  

              <View style={styles.separator}/>

              <ProgressCircle
                percent={item.percentNutrients.proteinPercentage}
                radius={100}
                borderWidth={15}
                color="lightpink"
                shadowColor="#999"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 30 }}>{item.percentNutrients.proteinPercentage}%</Text>
              </ProgressCircle>
              <Text style={{fontSize: 22}}>   
                Protein: {Math.abs(item.totalNutrients.protein)} g / {item.dailyGoals.protein} g
              </Text>                                   
    
              <View style={styles.fill}></View>


            </View>
          </View>
          )}
        />

      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

/**
 * Purpose: Create the main naviagtion
 */
export function MainHomeScreen() {
  return (

    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: true}}>
        <Stack.Screen name='Home' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={HomeScreen} />
        <Stack.Screen name='How Have You Done?' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={NutrientCheck} />
    </Stack.Navigator>
    
);  
}
