const Goal = require('./Goal');
const Meal = require('./Meal');
const Pantry = require('./Pantry');
const LogBook = require('./LogBook');
const Calendar = require('./Calendar');
const MealManager = require("./MealManager");
const GroceryList = require("./GroceryList")


// Declaring variables for establishing a mongodb connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://team34:cmpt370@cluster0.hjo6ufs.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
 serverApi: {
   version: ServerApiVersion.v1,
   strict: true,
   deprecationErrors: true,
 },
});
const db = client.db('test');
const Meals = db.collection('Meals');




class User{


   constructor(Username, Name, Age, Height, UserHash, forbiddeningredients){
       this.Username = Username;
       this.Name = Name;
       this.Age = Age;
       this.Height = Height;
       this.UserHash = UserHash;
       this.Logbook = new LogBook();
       this.GroceryLists = new GroceryList();
       this.Calendar = new Calendar();
       this.Meals = [];
       this.Goal = new Goal();
       this.pantry = new Pantry();
       this.weights = [];
       this.height = Height; // In cm

       // Convert the forbidden ingredients into regular expression that include wildcards
       this.pantry.forbiddeningredients = forbiddeningredients;
    //    let i;
    //    for (i = 0; i < forbiddeningredients.length; i++){
    //         this.pantry.forbiddeningredients.push(new RegExp(forbiddeningredients[i]));
    //    }

       this.activityLevel = 0;
       this.MealPlan = [{'Day': 'Sunday', 'Meals': []},{'Day': 'Monday', 'Meals': []},{'Day': 'Tuesday', 'Meals': []},
       {'Day': 'Wednesday', 'Meals': []},{'Day': 'Thursday', 'Meals': []},{'Day': 'Friday', 'Meals': []},{'Day': 'Saturday', 'Meals': []}];

   }
    /**
        * Creates a new goal with specified nutrition and weight parameters.
        * @param {number} calories - Daily calorie goal.
        * @param {number} protein - Daily protein goal in grams.
        * @param {number} carbohydrates - Daily carbohydrate goal in grams.
        * @param {number} fat - Daily fat goal in grams.
        * @param {number} Weight - Target weight for the user.
        */
    createGoal(calories, protein, carbohydrates, fat, Weight){
        this.Goal.setNutrition(calories, protein, carbohydrates, fat);
        this.Goal.setWeight(Weight);
    }

    /**
     * Sets the height of the user.
     * @param {number} Height - New height of the user in centimeters.
     */
    setHeight(Height){
        this.height = Height;
    }

    /**
     * Sets the goal weight of the user.
     * @param {number} Weight - New weight goal for the user.
     */
    setGoalWeight(Weight){
        this.Goal.setWeight(Weight);
        this.generateNutritionGoal();
    }

    /**
     * Sets the nutrition goals for the user.
     * @param {number} calories - Daily calorie goal.
     * @param {number} protein - Daily protein goal in grams.
     * @param {number} carbohydrates - Daily carbohydrate goal in grams.
     * @param {number} fat - Daily fat goal in grams.
     */
    setGoalNutrition(calories, protein, carbohydrates, fat){
        this.Goal.setNutrition(calories, protein, carbohydrates, fat);
    }

    /**
     * Sets the activity level of the user.
     * @param {number} activityLevel - The activity level of the user.
     */
    setActivityLevel(activityLevel){
        this.activityLevel = activityLevel;
        this.generateNutritionGoal();
    }

    /**
     * Creates a meal with given parameters and adds it to the user's meals.
     * @param {string} Name - Name of the meal.
     * @param {string} instruction - Cooking instructions.
     * @param {Array} ingrdients - List of ingredients.
     * @param {number} Calories - Calorie count of the meal.
     * @param {number} Protein - Protein content of the meal.
     * @param {number} carbohydrates - Carbohydrate content of the meal.
     * @param {number} fat - Fat content of the meal.
     */
    createMeal(Name, instruction, ingrdients, Calories, Protein, carbohydrates, fat){
        this.Meals.push(new Meal(Name, instruction, ingrdients, Calories, Protein, carbohydrates, fat));
    }



