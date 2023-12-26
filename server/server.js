const Event = require("./Event");
const User = require("./User");
const Calendar = require("./Calendar");
const LogBook = require("./LogBook");


const express = require('express');
const bodyParser = require("body-parser");


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://team34:cmpt370@cluster0.hjo6ufs.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// User _id of our test user
const { ObjectId } = require('mongodb');
const e = require("express");
const Meal = require("./Meal");
const Goal = require("./Goal");
const Nutrients = require("./Nutrients");
const Pantry = require("./Pantry");
const MealManager = require("./MealManager");

const userId = new ObjectId('655842a19195a637390cf490');

const mealManagerId = new ObjectId('65627c2236d280501388519d');


const app = express();

app.use(bodyParser.json());


// server.js code starts

// route for add ForbiddenIngredient
app.post('/addForbiddenIngredient', async(req, res)  => 
{
  var ingredient = req.body.ingredient;

  // get the user
  const ourUser = await findDocument(userId);

  if (ourUser==undefined){
    res.send("findDocument(): gets undefined when trying to get the user!");
  }

  ourUser.pantry.addForbiddenIngredient(ingredient);
  await updateDocument(userId, ourUser);
  res.send("ok");
});


// route for remove ForbiddenIngredient
app.post('/removeForbiddenIngredient', async (req, res)=>
{
    var ingredient = req.body.ingredient; 

    // get the user
    const ourUser = await findDocument(userId);

    if (ourUser==undefined){
      res.send("findDocument(): gets undefined when trying to get the user!");
    }

    ourUser.pantry.removeForbiddenIngredient(ingredient);
    await updateDocument(userId, ourUser);

    res.send("ok");

});

// route for get all ForbiddenIngredients
app.get('/getForbiddenIngredient', async(req, res)  => 
{

  // get the user
  const ourUser = await findDocument(userId);

//   console.log(ourUser);

  var result = ourUser.pantry.forbiddeningredients;

  res.send({"forbiddenIngredients":result});
});

// route for add to GroceryList
app.post('/addGroceryList', async (req, res)=>
{
    var ingredient = req.body.ingredient; 
    var date = req.body.date;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var title = req.body.title;

    // get the user
    const ourUser = await findDocument(userId);

    if (ourUser==undefined){
      res.send("findDocument(): gets undefined when trying to get the user!");
    }

    ourUser.GroceryLists.addIngredients(ingredient,date,startTime,endTime,title);
    await updateDocument(userId, ourUser);

    res.send("ok");

});

// route for remove from GroceryList
app.post('/removeGroceryList', async (req, res)=>
{
    var ingredient = req.body.ingredient; 
    var title = req.body.title;

    // get the user
    const ourUser = await findDocument(userId);

    if (ourUser==undefined){
      res.send("findDocument(): gets undefined when trying to get the user!");
    }

    ourUser.GroceryLists.removeIngredient(ingredient,title);
    await updateDocument(userId, ourUser);

    res.send("ok");

});

// route for set new value to activity level
app.post('/setActivityLevel', async (req, res)=>
{
    var newActivityLevel = req.body.activityLevel; 

    // get the user
    const ourUser = await findDocument(userId);

    if (ourUser==undefined){
      res.send("findDocument(): gets undefined when trying to get the user!");
    }

    ourUser.activityLevel = parseInt(newActivityLevel);
    ourUser.generateNutritionGoal();
    await updateDocument(userId, ourUser);
    //idealConsumption(ourUser);

    res.send("ActivityLevel updated");
});

// route for geting activity level
app.get('/getActivityLevel', async(req, res)  => 
{

  // get the user
  const ourUser = await findDocument(userId);
  console.log(ourUser);
  
  // {"activityLevel":result.activityLevel}
  res.send({"activityLevel":ourUser.activityLevel});
});

// server.js code ends

// Pantry routes

// route for adding food to pantry
app.post('/addFoodToPantry', async(req, res)=>
{
    // get the user
    const ourUser = await findDocument(userId);

    const ingredient = req.body.ingredient;

    ourUser.pantry.addExistingIngredient(ingredient);

    await updateDocument(userId, ourUser);

    res.send('ok');
});

// route for removing food from pantry
app.post('/removeFoodFromPantry', async(req, res)=>
{
    // get the user
    const ourUser = await findDocument(userId);

    const ingredient = req.body.ingredient;

    ourUser.pantry.removeIngredient(ingredient);

    await updateDocument(userId, ourUser);

    res.send('ok');
});

