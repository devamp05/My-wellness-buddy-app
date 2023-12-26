import React, {useState, useEffect, useRef} from 'react';
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
  ScrollView,
  FlatList,
  TextComponent,
  ActivityIndicator
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, useFocusEffect } from '@react-navigation/native';

import { styles } from '../Styles.js';
import { routes } from '../Routes.js';

import filter from 'lodash.filter';

/**
 * Purpose: Show the main cookbook screen to the user
 */
function CookbookScreen({ navigation }) {
  // Define all the data needed
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data
  const fetchData = () => {
    fetch(routes.GET_MEALS_URL)
      .then((response) => response.json())
      .then((result) => {
        setData(result.myMeals);
        
        setRefreshing(false); // Set refreshing to false when the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setRefreshing(false); // Set refreshing to false if there's an error
      });
  };

  // Use the useFocusEffect hook to fetch data when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      setRefreshing(true); // Set refreshing to true before fetching data
      fetchData();
    }, [])
  );

  
    

  // Internal function to show the user's logged food 
  const LoggedFood = ({title, ingredients, calories, protein, carbohydrates, fats, instruction}) => ( 

    <View style={styles.mealItem}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Meal Information', {title, ingredients, calories, protein, carbohydrates, fats, instruction})}
        >
          <Text style={styles.mealText}>
            {title}
          </Text>

        </TouchableOpacity>


          <View style={styles.fill}></View>

          <Text style={styles.calorieText}>
            Calories: {calories}
          </Text>

        
      </View>
    </View>
  );

  

  return (
  <View style={styles.verticalView}>

    
    <Text style={styles.titleText}>
      My Meals 
    </Text>

    
    <View style={styles.separator}/>
    

    <View style={styles.blackBorder}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LoggedFood
              title={item.Name}
              ingredients={item.ingrdients}
              calories={item.Nutrients.calories}
              protein={item.Nutrients.protein}
              carbohydrates={item.Nutrients.carbohydrates}
              fats={item.Nutrients.fats}
              instruction={item.instruction}
            />
          )}
          refreshing={refreshing}
          onRefresh={fetchData} // Pull-to-refresh functionality
        />
      </View>


    <View style={styles.bottomButton} >
      <Button
            title="Create Meal"
            color='black'
            onPress={() => navigation.navigate('Create Meal')}
      />
    </View>
    <View style={styles.bottomButton} >
      <Button
            title="Pantry"
            color='black'
            onPress={() => navigation.navigate('Pantry')}
      />
    </View>
    <View style={styles.bottomButton} >
      <Button
            title="Meal Plan"
            color='black'
            onPress={() => navigation.navigate('Meal Plan')}
      />
    </View>    


  </View>
  );
}

/**
 * Purpose: Show the nutrients of a given food
 */