    /**
    * Generates a nutrition goal based on the user's current weight and activity level.
    */
    generateNutritionGoal(){
    // Number to quantise activity level 
    let multiplier = [1,1.2,1.37,1.47,1.55,1.73,1.9];

    let currentWeight = parseInt(this.getCurrentWeight().weight);

    // currentCalorieNeeds
    // Generated the BMR (Basal Metabolic Rate) with Mifflin-St Jeor Equation
    let currentCalorieNeeds = (10*currentWeight  + 6.25*this.Height - 5*this.Age + 5) * multiplier[this.activityLevel];
    let goalCalories;

    if(currentWeight < this.Goal.Weight){
        goalCalories = currentCalorieNeeds + 150;
    } else if (currentWeight > this.Goal.Weight){
        goalCalories = currentCalorieNeeds - 150;
    } else{
        goalCalories = currentCalorieNeeds;
    }

    this.Goal.setNutrition(parseInt(goalCalories), currentWeight * 1.2 , currentWeight * 7 , currentWeight * 1 );
   }
   


    /**
    * Logs water intake in the user's logbook.
    */
   logWater(){
       this.Logbook.logWater();
   }

    /**
    * Logs a meal in the user's logbook.
    * @param {string} Name - Name of the meal.
    * @param {string} instruction - Cooking instructions.
    * @param {Array} ingrdients - List of ingredients.
    * @param {number} Calories - Calorie count of the meal.
    * @param {number} Protein - Protein content of the meal.
    * @param {number} carbohydrates - Carbohydrate content of the meal.
    * @param {number} fat - Fat content of the meal.
    */
   logMeal(Name,instruction,ingrdients,Calories,Protein,carbohydrates,fat){
       this.Logbook.logMeal(new Meal(Name,instruction,ingrdients,Calories,Protein,carbohydrates,fat));
   }


    /**
    * Adds user's weight to the weight log.
    * @param {number} weight - The weight of the user to be logged.
    */
   addUserWeight(weight)
   {
     const date = new Date();
     this.weights.push({date: date, weight: weight});
     this.generateNutritionGoal();
   }


    /**
    * Retrieves the current weight of the user.
    * @return {number} The most recent weight of the user.
    */
   getCurrentWeight()
   {
       if(this.weights.length === 0){return 0};
       return this.weights[this.weights.length - 1];
   }


    /**
    * Adds a meal to the user's meal plan for a specific day.
    * @param {string} index - The day of the week.
    * @param {string} mealName - The name of the meal to be added.
    */
   addtoMealPlan(index, mealName){

    for(let i = 0; i < this.MealPlan.length; i++){
        // If the day is found
        if(this.MealPlan[i].Day === index){

            // Find the meals from the User's list of meals and add it to the plan
            for(let j = 0; j < this.Meals.length; j++){
                if(this.Meals[j].Name == mealName){
                     this.MealPlan[i].Meals.push(this.Meals[j]);
                     return;
                }
            }

        }
    }

   }

    /**
    * Removes a meal from the user's meal plan for a specific day.
    * @param {string} index - The day of the week.
    * @param {string} mealName - The name of the meal to be removed.
    */
   removefromMealPlan(index, mealName){

    for(let i = 0; i < this.MealPlan.length; i++){
        // If the day is found
        if(this.MealPlan[i].Day === index){
            // Find the meals from the User's list of meals and add it to the plan
            for(let j = 0; j < this.MealPlan[i].Meals.length; j++){
                if(this.MealPlan[i].Meals[j].Name == mealName){
                    this.MealPlan[i].Meals.splice(j,1);
                    return;
                }
            }
        }
    }





   }