// A route to get pantry foods
app.get('/getPantryFoods', async(req, res)=>
{
    // get the user
    const ourUser = await findDocument(userId);

    res.send({"pantryFoods": ourUser.pantry.ShowPantryFoods()});

});
// Pantry routes end

// MealManager routes

app.post('/createNewMeal', async(req, res)=>
{
    const mealManager = await findMealManager(mealManagerId);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        var Name = req.body.Name;
        var instruction = req.body.instruction;
        var ingredients = req.body.ingredients
        var Calories = req.body.Calories
        var Protein = req.body.Protein;
        var carbohydrates = req.body.carbohydrates;
        var fat = req.body.fat;

        mealManager.createNewMeal(Name, instruction, ingredients, Calories, Protein, carbohydrates, fat);

        await updateDocument(mealManagerId, mealManager);

        res.send('ok');
    }
});


app.post('/removeMeal', async(req, res) =>
{
    const mealManager = await findMealManager(mealManagerId);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        var Mealname = req.body.Mealname;

        mealManager.removeMeal(Mealname);

        await updateDocument(mealManagerId, mealManager);

        res.send('ok');
    }
});

app.post('/searchforMeal', async(req, res) =>
{
    const mealManager = await findMealManager(mealManagerId);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        var nameofMeal = req.body.nameofMeal;

        var meal = mealManager.searchforMeal(nameofMeal);

        res.send({"meal": [meal]});
    }
});


app.post('/checkIngredientwithPantry', async(req, res) =>
{
    const mealManager = await findMealManager(mealManagerId);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        var ingredient = req.body.ingredient;

        var result = mealManager.checkIngredientwithPantry(ingredient);

        res.send({"result": [result]});
    }
});


// This method is generating meal based on desired ingredients. All provided ingredinets must match
app.get('/generateMealBasedOnIngredientsMAX', async(req, res) =>
{
    const mealManager = await findMealManager(userId);
    // console.log(mealManager);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        //var ingredients = req.body.ingredients;
       //var ingredients="apple";

       //console.log(mealManager.generateMealBasedOnIngredientsMAX(ingredients));

        res.send({"result": [mealManager.generateMealBasedOnIngredientsMAX()]});
    }
});

//generates meal based on ingredinets and checks if all ingredinets are in pantry. 
// It will generate meal even if one ingredinet will match.
app.get('/generateMealBasedOnIngredientsMIN', async(req, res) =>
{
    const mealManager = await findMealManager(userId);
    if(mealManager == -1)
    {
        res.send('server error!');
    }
    else
    {
        //var ingredients = mealManager.Pantry.pantryfoods;

        res.send({"result": [mealManager.generateMealBasedOnIngredientsMIN()]});
    }
});


// MealManager routes ends here

app.post('/addCalendarEvent', async (req, res)  => 
{
    var date = req.body.date;
    var eventTitle = req.body.eventTitle;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;

    // var userId = req.body.userId;



    
    // const newEvent = new Event(date, eventTitle, startTime, endTime);

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // ourUser.sayHello();
        ourUser.Calendar.addCalendarEvent(date, eventTitle, startTime, endTime);

        // console.log(ourUser.myCalendar.Events);

        // // update the user in the database
        await updateDocument(userId, ourUser);


        // console.log("calling insertDocument")
        // console.log("document: ",documentToInsertEvent)

        // return the userid given by mongodb
        // var result = await insertEvent(documentToInsertEvent);
        // console.log(result);
        res.send("ok");
    }

});


// A route to all the user events
app.get('/getCalendarEvents', async (req, res)=>
{
    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        var formattedArray = {};

        ourUser.Calendar.Events.forEach(formatEvents);

        function formatEvents(userEvent)
        {
            // Format events array
            const d = userEvent.date;

            if(formattedArray[d])
            {
                // If an event already exists with that date, add the new event to that date's array
                formattedArray[d].push({event: userEvent.eventTitle,
                    startTime: userEvent.startTime,
                    endTime: userEvent.endTime})
            }
            else
            {
                formattedArray[d] = [
                                {event: userEvent.eventTitle,
                                startTime: userEvent.startTime,
                                endTime: userEvent.endTime}];
            }
        }

        res.send(formattedArray);
    }
});