function ShowMealInfo({route}) {
  return (

    <View style={styles.verticalView} >

        <View>

            <Text style={styles.mealInfoText}>
                Meal Name: {route.params.title}
            </Text>

        </View> 

        <View>

            <Text style={styles.mealInfoText}>
                Calories: {route.params.calories} kcal
            </Text>

        </View> 

        <View>

            <Text style={styles.mealInfoText}>
                Protein: {route.params.protein} g
            </Text>

        </View> 

        <View>

            <Text style={styles.mealInfoText}>
                Carbohydrates: {route.params.carbohydrates} g
            </Text>

        </View> 


        <View>

            <Text style={styles.mealInfoText}>
                Fats: {route.params.fats} g
            </Text>

        </View>  

        <View style={styles.separator}/> 

        <View>

            <Text style={styles.instructionText}>
                {route.params.instruction}
            </Text>

        </View>  

        <View style={styles.separator}/>                           

        <View style={styles.blackBorder} >
          
        <FlatList
            data={route.params.ingredients}
            
            // Render each data item
            renderItem={({item}) => (
            <View style={styles.verticalView}>
            <View style={{flexDirection: 'column'}}>
                
                <Text style={styles.mealText}>
                {item}
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

/**
 * Purpose: Show the user the screen for creating a new meal
 */
function CreateMeal( {navigation} ) {

  // Variables for the current food entered and total food entered
  const [foodList, setFoodList] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealInstructions, setMealInstructions] = useState('');
  const [newFood, setNewFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);

  // Add food to the list
  const addFood = () => {
    if (newFood.trim() !== '') {
      setFoodList([...foodList, newFood]);
      setNewFood('');
    }
  };

  
  // Remove food from the list
  const removeFood = (foodName) => {
    setFoodList(foodList.filter(food => food !== foodName));
  };

  // Individual added food items that show up on screen
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => removeFood(item)} style={styles.removeButton}>
        <Text style={{color: 'red'}}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.verticalView}>

      
      <View style={styles.container}>
        <Text style={styles.inputFieldTitle}>
          Meal Name:
        </Text>
        
        <TextInput style={styles.input}
          placeholder="Enter meal name..."
          onChangeText={(text) => setMealName(text)}
          >
        </TextInput>
      </View>
      <View style={{flexDirection: 'row'}}>

        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18}}>
            Calories
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Text style={styles.macroText}>
            Carbs
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Text style={styles.macroText}>
            Protein
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Text style={styles.macroText}>
            Fat
          </Text>
        </View>

      </View>


      <View style={{flexDirection: 'row'}}>


        <TextInput // Calories
          style={styles.textInput}
          keyboardType = 'numeric'
          placeholder='kcal'
          onChangeText={(cal) => setCalories(cal)}
        /> 
        <TextInput // Carbs
          style={styles.textInput}
          keyboardType = 'numeric'
          placeholder='g'
          onChangeText={(carb) => setCarbs(carb)}
        /> 
        <TextInput // Protein
          style={styles.textInput}
          keyboardType = 'numeric'
          placeholder='g'
          onChangeText={(prot) => setProtein(prot)}
        /> 
        <TextInput // Fats
          style={styles.textInput}
          keyboardType = 'numeric'
          placeholder='g'
          onChangeText={(fats) => setFats(fats)}
          
        /> 

      </View>

      <View style={styles.separator}></View>

      <View style={styles.instruction}>
        
        <Text style={styles.inputFieldTitle}>
          Instructions:
        </Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Enter recipe instructions..."
          value={mealInstructions}
          onChangeText={(food) => setMealInstructions(food)}
        />
      </View>
      
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
                    addFood(newFood)
              }} style={styles.bottomButton}>
          <Text style={styles.mealText}>Add</Text>
        </TouchableOpacity>
      </View>

      


      <View style={styles.blackBorder}>
        <FlatList
          data={foodList}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
        />
      </View>

      <View style={styles.bottomButton} >
        <Button
              title="Create Meal"
              color='black'
              onPress={() => addMeal(mealName, mealInstructions, foodList, calories, protein, carbs, fats, navigation)}
        />
      </View>


    </View>
  );

  
}


/**
 * Purpose: Write the data gathered from the user to the database
 */
const addMeal = async(Name, Instruction, Ingrdients, Calories, Protein, carbohydrates, fats, navigation) => {

  // Group the data
  const data = {
    Name,
    Ingrdients,
    Instruction,
    Calories,
    Protein,
    carbohydrates,
    fats,
  };

  // Check if the data is valid
  if (Name == "" || Ingrdients == [] || Calories == 0 || carbohydrates == 0 || fats == 0) {
    Alert.alert("Invalid meal. Please fill out the required information.")
  }
  else {
    // Send the data to the database
    try {
      const response = await fetch(routes.ADD_CUSTOM_MEAL, {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });


      if (response.ok) {
        Alert.alert('Meal added Successfully!');
      }
      else {
        Alert.alert('Error adding meal');
      }
    }
    catch (error) {
      console.error('Error posting data:', error);
    }

    

    // Navigate back to the Cookbook page
    navigation.navigate('Cookbook');
  }

}

/**
 * Purpose: Show the user the pantry screen
 */