   /**
    * Suggests a meal plan based on the user's nutrition goals and forbidden ingredients.
    */
   async suggestMealPlan(){
       let dayPlan = [];
       let meals = [];


       // Current nutrition count of the generated meals
       let currCalories = 0;
       let currProtein = 0;
       let currCarbs = 0;
       let currFat = 0;




       let calorie_goal;
       let protein_goal;
       let carb_goal;
       let fat_goal;




       if(typeof this.Goal.Nutrients.calories != "number"){
           calorie_goal = 2300;
       } else {
           calorie_goal = this.Goal.Nutrients.calories;
       }
       if(typeof this.Goal.Nutrients.protein != "number"){
           protein_goal = 160;
       } else {
           protein_goal = this.Goal.Nutrients.protein;
       }
       if(typeof this.Goal.Nutrients.carbohydrates != "number"){
           carb_goal = 250;
       } else {
           carb_goal = this.Goal.Nutrients.carbohydrates;
       }
       if(typeof this.Goal.Nutrients.fat != "number"){
           fat_goal = 50;
       } else {
           fat_goal = this.Goal.Nutrients.fat;
       }




       // Retrieve the meals from the database that exclude the forbidden ingredients
       try {
           await client.connect();

           let result;
           console.log(this.pantry.forbiddeningredients);

           if(this.pantry.forbiddeningredients.length !== 0 || this.pantry.forbiddeningredients[0] !== undefined){
            result = await Meals.find({ingrdients:{$nin: this.pantry.forbiddeningredients}});
           } else {
            result = await Meals.find();
           }


           meals = await result.toArray();
         } catch (err) {
           console.error('Error Retreiving Meals: ', err);
         } finally {
           await client.close();
         }


        
        // Genreate meal plan for 7 days
         for(let d = 0; d < 7; d++){


         // Shuffle the Array
         for (let i = meals.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [meals[i], meals[j]] = [meals[j], meals[i]];
       }
      


         for (let i = 0; i < meals.length; i++) {


           // Check if adding this meal will exceed the goals
           if (currCalories + meals[i].Nutrients.calories <= calorie_goal || // The Or prioratizes calories
               currProtein + meals[i].Nutrients.protein <= protein_goal &&
               currCarbs + meals[i].Nutrients.carbohydrates <= carb_goal &&
               currFat + meals[i].Nutrients.fat <= fat_goal
               ) {
                dayPlan.push(meals[i]);
               currCalories += meals[i].Nutrients.calories;
               currProtein += meals[i].Nutrients.protein;
               currCarbs += meals[i].Nutrients.carbohydrates;
               currFat += meals[i].Nutrients.fat;
           }


           // If the goals are met, stop adding meals
           if (currCalories >= calorie_goal &&
               currProtein >= protein_goal &&
               currCarbs >= carb_goal &&
               currFat >= fat_goal) {
               break;
           }
       }

       this.MealPlan[d].Meals = dayPlan;
       // Reset counts and stored meals
       dayPlan = [];
       currCalories = 0;
       currProtein = 0;
       currCarbs = 0;
       currFat = 0;



   }


   }


}






