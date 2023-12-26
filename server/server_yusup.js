const Event = require("./Event");
const User = require("./User");
const Calendar = require("./Calendar");
const Pantry = require("./Pantry");
const GroceryList = require("./GroceryList");
const MealManager = require("./MealManager");



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

const userId = new ObjectId('6537432eedd2fcabd1cec989');


const app = express();

app.use(bodyParser.json());

app.post('/addingredientToGroceryList', async (req, res)  => 
{
    var ingredient = req.body.ingredient; 
    var date = req.body.date;
    var eventTitle = req.body.eventTitle;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;


    // get the user

    const ourUser = await findDocument(userId);
    
    ourUser.GroceryList.addIngredients(ingredient, date, eventTitle, startTime, endTime);

    // // update the user in the database
    await updateDocument(userId, ourUser);

    
    res.send("ok");

});



app.get('/removeIngredientfromGrocerylist', async (req, res)=>
{
    var ingredient = req.body.ingredient; 
    var eventTitle = req.body.eventTitle;

    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);

    ourUser.GroceryList.removeIngredient(ingredient, eventTitle);

    await updateDocument(userId, ourUser);

    res.send("ok");

})


app.post('/addforbiddeningredientToPantry', async (req, res)  => 
{
    var ingredient = req.body.ingredient; 
  
    // get the user

    const ourUser = await findDocument(userId);
    
    ourUser.Pantry.addForbiddenIngredient(ingredient);

    // // update the user in the database
    await updateDocument(userId, ourUser);

    
    res.send("ok");

});





app.post('/removeForrbiddeningredientFromPantry', async (req, res)  => 
{
    var ingredient = req.body.ingredient; 
  
    // get the user

    const ourUser = await findDocument(userId);
    
    ourUser.Pantry.removeForbiddenIngredient(ingredient);

    // // update the user in the database
    await updateDocument(userId, ourUser);

    
    res.send("ok");

});






app.post('/addingredientToPantry', async (req, res)  => 
{
    var ingredient = req.body.ingredient; 
  
    // get the user

    const ourUser = await findDocument(userId);
    
    ourUser.Pantry.addExistingIngredient(ingredient);

    // // update the user in the database
    await updateDocument(userId, ourUser);

    
    res.send("ok");

});




app.get('/removeIngredientfromPantry', async (req, res)=>
{
    var ingredient = req.body.ingredient; 

    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);

    ourUser.Pantry.removeIngredient(ingredient);

    await updateDocument(userId, ourUser);

    res.send("ok");

});


app.post('/showPantryFoods', async (req, res)=>
{
    const ourUser = await findDocument(userId);
    // var userId = req.body.userId;
    res.send(ourUser.Pantry.ShowPantryFoods())

})


app.post('/showPantryFoods', async (req, res)=>
{
    // var userId = req.body.userId;
    const ourUser = await findDocument(userId);

    res.send(ourUser.Pantry.ShowPantryForbiddenIngredients())

});


app.post('/createNewMeal', async (req, res)=>
{
     // var userId = req.body.userId;
     const ourUser = await findDocument(userId);

     var Name =req.body.Name;
     var instruction =req.body.instruction;
     var ingrdients =req.body.ingrediens;
     var calories =req.body.calories;
     var protein =req.body.protein;
     var carbohydrates =req.body.carbohydrates;
     var fat =req.body.fat;

     ourUser.createNewMeal(Name, instruction, ingrdients, calories, protein, carbohydrates, fat);

     await updateDocument(userId, ourUser);

     res.send("New meal created");
});



app.get('/removeMeal', async (req, res)=>
{
    var Mealname = req.body.Mealname; 

    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);

    ourUser.MealManager.removeMeal(Mealname);

    await updateDocument(userId, ourUser);

    res.send("ok");

})


app.get('/searchforMeal', async (req, res)=>
{
    var Mealname = req.body.Mealname; 

    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);

    var result = ourUser.MealManager.searchforMeal(Mealname);

    
    res.send(result);

})

// TO DO  checkIngredientwithPantry(ingredient)
// generateMealBasedOnNutreins
//generateMealBasedOnIngredients(ingredients)





// const testUser = new User("testUser", 20, 200);

// insertDocument(testUser);


app.use('/', express.static('.'));

app.listen(8080);

console.log("up and running")


async function insertDocument(documentToInsert)
{
    try {
        // Connect to the MongoDB server
        await client.connect();
    
        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('yusuf');
    
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
        const collection =  db.collection('yusuf');
    
        // Find the document with id
        const result = await collection.findOne({_id: userId});
        
        if(result){

        const userAgain = new User(result.name, result.age, result.height);

        userAgain.weights = result.weights;
    
        userAgain.Calendar = new Calendar();
    
        userAgain.Calendar.Events = result.Calendar.Events;

        userAgain.Pantry = new Pantry();

        userAgain.Pantry.pantryfoods= result.Pantry.pantryfoods;
        userAgain.Pantry.forbiddeningredients=result.Pantry.forbiddeningredients;


        userAgain.GroceryList = new GroceryList();

        userAgain.GroceryList.ingrediens= result.GroceryList.ingrediens;
        userAgain.GroceryList.Calendar=result.GroceryList.Calendar;

        userAgain.MealManager =  new MealManager();

        userAgain.MealManager.Meal = result.MealManager.Meal;
        userAgain.MealManager.Pantry = result.MealManager.Pantry;

        return userAgain;
        }
        else{
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


async function updateDocument(userId, user)
{
    try{
        await client.connect();


        // Access the database and collection
        const db = client.db('test');
        const collection =  db.collection('yusuf');

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

async function testFunction()
{
    

}

// testFunction();