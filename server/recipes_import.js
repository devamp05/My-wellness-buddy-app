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



var insert_recipes = [
  {
    "recipeName": "Grilled Chicken and Quinoa Bowl",
    "ingredients": [
      "2 boneless, skinless chicken breasts",
      "1 cup quinoa",
      "2 cups water",
      "1 cup steamed broccoli",
      "1 tablespoon olive oil",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "Season chicken breasts with salt and pepper.",
      "Grill the chicken on medium heat for 6-8 minutes per side, or until fully cooked.",
      "In a separate pot, cook quinoa in 2 cups of water until the water is absorbed.",
      "Serve grilled chicken over cooked quinoa with steamed broccoli.",
      "Drizzle with olive oil."
    ],
    "nutritionalInformation": {
      "calories": "400 kcal",
      "carbohydrates": "35g",
      "protein": "30g",
      "fats": "10g"
    }
  },
  {
    "recipeName": "Baked Salmon with Lemon and Asparagus",
    "ingredients": [
      "2 salmon fillets",
      "1 bunch of asparagus",
      "1 lemon",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 375°F (190°C).",
      "Place salmon fillets on a baking sheet and drizzle with olive oil.",
      "Season with salt, pepper, and lemon juice.",
      "Arrange asparagus around the salmon.",
      "Bake for 15-20 minutes or until salmon flakes easily."
    ],
    "nutritionalInformation": {
      "calories": "350 kcal",
      "carbohydrates": "40g",
      "protein": "25g",
      "fats": "15g"
    }
  },
  {
    "recipeName": "Vegetarian Chickpea Stir-Fry",
    "ingredients": [
      "1 can of chickpeas, drained and rinsed",
      "1 cup mixed bell peppers, sliced",
      "1 cup broccoli florets",
      "2 cloves garlic, minced",
      "2 tablespoons soy sauce",
      "1 tablespoon sesame oil",
      "1 teaspoon ginger, grated"
    ],
    "instructions": [
      "Heat sesame oil in a pan over medium heat.",
      "Add garlic and ginger, stir for 1 minute.",
      "Add chickpeas, bell peppers, and broccoli. Stir-fry for 5-7 minutes.",
      "Add soy sauce and stir until well combined.",
      "Serve hot."
    ],
    "nutritionalInformation": {
      "calories": "320 kcal",
      "carbohydrates": "30g",
      "protein": "12g",
      "fats": "6g"
    }
  },
  {
    "recipeName": "Quinoa and Black Bean Salad",
    "ingredients": [
      "1 cup quinoa",
      "2 cups water",
      "1 can black beans, drained and rinsed",
      "1 cup corn kernels",
      "1 red bell pepper, diced",
      "1/4 cup cilantro, chopped",
      "2 tablespoons lime juice"
    ],
    "instructions": [
      "Rinse quinoa and cook it in 2 cups of water until the water is absorbed.",
      "In a large bowl, combine cooked quinoa, black beans, corn, red bell pepper, and cilantro.",
      "Drizzle with lime juice and toss to mix well.",
      "Chill in the fridge for at least 30 minutes before serving."
    ],
    "nutritionalInformation": {
      "calories": "350 kcal",
      "carbohydrates": "45g",
      "protein": "10g",
      "fats": "2g"
    }
  },
  {
    "recipeName": "Grilled Vegetable and Chickpea Wraps",
    "ingredients": [
      "1 zucchini, sliced",
      "1 red onion, sliced",
      "1 red bell pepper, sliced",
      "1 can chickpeas, drained and rinsed",
      "4 whole wheat tortillas",
      "2 tablespoons olive oil",
      "1 teaspoon cumin"
    ],
    "instructions": [
      "Toss zucchini, red onion, and red bell pepper with olive oil and cumin.",
      "Grill vegetables until tender and slightly charred.",
      "Warm tortillas, then fill them with grilled vegetables and chickpeas.",
      "Roll up the wraps and serve."
    ],
    "nutritionalInformation": {
      "calories": "320 kcal",
      "carbohydrates": "50g",
      "protein": "15g",
      "fats": "10g"
    }
  },
  {
    "recipeName": "Salmon and Asparagus Foil Packets",
    "ingredients": [
      "2 salmon fillets",
      "1 bunch asparagus spears",
      "2 cloves garlic, minced",
      "1 lemon, sliced",
      "2 tablespoons olive oil",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 375°F (190°C).",
      "Place each salmon fillet on a piece of aluminum foil.",
      "Arrange asparagus around the salmon. Sprinkle with garlic, drizzle with olive oil, and season with salt and pepper.",
      "Top with lemon slices and seal the foil packets.",
      "Bake for 20-25 minutes. Serve hot."
    ],
    "nutritionalInformation": {
      "calories": "360 kcal",
      "carbohydrates": "10g",
      "protein": "35g",
      "fats": "15g"
    }
  },
  {
    "recipeName": "Vegan Lentil and Spinach Curry",
    "ingredients": [
      "1 cup red lentils",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 tablespoon curry powder",
      "1 can coconut milk",
      "4 cups fresh spinach",
      "2 tablespoons vegetable oil"
    ],
    "instructions": [
      "Heat vegetable oil in a pan and sauté the onion and garlic until translucent.",
      "Add curry powder and cook for 1-2 minutes.",
      "Stir in red lentils and coconut milk. Simmer for 20-25 minutes until lentils are tender.",
      "Add fresh spinach and cook until wilted. Serve over rice."
    ],
    "nutritionalInformation": {
      "calories": "350 kcal",
      "carbohydrates": "35g",
      "protein": "15g",
      "fats": "12g"
    }
  },
  {
    "recipeName": "Chickpea and Vegetable Curry",
    "ingredients": [
      "1 can chickpeas, drained and rinsed",
      "2 cups mixed vegetables (e.g., cauliflower, carrots, peas)",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 can diced tomatoes",
      "2 tablespoons curry powder",
      "1 cup coconut milk",
      "2 tablespoons vegetable oil",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "In a large pot, heat vegetable oil over medium heat. Add chopped onion and garlic. Sauté until onions are translucent.",
      "Stir in curry powder and cook for 1-2 minutes until fragrant.",
      "Add mixed vegetables, diced tomatoes, and coconut milk. Simmer until the vegetables are tender.",
      "Stir in chickpeas and cook for an additional 5 minutes. Season with salt and pepper.",
      "Serve over cooked rice or with naan bread."
    ],
    "nutritionalInformation": {
      "calories": "380 kcal",
      "carbohydrates": "40g",
      "protein": "12g",
      "fats": "10g"
    }
  },
  {
    "recipeName": "Spinach and Feta Stuffed Chicken Breast",
    "ingredients": [
      "4 boneless, skinless chicken breasts",
      "2 cups fresh spinach",
      "1/2 cup feta cheese, crumbled",
      "2 cloves garlic, minced",
      "1 tablespoon olive oil",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 375°F (190°C).",
      "In a skillet, heat olive oil over medium heat. Add minced garlic and sauté for a minute.",
      "Add fresh spinach and cook until wilted. Remove from heat and stir in feta cheese, salt, and pepper.",
      "Cut a pocket into each chicken breast and stuff with the spinach and feta mixture.",
      "Bake for 25-30 minutes or until chicken is cooked through."
    ],
    "nutritionalInformation": {
      "calories": "380 kcal",
      "carbohydrates": "2g",
      "protein": "25g",
      "fats": "12g"
    }
  },
  {
    "recipeName": "Baked Sweet Potato with Avocado Salsa",
    "ingredients": [
      "2 sweet potatoes",
      "2 avocados, diced",
      "1/2 red onion, finely chopped",
      "1/4 cup fresh cilantro, chopped",
      "1 lime, juiced",
      "1 teaspoon cumin",
      "Salt and pepper to taste"
    ],
    "instructions": [
      "Preheat the oven to 400°F (200°C).",
      "Wash and pierce sweet potatoes with a fork. Bake for about 45-50 minutes or until tender.",
      "In a bowl, combine diced avocados, red onion, cilantro, lime juice, cumin, salt, and pepper to make the salsa.",
      "Cut open baked sweet potatoes and top with the avocado salsa."
    ],
    "nutritionalInformation": {
      "calories": "300 kcal",
      "carbohydrates": "35g",
      "protein": "4g",
      "fats": "14g"
    }
  }
];