function Test() {
   const Usr1 = new User('Ogo_Alege', 'Ogo', 20, null, 180, 'weruhu83iued');


   Usr1.pantry.forbiddeningredients = ['Milk', 'Nuts', 'Pork', 'Eggs', 'Chicken']; // Backslashes (/) are used as wildcards for a more extensive searches of forbidden ingredients


   const SuggestedPlan = Usr1.suggestMealPlan();




   // Test suggestMealPlan() before goals are set, checking if it returns something
   if(SuggestedPlan == null || SuggestedPlan == undefined || SuggestedPlan == 0 ){
       console.log("Error testing suggestMealPlan(), nothing was returned");
   }


   // Test suggestMealPlan() before goals are set, checking if it returns something in the daily plans
   for(let i = 0; i < SuggestedPlan.length; i++){
       if(SuggestedPlan[i] == null || SuggestedPlan[i] == undefined || SuggestedPlan[i] == 0 ){
           console.log("Error testing suggestMealPlan(), no daily plans were returned, or one/more is missing");
       }
   }






   // Test suggestMealPlan() before goals are set, checking the plan returns meals with the correct nutrition
   for(let i = 0; i < SuggestedPlan.length; i++){
           let currCalories = 0;
           let currProtein = 0;
           let currCarbs = 0;
           let currFat = 0;
       // for each meal in a day
       for(let j = 0; j < SuggestedPlan[i].length; j++){
           currCalories += SuggestedPlan[i][j].Nutrients.calories;
           currProtein += SuggestedPlan[i][j].Nutrients.protein;
           currCarbs += SuggestedPlan[i][j].Nutrients.carbohydrates;
           currFat += SuggestedPlan[i][j].Nutrients.fat;  
              
       }


       if(
           !(
           currCalories >= 2300 * 0.9 && currCalories <= 2300 * 1.1 && // Calories within 10 % of goal
           currProtein >= 160 * 0.8 && currCalories <= 160 * 1.2 && // Protein within 20 % of goal
           currCarbs >= 250 * 0.8 && currCalories <= 250 * 1.2 && // Carbohydrates within 20 % of goal
           currFat >= 50 * 0.8 && currCalories <= 50 * 1.2  // Fat within 20 % of goal
           )
       ){
           console.log("Error testing suggestMealPlan(), the suggested plan is bad in terms of the fault goal when no user goals are set");
       }
   }




   Usr1.createGoal(2000,130,250,50, 150, 14);


   // Test createGoal()
   if(Usr1.Goal.Duration != 14){  "Error testing createGoal(), expected 14, got :" +  Usr1.Goal.Duration};
   if(Usr1.Goal.Weight != 150){  "Error testing createGoal(), nothing was returned" + Usr1.Goal.Nutrients.calories};
   if(Usr1.Goal.Nutrients.calories != 2000){  "Error testing createGoal(), nothing was returned" + Usr1.Goal.Nutrients.calories};
   if(Usr1.Goal.Nutrients.protein != 130){  "Error testing createGoal(), nothing was returned" + Usr1.Goal.Nutrients.protein};
   if(Usr1.Goal.Nutrients.carbohydrates != 250){  "Error testing createGoal(), nothing was returned" + Usr1.Goal.Nutrients.carbohydrates};
   if(Usr1.Goal.Nutrients.fat != 50){  "Error testing createGoal(), nothing was returned" + Usr1.Goal.Nutrients.fat};


    // Test setHeight
    Usr1.setHeight(185);
    if (Usr1.height !== 185) {
        console.log("Error in setHeight, Height not set correctly");
    }


    // Test setActivityLevel
    Usr1.setActivityLevel(3);
    if (Usr1.activityLevel !== 3) {
        console.log("Error in setActivityLevel, Activity level not set correctly");
    }



    // Test createMeal
    Usr1.createMeal('Test Meal', 'Instructions', ['Ingredient1', 'Ingredient2'], 500, 30, 40, 20);
    if (Usr1.Meals.length !== 1) {
        console.log("Error in createMeal, Meal not added correctly");
    }
    if (Usr1.Meals[0].Name !== 'Test Meal') {
        console.log("Error in createMeal, Meal Name not set correctly");
    }

    // Test generateNutritionGoal()
    Usr1.addUserWeight(80); // Setting weight for nutrition goal generation
    Usr1.generateNutritionGoal();

    // Numbers calculated by hand
    if(Math.round(Usr1.Goal.Nutrients.calories) !== 1186){
        console.log('Error testing generateNutritionGoal() expected 1186 calories got: ' + Usr1.Goal.Nutrients.calories)};
    if(Math.round(Usr1.Goal.Nutrients.protein) !== 96){
        console.log('Error testing generateNutritionGoal() expected 96 protein got: ' + Usr1.Goal.Nutrients.protein)};
    if(Math.round(Usr1.Goal.Nutrients.carbohydrates) !== 560){
        console.log('Error testing generateNutritionGoal() expected 560 carbohydrates got: ' + Usr1.Goal.Nutrients.carbohydrates)};
    if(Math.round(Usr1.Goal.Nutrients.fats) !== 80){
        console.log('Error testing generateNutritionGoal() expected 80 fats got: ' + Usr1.Goal.Nutrients.fats)};



   // Test suggestMealPlan() after goals are set, checking if it returns something
   if(SuggestedPlan == null || SuggestedPlan == undefined || SuggestedPlan == 0 ){
       console.log("Error testing suggestMealPlan(), nothing was returned");
   }


   // Test suggestMealPlan() after goals are set, checking if it returns something in the daily plans
   for(let i = 0; i < SuggestedPlan.length; i++){
       if(SuggestedPlan[i] == null || SuggestedPlan[i] == undefined || SuggestedPlan[i] == 0 ){
           console.log("Error testing suggestMealPlan(), no daily plans were returned, or one/more is missing");
       }
   }






   // Test suggestMealPlan() after goals are set, checking the plan returns meals with the correct nutrition
   for(let i = 0; i < SuggestedPlan.length; i++){
           let currCalories = 0;
           let currProtein = 0;
           let currCarbs = 0;
           let currFat = 0;
       // for each meal in a day
       for(let j = 0; j < SuggestedPlan[i].length; j++){
           currCalories += SuggestedPlan[i][j].Nutrients.calories;
           currProtein += SuggestedPlan[i][j].Nutrients.protein;
           currCarbs += SuggestedPlan[i][j].Nutrients.carbohydrates;
           currFat += SuggestedPlan[i][j].Nutrients.fat;  
              
       }


       if(
           !(
           currCalories >= Usr1.Goal.Nutrients.calories * 0.9 && currCalories <= Usr1.Goal.Nutrients.calories * 1.1 && // Calories within 10 % of goal
           currProtein >= Usr1.Goal.Nutrients.protein * 0.8 && currCalories <= Usr1.Goal.Nutrients.protein * 1.2 && // Protein within 20 % of goal
           currCarbs >= Usr1.Goal.Nutrients.carbohydrates * 0.8 && currCalories <= Usr1.Goal.Nutrients.carbohydrates * 1.2 && // Carbohydrates within 20 % of goal
           currFat >= Usr1.Goal.Nutrients.fat * 0.8 && currCalories <= Usr1.Goal.Nutrients.fat * 1.2  // Fat within 20 % of goal
           )
       ){
           console.log("Error testing suggestMealPlan(), the suggested plan is bad in terms of user goals");
       }
   }






   // Test suggestMealPlan() after goals are set, checking if forbidden Ingrediets are excluded
   for(let i = 0; i < SuggestedPlan.length; i++){
       for(let j = 0; j < SuggestedPlan[i].ingrdients.length; j++){
           for(let k = 0; k < Usr1.pantry.forbiddeningredients.length; k++){
               if(SuggestedPlan[i].ingrdients[j].search(Usr1.pantry.forbiddeningredients[k]) != -1 ){
                   console.log("Error testing suggestMealPlan(), forbidden ingredient : " + Usr1.pantry.forbiddeningredients[k] + " found in a suggested meal");
               }
           }
              
       }
   }


   // Test getCurrentWeight()
   var w1 = Usr1.getCurrentWeight();
   if(w1.weight !== 80){
       console.log("Error testing getCurrentWeight(), expected 0 when no weights were initially set, got: "
       + w1.weight);
   }


   // Test getCurrentWeight() and addUserWeight()
   Usr1.addUserWeight(90);
   w1 = Usr1.getCurrentWeight();
   if(w1.weight !== 90){
       console.log("Error testing getCurrentWeight(), expected 180 with 1 weight set, got: "
       + w1.weight);
   }


   // Test getCurrentWeight() and addUserWeight()
   Usr1.addUserWeight(87);
   Usr1.addUserWeight(74);
   w1 = Usr1.getCurrentWeight();
   if(w1.weight !== 74){
       console.log("Error testing getCurrentWeight(), expected 174 with multiple weights set, got: "
       + w1.weight);
   }


   // Test createMeal()
   Usr1.createMeal('Test Meal', 'Instructions', ['Ingredient1', 'Ingredient2'], 500, 30, 40, 20);
   if (Usr1.Meals.length !== 2) {
       console.log("Error testing createMeal(), meal not added to the Meals array");
   }


   // Test setHeight()
   Usr1.setHeight(185);
   if (Usr1.height !== 185) {
       console.log("Error testing setHeight(), height not set correctly");
   }


   // Test setGoalWeight()
   Usr1.setGoalWeight(160);
   if (Usr1.Goal.Weight !== 160) {
       console.log("Error testing setGoalWeight(), goal weight not set correctly");
   }


   // Test setGoalNutrition()
   Usr1.setGoalNutrition(1800, 120, 200, 40);
   if (
       Usr1.Goal.Nutrients.calories !== 1800 ||
       Usr1.Goal.Nutrients.protein !== 120 ||
       Usr1.Goal.Nutrients.carbohydrates !== 200 ||
       Usr1.Goal.Nutrients.fats !== 40
   ) {
       console.log("Error testing setGoalNutrition(), goal nutrition not set correctly");
   }


    // Test addtoMealPlan()
    Usr1.addtoMealPlan('Monday', 'Test Meal');

    for(let i = 0; i < Usr1.MealPlan[1].Meals.length; i++){
        if(Usr1.MealPlan[1].Meals[i].Name === 'Test Meal'){
            break; // Test succesful
        } else if (i == Usr1.MealPlan[1].Meals.length){ // The last meal was reached but the meal wasnt found
            console.log("Error in addtoMealPlan(), Meal not added to MealPlan correctly");
        }
    }

    // Test removefromMealPlan()
    Usr1.removefromMealPlan('Monday', 'Test Meal');
    for(let i = 0; i < Usr1.MealPlan[1].Meals.length; i++){
        if(Usr1.MealPlan[1].Meals[i].Name === 'Test Meal'){
            console.log("Error in removefromMealPlan(), Meal not removed from MealPlan correctly");
        }
    }


}




// Uncomment the line below to run tests
//Test();


module.exports = User;