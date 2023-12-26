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

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from '../Styles.js'
import filter from 'lodash.filter';

import { routes } from '../Routes.js';

/**
 * Purpose: Show the user the food from the database
 */
function ShowFood ( {navigation} ) {

    // Create variables to hold data
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    // Fetch the data every time it changes
    useEffect(() => {
      // Fetch data and set loading circle
      setIsLoading(true);
      fetchData(routes.FOOD_URL);
    }, []);
  
    /**
     * Purpose: Fetch data from a specified url
     */
    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // Set initial data
        setData(json.foodItems);
  
        // Set the full data
        setFullData(json.foodItems);
        setIsLoading(false);
  
      } catch(error) {
        setError(error);
      }
    } 

    

    /**
     * Purpose: Filter the foods that contain the user's input query
     */
    const handleSearch = (query) => {
      setSearchQuery(query); 
      const formattedQuery = query.toLowerCase();
      const filteredData = filter(fullData, (user) => {
        return contains(user, formattedQuery);
      });
      setData(filteredData);
      
    }
  
    /**
     * Purpose: Check if foods in the database contain the user's query
     */
    const contains = ({foodName}, query) => {
      const food = foodName.toLowerCase();
  
      if (food.includes(query)) {
        return true;
      }
    
      return false;
    
    }
  

    // Display loading circle if food is still being loaded in from the database
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="lightpink" />
        </View>
      );
    }
  
    // Check if an error occured when fetching data
    if (error) {
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Text>
          Error is loading!
        </Text>
      </View>   
    }



    // Internal function to show the user's logged food 
    const LoggedFood = ({title, calories}) => (
      <View style={styles.mealItem}>
        <TouchableOpacity onPress={() => addUserFood(title, navigation)} style={{flexDirection: 'row'}}>
          <Text style={styles.mealText}>
            {title}
          </Text>

          <View style={styles.fill}></View>

          <Text style={styles.calorieText}>
            Calories: {calories}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator}/>
      </View>
      
    );
  
  
    // Display the food and the search bar for food
    return (
      <View style={styles.verticalView}>
        
        <TextInput
          placeholder='Search'
          clearButtonMode='always'
          style={styles.searchBox}
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />  
        <View style={styles.blackBorder}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.Name}
            renderItem={({item}) => <LoggedFood title={item.foodName} calories={item.nutritionalInformation.calories}/>}
          />
        </View>
  
      </View>  
    );
  }

  /**
   * Purpose: Add a meal/food to the user's log for today
   */
  const addUserFood = async(mealName, navigation) => {

    // Format the data
    const data = {
      mealName
    }

    // Push the data to the database
    try {
      const response = await fetch(routes.LOG_MEAL_URL, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
  
      if (response.ok) {
      }
      else {
        Alert.alert('Error adding food');
      }
    }
    catch (error) {
      console.error('Error posting data:', error);
    }
  
    // Navigate back to the log food screen
    navigation.navigate('Log Food');
  
  }

  /**
   * Purpose: Show the user's logged food for today
   */
  function UserPage({ navigation }) {
    const [data, setData] = useState([]);
  
    const fetchData = () => {
      fetch(routes.GET_LOGGED_MEALS_URL)
        .then((response) => response.json())
        .then((result) => {
          setData(result.meals);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchData();
      });
  
      return unsubscribe;
    }, [navigation]);
  
    const LoggedFood = ({ title, calories }) => (
      <View>

        <View style={{flexDirection: 'row'}}>
        
          <View style={{}}>
            <Text style={styles.mealText}>{title}</Text>
            <Text style={styles.calorieText}>Calories: {calories}</Text>
          </View>

          <View style={styles.fill}></View>
          
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => removeFood(title, navigation)} style={styles.removeButton}>
              <Text style={{color: 'red'}}>Remove</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.separator}/>

      </View>
    );





  /**
   * Purpose: Remove a food from the user's logged food
   */
      const removeFood = async(Name, navigation) => {
        // Format the data
        const data = {
          Name
        }
  
        // Push the data to the database
        try {
          const response = await fetch(routes.REMOVE_FOOD, {
            method: 'post',
            mode: 'no-cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
      
      
        if (!response.ok) {
          Alert.alert('Error removing food');
        }
        }
        catch (error) {
          console.error('Error posting data:', error);
        }
  
        fetchData();
        
        
        navigation.navigate('Log Food');
      }

  
    return (
      <View style={styles.verticalView}>
        <View style={styles.blackBorder}>
          <View style={styles.verticalView}>
            <FlatList 
              data={data} 
              keyExtractor={(item) => item.Name}
              renderItem={({ item }) => <LoggedFood title={item.Name} calories={item.Nutrients.calories} />} 
            />
          </View>
        </View>
  
        <View style={styles.bottomButton}>
          <Button title="Add Food" color="black" onPress={() => navigation.navigate('Food')} />
        </View>
  
        <View style={styles.bottomButton}>
          <Button title="Add Food from Meal List" color="black" onPress={() => navigation.navigate('Meals')} />
        </View>
      </View>
    );
  }




  



  

  /**
   * Purpose: Show the user's created meals
   */
  function ShowMeals( {navigation} ) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    // Fetch the user's meals every time they change
    useEffect(() => {
      // Fetch data and set loading circle
      setIsLoading(true);
      fetchData(routes.GET_MEALS_URL);
    }, []);
  
    // Internal function to fetch the data
    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // Set initial data
        setData(json.myMeals);
  
        // Set the full data
        setFullData(json.myMeals);
        setIsLoading(false);
  
      } catch(error) {
        setError(error);
      }
    } 

    

    // Function to filter the meals that follow a user query
    const handleSearch = (query) => {
      setSearchQuery(query); 
      const formattedQuery = query.toLowerCase();
      const filteredData = filter(fullData, (user) => {
        return contains(user, formattedQuery);
      });
      setData(filteredData);
    }
  

    // Function that checks if a meal name contains the user's query
    const contains = ({Name}, query) => {

      const name = Name.toLowerCase();
  
      if (name.includes(query)) {
        return true;
      }
    
      return false;
    
    }
  
    // Display the loading circle if the data is still being loaded in
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="lightpink" />
        </View>
      );
    }
  
    // Catch when an error occurs
    if (error) {
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Text>
          Error is loading!
        </Text>
      </View>   
    }

    // Internal function to show the user's logged food 
    const LoggedFood = ({title, calories}) => (
      <View style={styles.mealItem}>
        <TouchableOpacity onPress={() => addUserFood(title, navigation)} style={{flexDirection: 'row'}}>
          <Text style={styles.mealText}>
            {title}
          </Text>

          <View style={styles.fill}></View>

          <Text style={styles.calorieText}>
            Calories: {calories}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      
    );
  
  
    // Show the user's meal and a search bar for meals
    return (
      <View style={styles.verticalView}>
        
        <TextInput
          placeholder='Search'
          clearButtonMode='always'
          style={styles.searchBox}
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />  
        <View style={styles.blackBorder}>
          <FlatList
            data={data}
            renderItem={({item}) => <LoggedFood title={item.Name} calories={item.Nutrients.calories}/>}
          />
        </View>
      </View>  
    );
  }




const stack = createNativeStackNavigator();

/**
 * Purpose: Create the main naviagtion between screens in the Log Food screen
 */
export function MainLogFood() {
    return (
        <stack.Navigator initialRouteName='Log Food' screenOptions={{headerShown: true}}>
            <stack.Screen name='Log Food' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={UserPage} />
            <stack.Screen name='Food' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowFood} />
            <stack.Screen name='Meals' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowMeals} />
        </stack.Navigator>
        
    );
}