function PantryScreen( {navigation} ) {
  // Variables for the current food entered and total food entered
  const [newFood, setNewFood] = useState('');
  const [data, setData] = useState([]);


  
  // Load in the data every time it changes
  useEffect(() => {
    fetch(routes.GET_PANTRY_FOOD)
    .then((response) => response.json())
    .then((result) => {
    setData(result.pantryFoods);
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
  })  


    // Individual added food items that show up on screen
    const renderItem = ({ item }) => (
        <View style={styles.item}>
        <Text>{item}</Text>
        <TouchableOpacity onPress={() => removePantryFood(item)} style={styles.removeButton}>
            <Text style={{color: 'red'}}>Remove</Text>
        </TouchableOpacity>
        </View>
    );
    
    
    return (
        <View style={styles.verticalView} >
            <View>
              <Text style={styles.titleText} >
                Enter the Foods You Have in Your Pantry!
              </Text>
            </View>

            <View style={styles.separator}/>

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
                            addPantryFood(newFood)
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

            <View style={styles.bottomButton} >
                <Button
                title="Find Meals With All Ingredients"
                color="black"
                onPress={() => navigation.navigate('Meals Containing All Ingredients')}
                />
            </View>
            <View style={styles.bottomButton} >
                <Button
                title="Find Meals With At Least One Ingredient"
                color="black"
                onPress={() => navigation.navigate('Meals Containing One Ingredient')}
                />
            </View>

        </View>


    );  
}


/**
 * Purpose: Add a food to the user's pantry
 * @param {*} ingredient : Food to add to the pantry
 */
const addPantryFood = async(ingredient) => {
  const data = {
    ingredient
  };


  // Send the data to the database
  try {
  const response = await fetch(routes.ADD_PANTRY_FOOD, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
      Alert.alert('Error adding pantry food');
  }
  }
  catch (error) {
  console.error('Error posting data:', error);
  }
}


/**
 * Purpose: Remove a food from the user's pantry
 * @param {*} ingredient : Food to be removed
 */
const removePantryFood = async(ingredient) => {
  const data = {
    ingredient
  };


  // Send the data to the database
  try {
  const response = await fetch(routes.REMOVE_PANTRY_FOOD, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
      Alert.alert('Error removing pantry food');
  }
  }
  catch (error) {
  console.error('Error posting data:', error);
  }
}


/**
 * Purpose: Display all meals in which the user has at least one ingredient in their pantry
 */
function OneIngredient() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the user's meals every time they change
  useEffect(() => {
    // Fetch data and set loading circle
    setIsLoading(true);
    fetchData(routes.ONE_INGREDIENT_MEALS);
  }, []);

  // Internal function to fetch the data
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      // Set initial data
      setData(json.result);

      // Set the full data
      setFullData(json.result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  // Function to filter the meals that follow a user query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = fullData.filter((user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  // Function that checks if a meal name contains the user's query
  const contains = ({ Name }, query) => {
    const name = Name.toLowerCase();

    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  // Display the loading circle if the data is still being loaded in
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="lightpink" />
      </View>
    );
  }

  // Catch when an error occurs
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error is loading!</Text>
      </View>
    );
  }

  // Check if the result is an error message
  if (data.length === 1 && typeof data[0] === 'string' && data[0].startsWith('You do not have a meal with')) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{data[0]}</Text>
      </View>
    );
  }

  // Internal function to show the user's logged food
  const LoggedFood = ({ title, calories }) => (
    <View style={styles.mealItem}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
      >
        <Text style={styles.mealText}>{title}</Text>

        <View style={styles.fill} />

        <Text style={styles.calorieText}>Calories: {calories}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  // Show the user's meal and a search bar for meals
  return (
    <View style={styles.verticalView}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <View style={styles.blackBorder}>
        <FlatList
          data={data[0]}
          renderItem={({ item }) => <LoggedFood title={item.Name} calories={item.Nutrients.calories} />}
        />
      </View>
    </View>
  );
};


 



/**
 * Purpose: Display all the meals that contains ingredients that the user has in their pantry
 */
function AllIngredients() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the user's meals every time they change
  useEffect(() => {
    // Fetch data and set loading circle
    setIsLoading(true);
    fetchData(routes.ALL_INGREDIENT_MEALS);
  }, []);

  // Internal function to fetch the data
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      // Check if the result is an array with a single string element
      if (Array.isArray(json.result) && json.result.length === 1 && typeof json.result[0] === 'string') {
        // No meals found with specified ingredients
        setData([]);
      } else {
        // Set initial data
        setData(json.result);

        // Set the full data
        setFullData(json.result);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  // Function to filter the meals that follow a user query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  // Function that checks if a meal name contains the user's query
  const contains = ({ Name }, query) => {
    const name = Name.toLowerCase();

    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  // Display the loading circle if the data is still being loaded in
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="lightpink" />
      </View>
    );
  }

  // Catch when an error occurs
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  // Internal function to show the user's logged food
  const LoggedFood = ({ title, calories }) => (
    <View style={styles.mealItem}>
      <TouchableOpacity style={{ flexDirection: 'row' }}>
        <Text style={styles.mealText}>{title}</Text>

        <View style={styles.fill}></View>

        <Text style={styles.calorieText}>Calories: {calories}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  // Show the user's meal and a search bar for meals
  return (
    <View style={styles.verticalView}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      {data.length === 0 ? (
        <Text>No meals found with the specified ingredients.</Text>
      ) : (
        <View style={styles.blackBorder}>
          <FlatList data={data} renderItem={({ item }) => <LoggedFood title={item.Name} calories={item.Nutrients.calories} />} />
        </View>
      )}
    </View>
  );
}