app.get('/getFoodItems', async (req, res) =>
{
    // getFoodItems() returns an Array of all the food items in the database
    var foodDocument = await getFoodItems();
    if(foodDocument == -1)
    {
        res.send("Error! can't get foodItems");
    }
    else
    {
        // respond with a document with key foodItems and the array from getFoodItems() call as it's value
        res.send({"foodItems": foodDocument});
    }
});

app.post('/logMeal', async (req, res)  => 
{
    var mealName = req.body.mealName;

    // Get the meal for that name
    var newMeal = await findFoodItem(mealName);

    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);

    if(ourUser !== -1 )
    {
        if(newMeal === -1)
        {
            // search for the meal in the user's meals list if meal not in the database
            const mealIndexx = ourUser.Meals.findIndex(meal => meal.Name === mealName);
            newMeal = ourUser.Meals[mealIndexx];
        }
        ourUser.Logbook.logMeal(newMeal);

        // // update the user in the database
        await updateDocument(userId, ourUser);

        res.send("ok");
    }
    else
    {
        res.send("error! finding foddItem or user failed");
    }

});

// A route to get a list of all the meals logged today
app.get('/getMealsLoggedToday', async(req, res)=>
{
    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {

        // Get list of meals from the user's logbook

        // First get today's date in our format
        const d = new Date();

        let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();

        // create a document to return
        var response = {"meals": ourUser.Logbook.findLog(date).Meals};

        res.send(response);
    }
});

// A route to remove a meal logged today
app.post('/removeMealsLoggedToday', async(req, res)=>
{
    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // Get list of meals from the user's logbook

        // First get today's date in our format
        const d = new Date();

        let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();

        // Get the meal Name
        var Name = req.body.Name;

        // Get the meal for that name
        var newMeal = await findFoodItem(Name);

        if (newMeal === -1) {
            // search for the meal in the user's meals list if meal not in the database
            const mealIndexx = ourUser.Meals.findIndex(meal => meal.Name === Name);
            newMeal = ourUser.Meals[mealIndexx];
        }

        ourUser.Logbook.findLog(date).removeMeal(newMeal);

        // create a document to return
        // var response = {"meals": ourUser.Logbook.findLog(date).Meals};

        await updateDocument(userId, ourUser);

        res.send("ok");
    }
});

app.get('/nutrientsLoggedToday', async(req, res) =>
{
    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {    
        // Get list of meals from the user's logbook

        // First get today's date in our format
        const d = new Date();

        let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();

        let totalNutrients = ourUser.Logbook.findLog(date).totalNutrients;

        var idealNutrients = await idealConsumption(ourUser);

        if(totalNutrients)
        {
            totalNutrients.calories = (totalNutrients.calories).toFixed(2);
            totalNutrients.carbohydrates = (totalNutrients.carbohydrates).toFixed(2);
            totalNutrients.protein = (totalNutrients.protein).toFixed(2);
            totalNutrients.fats = (totalNutrients.fats).toFixed(2);
            const percentageDocument = {caloriesPercentage: ((totalNutrients.calories / idealNutrients.calories) * 100).toFixed(2),
                                        carbohydratesPercentage: ((totalNutrients.carbohydrates / idealNutrients.carbohydrates) * 100).toFixed(2),
                                        proteinPercentage: ((totalNutrients.protein / idealNutrients.protein) * 100).toFixed(2),
                                        fatsPercentage: ((totalNutrients.fats / idealNutrients.fats) * 100).toFixed(2)
                                        };
            // create a document to return
            var response = {"dailyNutrients": [{"totalNutrients": totalNutrients, "dailyGoals": idealNutrients, "percentNutrients": percentageDocument}]};
        }
        else
        {
            var response = {"dailyNutrients": [{"totalNutrients": {calories: 0,
                carbohydrates: 0,
                protein: 0,
                fats: 0}, "dailyGoals": idealNutrients, "percentNutrients": {caloriesPercentage: 0, carbohydratesPercentage: 0, proteinPercentage: 0, fatsPercentage: 0}}]};
        }

        res.send(response)   
    }
});


// A route to get a list of all the meals logged on date
// Requires date in string("DateMonthFullyear") all in numbers
app.get('/getMealsLoggedDate', async(req, res)=>
{
    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // Get list of meals from the user's logbook

        // First get date 
        let date = req.body.date;

        // create a document to return
        var response = {"meals": ourUser.Logbook.findLog(date).Meals};

        res.send(response);
    }
});