async function recipestodb()
{

    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db('test');
    const collection =  db.collection('test_recipes');

    // Insert the document
    const result = await collection.insertMany(insert_recipes);

    console.log("recipes added successfully!");

}


// recipestodb();


// // Function to find recipes by ingredients and not including forbidden foods
// async function findRecipesByIngredients(ingredientName, forbiddenIngredients) {
//   // If you search with the forbiddenIngredients you don't get anything
//   // shouldn't forbiddenIngredients be an array in User?
//   if(ingredientName === forbiddenIngredients) return;
//   try {
//     // Connect to the MongoDB server
//     await client.connect();

//     // Access the database and collection
//     const db = client.db("test");
//     const collection = db.collection('test_recipes');

//     // Query for recipes that contain any of the provided ingredients 
//     var query;
//     if(forbiddenIngredients)
//    { 
//       // use this approach only if a user has forbiddenIngredients
//       query = {
//         // A regex (regular expression) search to find any ingredients that contain the ingredient name and option i for case insensitive
//         // it is like a wildcard in bash. eg *chicken* would give anything containing chicken in it
//         // And exclude forbiddenIngredients
//         $and: [{ingredients: {$regex: ingredientName, $options: "i",}}, {ingredients: {$not: {$regex: forbiddenIngredients, $options: "i" }}}],
//       };
//     }
//     else
//     {
//       // Just do a normal search if the user has no forbidden ingredients
//       query = {
//         ingredients: {$regex: ingredientName, $options: "i",}
//       }
//     }

//     const result = await collection.find(query).toArray();

//     return result;
//   } catch (error) {
//     console.error('Error finding recipes:', error);
//   } finally {
//     client.close();
//   }
// }

//Test function

// const ingredientToSearch = "chicken"
// findRecipesByIngredients(ingredientToSearch, null)
//   .then((recipes) => {
//     console.log('Matching Recipes:');
//     // recipes.forEach((recipe) => {
//     //   console.log(`Recipe Name: ${recipe.name}`);
//     //   console.log('Ingredients:', recipe.ingredients);
//     // });
//     console.log(recipes);
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });
