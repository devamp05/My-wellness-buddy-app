const Event = require("./Event");
const User = require("./User");
const Calendar = require("./Calendar");
const LogBook = require("./LogBook")


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

const userId = new ObjectId('6542ce1397157ad1d9ff1ba3');


const app = express();

app.use(bodyParser.json());

app.post('/addCalendarEvent', async (req, res)  => 
{
    console.log("addCalendarEvent called");
    var date = req.body.date;
    var eventTitle = req.body.eventTitle;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;

    // var userId = req.body.userId;



    
    // const newEvent = new Event(date, eventTitle, startTime, endTime);

    // get the user

    const ourUser = await findDocument(userId);
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

});


// A route to all the user events
app.get('/getCalendarEvents', async (req, res)=>
{
    // var userId = req.body.userId;

    const ourUser = await findDocument(userId);

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
});


app.get('/getFoodItems', async (req, res) =>
{
    // getFoodItems() returns an Array of all the food items in the database
    var foodDocument = await getFoodItems();

    // respond with a document with key foodItems and the array from getFoodItems() call as it's value
    res.send({"foodItems": foodDocument});
});

app.post('/logMeal', async (req, res)  => 
{
    var mealName = req.body.mealName;;

    // create a new Meal from the mealName
    const newMeal = new Meal(mealName, null);

    // TODO would need to add Meals nutritional info from the database here


    // var userId = req.body.userId;

    // get the user

    const ourUser = await findDocument(userId);
    
    ourUser.Logbook.logMeal(newMeal);

    // // update the user in the database
    await updateDocument(userId, ourUser);

    res.send("ok");

});




// const testUser = new User("testUserName","testUser", 20, 70, 200, "testUserHash", null);

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
        
        if(result){

        const userAgain = new User(result.Username, result.Name, result.Age, result.Height, result.UserHash, result.forbiddenIngredients);
    
        userAgain.Calendar = new Calendar();

        // console.log(result.Calendar);
        // if(result.Calendar.Events == undefined){
        //     userAgain.Calendar.Events = [];
        // } else {
        userAgain.Calendar.Events = result.Calendar.Events;
        // }

        userAgain.Logbook = new LogBook();

        userAgain.Logbook.Logs = result.Logbook.Logs;

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