// A route to create a new User from Username and password
app.post('/createUser', async (req, res)=>
{
    var username = req.body.username;

    // Check if a User with given Username already exists

    if(userExists(username) == 1)
    {
        res.send("User already exists!");
    }
    else
    {
        // get the password 
        var password = req.body.password;

        // Genereate userHash
        const userhash = username + password;

        // Create a new user
        const newUser = new User(username, '', -1, -1, -1, userhash, '');


        // Insert initial User in the database

        const userId = await insertDocument(newUser);

        // return the userId to the front-end
        res.send(userId);
    }
});


// A route to set the user once inserted
app.post('/setUser', async (req, res) =>
{
    // First get the userId to retrieve the user
    var userId = req.body.userId;
    
    var id = new ObjectId(userId);

    const newUser = await findDocument(id);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {

        // Get other necessary fields for the user and insert it.

        var name = req.body.name;

        var age = req.body.age;

        var weight = req.body.weight;

        var height = req.body.height;

        var forbiddenIngredients = req.body.forbiddenIngredients;

        // set values for our newUser

        newUser.name = name;

        newUser.Age = age;

        newUser.Weight = weight;

        newUser.Height = height;

        newUser.forbiddenIngredients = forbiddenIngredients;

        // update the new user to the database

        await updateDocument(id, newUser);

        res.send("ok");
    }
});

// A route for getting user information
app.get('/getUserInfo', async(req, res) =>
{
    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        res.send({"userInfo": [{"userName": ourUser.Username, "name": ourUser.Name, "age": ourUser.Age, "height": ourUser.Height}]});
    }   
});


// A route to get userId from the database by user's username and password
app.get('/getUserId', async (req, res) => 
{
    // get the userName
    var username = req.body.username;

    // Check if userExists
    if(await userExists(username) == -1)
    {
        // If no user with the given username
        res.send("Invalid username!");
    }
    else
    {
        var password = req.body.password;

        var userHash = username + password;

        // get userId by that userhash
        var id = getUserId(userHash);

        if(id == -1)
        {
            // If there is no user with the given userHash then the password is incorrect
            res.send("Invalid password!");
        }
        else
        {
            res.send(id);
        }
    }
});


// A route to delete a user by it's id and password
app.get('/deleteUser', async (req, res) => 
{
    // get the userId
    var userId = new ObjectId(req.body.userId);

    // Get the password
    var password = req.body.password;

    const user = findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // because the frontend itself stores userId assuming it is always correct and there always exists a user with that id

        var givenHash = user.Username + password;

        // See if it matches the one that user has

        if(user.UserHash !== givenHash)
        {
            res.send('Invalid password!');
        }
        else
        {
            await deleteUser(user._id);

            res.send('user deleted!');
        }
    }
});

// A route to get a list of recipes based on ingredients we give
app.get('/mealsBasedOnFood', async (req, res) =>
{
    // get the userId
    // var userId = new ObjectId(req.query.userId);

    // get user from the database
    const ourUser = await findDocument(userId);
    
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {

        // get ingredient name from the frontend
        const ingredientName = req.query.ingredientName;

        // Get a list of recipes based on food we have and forbiddenIngredients
        const recipes = await findRecipesByIngredients(ingredientName, ourUser.forbiddenIngredients);

        // if there are any recipes based on that ingredient in the database return it else respond with "no recipes for given ingredient"
        if(recipes)
        {
            res.send({recipeList: recipes});
        }
        else
        {
            res.send("No recipe for given ingredient!");
        }
    }

});

app.get('/getAllMeals', async (req, res) => 
{
    const allRecipes = await getAllMeals();
    if(allRecipes == -1)
    {
        res.send("Error, can't get meals");
    }
    else
    {
        res.send({allRecipes: allRecipes});
    }
});