/* Create and display the user's meal plan */
function MealPlanScreen({navigation}) {

  // Retrieve the meal plan
  const [data, setData] = useState([]);

  // Load in the data every time it changes
  useEffect(() => {
    fetch(routes.GET_MEAL_PLAN)
    .then((response) => response.json())
    .then((result) => {
    setData(result.mealPlan);
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
  })  





  return (
    <View style={styles.verticalView}>
      
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.titleText}>{item.Day}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('My Meals', {day: item.Day})} style={styles.bottomButton}>
                <Text style={styles.mealText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.blackBorder}>
              {item.Meals.map(meal => (
                <View key={meal._id} style={styles.item}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Meal Information', {
                      title: meal.Name,
                      ingredients: meal.ingrdients,
                      calories: meal.Nutrients.calories,
                      protein: meal.Nutrients.protein,
                      carbohydrates: meal.Nutrients.carbohydrates,
                      fats: meal.Nutrients.fats,
                      instruction: meal.instruction,
                    })}
                  >
                    <Text>{meal.Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeMealFromMealPlan(item.Day, meal.Name)}>
                    <Text style={{ color: 'red' }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      />
   
    <View style={styles.bottomButton} >
      <Button
            title="Random Meal Plan"
            color='black'
            onPress={() => generateRandomMealPlan()}
      />
    </View>
      
    </View>
    
  );
};


/**
 * Purpose: Generate a new meal plan for the user
 */
const generateRandomMealPlan = async() => {
  Alert.alert(
    'Are you sure?',
    'This will override your curent meal plan and may take a few seconds.',
    [
      {
        text: 'Yes',
        style: 'cancel',
        onPress: () => {
          // Handle the action when the user presses 'Yes'
          fetch(routes.GENERATE_MEAL_PLAN)
        },
      },
      {
        text: 'No',
      },
    ],
    { cancelable: false }
  );
  
}


/**
 * Purpose: Add a meal to the meal plan
 */
const addMealToMealPlan = async(day, mealName, navigation) => {
  const data = {
    day, 
    mealName,
  };


  // Send the data to the database
  try {
  const response = await fetch(routes.ADD_TO_MEAL_PLAN, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
      Alert.alert('Error adding meal to meal plan');
  }
  }
  catch (error) {
  console.error('Error posting data:', error);
  }  

  navigation.navigate('Meal Plan');
}


/**
 * Purpose: Remove a meal from the meal plan
 */
const removeMealFromMealPlan = async(day, mealName) => {
  const data = {
    day, 
    mealName,
  };


  // Send the data to the database
  try {
  const response = await fetch(routes.REMOVE_FROM_MEAL_PLAN, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
      Alert.alert('Error adding meal to meal plan');
  }
  }
  catch (error) {
  console.error('Error posting data:', error);
  }  

 
}



  /**
   * Purpose: Show the user's created meals
   */
  function ShowMeals( {route, navigation} ) {
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
        <TouchableOpacity onPress={() => addMealToMealPlan(route.params.day, title, navigation)} style={{flexDirection: 'row'}}>
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


// Navigation function
const stack = createNativeStackNavigator();
export function CookbookMain() {
  return (
      <stack.Navigator initialRouteName='Cookbook' >
        <stack.Screen name='Cookbook' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={CookbookScreen} />
        <stack.Screen name='Create Meal' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={CreateMeal} />
        <stack.Screen name='Meal Plan' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={MealPlanScreen} />
        <stack.Screen name='My Meals' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowMeals} />
        <stack.Screen name='Pantry' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={PantryScreen} />
        <stack.Screen name='Meal Information' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={ShowMealInfo} />
        <stack.Screen name='Meals Containing One Ingredient' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={OneIngredient} />
        <stack.Screen name='Meals Containing All Ingredients' options={{headerStyle: {backgroundColor: 'lightpink'}}} component={AllIngredients} />
      </stack.Navigator>
  );
}


    