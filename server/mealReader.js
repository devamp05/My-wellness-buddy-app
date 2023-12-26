const fs = require('fs');
const Meal = require('./Meal');
const Nutrients = require('./Nutrients');


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



// Function to parse a line of meal data from the text file
function parseMealData(line) {
  const [Name, instruction, Calories, Protein, carbohydrates, fat, ingredients] = line.split('#');
  // Ensure all nutrient parameters are numbers

  const ingredientsList = ingredients.split(',').map((ingredient) => ingredient.trim());
  return new Meal(Name, instruction, ingredientsList,  Number(Calories), Number(Protein), Number(carbohydrates), Number(fat));
}

// Read the text file and create an array of meal objects
function readMealsFromFile(filePath) {
  const mealsData = fs.readFileSync(filePath, 'utf-8').split('\n');
  const meals = mealsData.map((line) => parseMealData(line.trim()));
  return meals;
}

// Usage
const mealsArray = readMealsFromFile('meals.txt');
// console.log(mealsArray);
insert();


async function insert(){
  try {
    await client.connect();
    const result = await Meals.insertMany(mealsArray);
    console.log(`Documents inserted: ${result}`);
  } catch (err) {
    console.error('Error inserting Meals: ', err);
  } finally {
    await client.close();
  }
}