// A route to add custom Recipes for cookbook
app.post('/addCustomRecipe', async(req, res) =>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);

    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {

        // get name, instructions, ingredients and nutrients for the recipe

        // I think nutrients can be null if the user doesn't want to add nutrients himself
        var Name = req.body.Name; 
        var Ingrdients = req.body.Ingrdients; 
        // var Nutrients = req.body.Nutrients;
        var Instruction = req.body.Instruction;

        // Nutrients broken down into each seperate nutrient
        var Calories = req.body.Calories;
        var Protein = req.body.Protein; 
        var carbohydrates = req.body.carbohydrates; 
        var fats = req.body.fats;

        // Add the new meal to our users Meals list
        await ourUser.createMeal(Name, Instruction, Ingrdients, Calories, Protein, carbohydrates, fats);

        await updateDocument(userId, ourUser);

        res.send("ok");
    }

});


// A route to get all the custom Meals 
app.get('/getMyMeals', async(req, res)=>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);
    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // respond with our User's Meals list
        res.send({"myMeals": ourUser.Meals});
    }
});


// routes for accessing other User class methods
app.post('/logWater', async(req, res) => 
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }

    else
    {
        await ourUser.logWater();
        await updateDocument(userId, ourUser);

        res.send('ok');
    }
});

app.post('/createGoal', async(req, res) =>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // Nutrients broken down into each seperate nutrient
        var Calories = parseFloat(req.body.Calories);
        var Protein = parseFloat(req.body.Protein); 
        var carbohydrates = parseFloat(req.body.carbohydrates); 
        var fat = parseFloat(req.body.fat);

        var Weight = parseFloat(req.body.Weight);
        var Duration = parseFloat(req.body.Duration);

        await ourUser.createGoal(Calories, Protein, carbohydrates, fat, Weight, Duration);
        await updateDocument(userId, ourUser);

        res.send('ok');
    }

});

/*
Route for generating meal plan
returns: meal plan
*/
app.get('/generateMealPlan', async(req, res) =>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        await ourUser.suggestMealPlan();
        await updateDocument(userId, ourUser);
        res.send({"mealPlan": ourUser.MealPlan});
    }

});


/*
Route for retreiving a user's current meal plan
returns: meal plan
*/
app.get('/getMealPlan', async(req, res) =>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        res.send({"mealPlan": ourUser.MealPlan});
    }

});

/*
route for adding to meal plan
returns: meal plan
*/
app.post('/addToMealPlan', async(req, res) =>
{
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        var day = req.body.day;
        var mealName = req.body.mealName;
        await ourUser.addtoMealPlan(day, mealName);
        await updateDocument(userId, ourUser);
        res.send({"mealPlan": ourUser.MealPlan});
    }
});

/*
route for removing from meal plan
returns: meal plan
*/
app.post('/removefromMealPlan', async(req, res) =>
{
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        var day = req.body.day;
        var mealName = req.body.mealName;
        await ourUser.removefromMealPlan(day, mealName);
        await updateDocument(userId, ourUser);
        res.send({"mealPlan": ourUser.MealPlan});
    }
});

app.post('/addWeight', async(req, res)=>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        const weight = req.body.weight;
        ourUser.addUserWeight(weight);
        await updateDocument(userId, ourUser);
        res.send('ok');
    }
});

app.get('/getWeights', async(req, res)=>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        // If there are multiple weights in the array return the difference of last 2, previous weight and current weight
      if(ourUser.weights.length !== 1)
      {
        res.send([{"currentWeight": ourUser.weights[ourUser.weights.length-1], "previousWeight": ourUser.weights[ourUser.weights.length-2], "goalWeight": ourUser.Goal.Weight}])
      }
      // else return -1 to indicate no change
      else{
        res.send([{"currentWeight": ourUser.weights[ourUser.weights.length-1], "previousWeight": ourUser.weights[ourUser.weights.length-1], "goalWeight": ourUser.Goal.Weight}])
      }
    }   
});


app.post('/setGoalWeight', async(req, res)=>
{
    // get the userId
    // var userId = new ObjectId(req.body.userId);
    
    // Get User from the database
    const ourUser = await findDocument(userId);

    if(ourUser == -1)
    {
        res.send('bad userId!');
    }
    else
    {
        var goalWeight = req.body.goalWeight;

        console.log(goalWeight);
        ourUser.setGoalWeight(goalWeight);

        await updateDocument(userId, ourUser);

        res.send('ok');
    }
});



// const testUser = new User("testUserName","testUser", 20, 70, 200, "testUserHash", null);

// insertDocument(testUser);


app.use('/', express.static('.'));

app.listen(8080);

console.log("up and running");


async function insertDocument(documentToInsert)
{
    try {
        // Connect to the MongoDB server
        await client.connect();
    
        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_devam');
    
        // Insert the document
        const result = await collection.insertOne(documentToInsert);
        // console.log(`Document inserted with ID: ${result.insertedId}`);
        return result.insertedId;
      } catch (err) {
        console.error('Error inserting document:', err);
      } finally {
        // Close the MongoDB client to release resources
        await client.close();
      }
}


async function findDocument(userId)
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_devam');
    
        // Find the document with id
        const result = await collection.findOne({_id: userId});
        
        if(result)
        {
            const userAgain = new User(result.Username, result.Name, result.Age, result.Height, result.UserHash, result.forbiddenIngredients);
        
            userAgain.Calendar = new Calendar();

            userAgain.Calendar.Events = result.Calendar.Events;

            userAgain.Logbook = new LogBook();

            userAgain.Logbook.Logs = result.Logbook.Logs;

            userAgain.Meals = result.Meals;

            userAgain.MealPlan = result.MealPlan;

            // change begins

            userAgain.pantry = new Pantry();
            // adds handling for gettting an undefinded for result.Pantry
            if (result.pantry==undefined){
                userAgain.pantry.pantryfoods=[];
                userAgain.pantry.forbiddeningredients=[];
              }else{
                if (result.pantry.pantryfoods==undefined){
                  userAgain.pantry.pantryfoods=[];
                }else{
                  userAgain.pantry.pantryfoods= result.pantry.pantryfoods;
                }
    
                if (result.pantry.forbiddeningredients==undefined){
                  userAgain.pantry.forbiddeningredients=[];
                }else{
                  userAgain.pantry.forbiddeningredients= result.pantry.forbiddeningredients;
                }
              }
            // userAgain.forbiddenIngredients = result.forbiddenIngredients;

            // change ends

            userAgain.Goal = new Goal();

            userAgain.Goal.Weight = result.Goal.Weight;
            userAgain.Goal.Duration =  result.Goal.Duration;
            userAgain.Goal.setNutrition(result.Goal.Nutrients.calories, result.Goal.Nutrients.protein, result.Goal.Nutrients.carbohydrates, result.Goal.Nutrients.fats);

            userAgain.weights = result.weights;

            userAgain.activityLevel = result.activityLevel;


            // userAgain.Goal.Nutrients = new Nutrients(result.Goal.calories, result.Goal.protein, result.Goal.carbohydrates, result.Goal.fat);


            return userAgain;
        }
        else
        {
            return -1;
        }

    } catch(err)
    {
        console.log("Error while finding the document ", err)
    }
    finally
    {
        await client.close;
    }
}


async function findMealManager(mealManagerId)
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_devam');
    
        // Find the document with id
        const result = await collection.findOne({_id: mealManagerId});
        
        if(result)
        {
            const mealManager = new MealManager();

            mealManager.Meal = result.Meals;

            mealManager.Pantry.forbiddeningredients = result.pantry.forbiddeningredients;

            mealManager.Pantry.pantryfoods = result.pantry.pantryfoods;

            return mealManager;
        }
        else
        {
            return -1;
        }

    } catch(err)
    {
        console.log("Error while finding the document ", err)
    }
    finally
    {
        await client.close;
    }
}

async function findFoodItem(foodName)
{
    try
    {
        await client.connect();

        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_foodItems');
        
        // Find the document with name
        const result = await collection.findOne({ foodName: foodName });
        
        if(result)
        {
            const newFood = new Meal(result.foodName, null);

            newFood.Nutrients = result.nutritionalInformation;

            return newFood;
        }
        else
        {
            return -1;
        }
    }
    catch(err)
    {
        console.log("error while finding the food item, ",err);
    }
    finally
    {
        await client.close();
    }
}


async function updateDocument(userId, user)
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_devam');

        const updateDoc = {
            $set: user, 
          };
    
        // update the document with id
        await collection.updateOne({_id: userId}, updateDoc);

    } catch(err)
    {
        console.log("Error while finding the document ", err)
    }
    finally
    {
        await client.close;
    }   
}


async function getFoodItems()
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_foodItems');
    
        // Get all the documents from test_foodItems
        const result = await collection.find({});
        // Make sure result is not NULL
        if(result)
        {
            return await result.toArray();
        }
        else{
            return -1;
        }

    } catch(err)
    {
        console.log("Error while finding food Items ", err)
    }
    finally
    {
        await client.close;
    }
}



// Get userId from userHash
async function getUserId(userhash)
{
    try
    {
        await client.connect();

        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_user');

        const result = await collection.findOne({UserHash: userhash});

        if(result)
        {
            return result._id;
        }
        else
        {
            // If no user found with the given userhash return -1
            return -1;
        }
    }
    catch(err)
    {
        console.log('Error getting the user id from database ', err);
    }
    finally
    {
        await client.close();
    }
}

// to delete a user from the database
async function deleteUser(userId)
{
    try
    {
        await client.connect();

        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_user');

        const result = await collection.deleteOne({_id: userId});

        if(result.acknowledged)
        {
            // If the document was successfully deleted
            return 1;
        }
        else
        {
            return -1;
        }
    }
    catch(err)
    {
        console.log('error deleting user', id);
    }
    finally
    {
        await client.close();
    }
}



// Check if a username already exists in the collection
// returns 1 if the user exists else -1
async function userExists(username)
{
    try{
        await client.connect();

        const db = client.db('test');

        const collection = db.collection('test_user');

        const result = await collection.findOne({Username : username});

        if(result)
        {
            return 1;
        }

        else
        {
            return -1;
        }
    }
    catch(err)
    {
        console.log(err);
    }
    finally
    {
        await client.close();
    }
}


// Function to find recipes by ingredients and not including forbidden foods
async function findRecipesByIngredients(ingredientName, forbiddenIngredients) 
{
    // If you search with the forbiddenIngredients you don't get anything
    // shouldn't forbiddenIngredients be an array in User?
    if(ingredientName === forbiddenIngredients) return;
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Access the database and collection
      const db = client.db("test");
      const collection = db.collection('test_recipes');
  
      // Query for recipes that contain any of the provided ingredients 
      var query;
      if(forbiddenIngredients)
     { 
        // use this approach only if a user has forbiddenIngredients
        query = {
          // A regex (regular expression) search to find any ingredients that contain the ingredient name and option i for case insensitive
          // it is like a wildcard in bash. eg *chicken* would give anything containing chicken in it
          // And exclude forbiddenIngredients
          $and: [{ingredients: {$regex: ingredientName, $options: "i",}}, {ingredients: {$not: {$regex: forbiddenIngredients, $options: "i" }}}],
        };
      }
      else
      {
        // Just do a normal search if the user has no forbidden ingredients
        query = {
          ingredients: {$regex: ingredientName, $options: "i",}
        }
      }
      const result = await collection.find(query).toArray();
  
      return result;
    } catch (error) {
      console.error('Error finding recipes:', error);
    } finally {
      client.close();
    }
  }

async function getAllMeals()
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('test_recipes');
    
        // Get all the documents from test_foodItems
        const result = await collection.find({});
        // Make sure result is not NULL
        if(result)
        {
            return await result.toArray();
        }
        else{
            return -1;
        }

    } catch(err)
    {
        console.log("Error while finding recipes ", err)
    }
    finally
    {
        await client.close;
    }
}

// A function to get the ideal consumption of nutrients by a person based on factors like age, gender and activityLevel
async function idealConsumption(user)
{
    if(user.Goal.Nutrients.calories  && user.Goal.Nutrients.carbohydrates  && user.Goal.Nutrients.protein  && user.Goal.Nutrients.fats )
    {
        return{
            calories: user.Goal.Nutrients.calories,
            carbohydrates: user.Goal.Nutrients.carbohydrates,
            protein: user.Goal.Nutrients.protein,
            fats: user.Goal.Nutrients.fats,
        }
    }
    else
    {
        if(user.Age > 0 && user.Age <= 18)
        {
            return {calories: 2100,//"1000-3200", // calories
                    carbohydrates: 206,//"169-244", // grams
                    protein: 75,//"38-113", // grams
                    fats: 50};//"42-58"}; // grams
        }
        else if(user.Age > 18 && user.Age <= 60)
        {
            return {calories: 2400, //"1800-3000", // calories
                    carbohydrates: 275,//"225-325", // grams
                    protein: 112,//"50-175", // grams
                    fats: 61};//"44-78"}; // grams
        }
        else if(user.Age > 60)
        {
            return {calories: 2200,//"1600-2800", // calories
                    carbohydrates: 275,//"225-325", // grams
                    protein: 100,//"50-150", // grams
                    fats: 61};//"44-78"}; // grams
        }
    }
}

// function from server.js
/* this function search from a selected database's collection .
  dbName = database's name (string)
  colName = collection's name (string)
  myquery = { searchKey: correspondValue }
    example: var query = { address: "Park Lane 38" };
  how to use query to do search, see this link:
  https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
  returns one result
 */
  async function searchOne(dbName, colName, myquery){
    // Connect to the MongoDB server
    await client.connect();
  
    const db = client.db(dbName);
    const collection = db.collection(colName);
  
    var result;
    try {
      // Access the database and collection
      result = await collection.findOne(myquery);
  
      if (result==undefined){
        return "gets undefinded";
      }
      return result;
    }
    catch (err) {
      console.error('Error in seach event:', err);
    } finally {
      // Close the MongoDB client to release resources
      await client.close();
    }
  }
  
    /* this function get all data from a database's collection .
    dbName = database's name (string)
    colName = collection's name (string)
     similar to search but with empty query
    how to use query to do search, see this link:
    https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp
   */
  async function getAll(dbName, colName){
    // Connect to the MongoDB server
    await client.connect();
  
    const db = client.db(dbName);
    const collection = db.collection(colName);
  
    var results;
    try {
      // Access the database and collection
    results = collection.find( {} );
    if (results==undefined){
      return "getAll() gets an undefined"
    }
    return await results.toArray();
    } catch (err) {
      console.error('Error in seach event:', err);
    } finally {
      // Close the MongoDB client to release resources
      await client.close();
    }
  }




async function testFunction()
{
    // Testing userExists()

    // var result = await userExists("testUserName");

    // console.log("result with existing username: ",result);

    // result = await userExists("unknownUser");

    // console.log("result with nonexisten username: ",result);


    // Testing findFoodItem();

    // var result = await findFoodItem("Banana");

    // console.log(result.Nutrients.calories);


    // Testing findRecipesByIngredients()

    // Test for user not having any forbiddenIngredients
    // var result = await findRecipesByIngredients("chicken", null);
    // console.log(result);

    // Testing with "broccoli" as a forbiddenIngredient
    // var result = await findRecipesByIngredients("chicken", "broccoli");
    // console.log(result);

    // Testing with "Broccoli" as a forbiddenIngredient (To check case insensitivity)
    // var result = await findRecipesByIngredients("chicken", "broccoli");
    // console.log(result);

    // Testing ideal consumption
    // with age < 18
    // console.log(await idealConsumption(15));
    // with 60 < age > 18 
    // console.log(await idealConsumption(25));
    // with age > 60
    // console.log(await idealConsumption(70));

    // const user = await findDocument(userId);
    // user.forbiddenIngredients = ["chicken"];
    // // user.createGoal(2000, 130, 250, 50, 150, 14);
    // await updateDocument(userId, user);
    // console.log("done");

    // Testing insertDocument
    // const testUser = new User("testUserName", "testName", 20, 150, 200, "USER1HASH", null);
    // await insertDocument(testUser);
    // console.log("done");

    // Testing findDocument
    // const ourUser = await findDocument(userId);
    // console.log(ourUser);

    // Testing updateDocument
    // const ourUser = await findDocument(userId);
    // console.log(ourUser.Meals);
    // ourUser.Meals.pop();
    // await updateDocument(userId, ourUser);

    // const userAgain = await findDocument(userId);
    // console.log(userAgain.Meals);

    // const userAgain = await findDocument(userId);
    // userAgain.pantry = new Pantry();
    // await updateDocument(userId, userAgain);
    // console.log("done");

    // const mealManager = new MealManager();
    // await insertDocument(mealManager);
    // console.log("done");

    // const mealManager = await findMealManager(mealManagerId);
    // console.log(mealManager);

    // const userAgain = await findDocument(userId);
    // console.log(userAgain);
    // userAgain.Height = 200;
    // await updateDocument(userId, userAgain);
    // const newUser = await findDocument(userId);
    // console.log(newUser);

    // const userAgain = findDocument(userId);
    // userAgain.Username = "william";
    // userAgain.Name = "William";
    // userAgain.Age = 23;
    // await updateDocument(userId, userAgain);
    // console.log("done");

}

// testFunction();