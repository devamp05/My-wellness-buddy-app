const Pantry = require("./Pantry");
const Meal = require("./Meal");
const Nutrients = require('./Nutrients');


/**
 * MealManager class is manage our meals
 * We can create and save all our meals with their instructions, names, ingredients and nutreins
 * We can generate meal based on our desired ingredinets(recipe) and also can generate based on our required nutreins
 */
class MealManager{

    constructor()
    {
        this.Meal=[];
        this.Pantry =  new Pantry();

    }
    
    /**
     * createNewMeal method creates new meals based on our provided information 
     * @param {* string} Name 
     * @param {* string } instruction 
     * @param {* string or list } ingredients 
     * @param {* integer} Calories 
     * @param {* integer} Protein 
     * @param {* integer} carbohydrates 
     * @param {* integer} fat 
     */
    createNewMeal(Name,instruction,ingredients,Calories,Protein,carbohydrates,fat)
    {
        // we check if meal consist of one ingredient or multiple 
        
         
            const tempMeal = new Meal(Name,instruction,ingredients,Calories,Protein,carbohydrates,fat);
            this.Meal.push(tempMeal);
       

    }


    /**
     * removemeal method removing meal from list 
     * @param {*} Mealname 
     */
    removeMeal(Mealname)
    {
        var index_of_meal = this.Meal.findIndex(Meal => Meal.Name==Mealname);// finding index of meal 


        if(index_of_meal !=-1)
        {
            this.Meal.splice(index_of_meal, 1); // removing by index 
        }
        else
        {
           // console.log("Meal does not exist");
            return "Meal does not exist"
        }
    }
    


    /**
     * searchforMeal method is looking if you have patricular meal
     * @param {* (string)} nameofMeal 
     * @returns  meal
     */
    searchforMeal(nameofMeal)
    {
        var index_of_meal = this.Meal.findIndex(Meal => Meal.Name==nameofMeal);// finding index of meal 
        

        if(index_of_meal !=-1)
        {
            return this.Meal[index_of_meal]; // if found returing meal 
        }
        else
        {
            return "Meal does not exist"
        }

    }



    /**
     * This method is checking with your pantry if you have in pantry particular meal
     * @param {* (string)} ingredient 
     * @returns false or true 
     */
    checkIngredientwithPantry(ingredient)
    {
        var index_of_ingredient = this.Pantry.findIndex(pantryfoods => pantryfoods.ingredient == ingredient); // find inddex of ingredint
       

        if(index_of_ingredient !=-1)
        {
            //console.log("You have", ingredient, "in your pantry"); 
            return true;
        }
        else
        {
            //console.log("You do not have", ingredient, "in your pantry");
            return false;
        }

    }


    /**
     *  This method generates meal based on our Nutriens needs 
     * @param {* (int number of calories) } Calories 
     * @param {* (int amount proteins)} Protein 
     * @param {* (integer) } carbohydrates 
     * @param {* (integer)} fat 
     * @returns meal if not successfull fail message 
     */
    // generateMealBasedOnNutreins(Calories, Protein, carbohydrates, fat)
    // {
        
    //     const index_of_calories = this.Meal.findIndex(Meal => Meal.Nutrients.calories==Calories);// find inddex
    //     console.log(index_of_calories);
    //     const  index_of_protein = this.Meal.findIndex(Meal => Meal.Nutrients.protein == Protein);
    //     console.log(index_of_protein);
    //     var index_of_carbohydrates = this.Meal.findIndex(Meal => Meal.Nutrients.carbohydrates == carbohydrates);// find inddex
    //     console.log(index_of_carbohydrates);
    //     var index_of_fat = this.Meal.findIndex(Meal => Meal.Nutrients.fat == fat);// find inddex
    //     console.log(index_of_fat);

    //     if((index_of_calories == index_of_protein) && (index_of_calories == index_of_carbohydrates) && (index_of_calories == index_of_fat) && (index_of_calories != -1) ) 
    //     {
    //         return this.Meal[index_of_calories]; // if found returns meal 
    //     }
    //     else
    //     {
    //         return "You do not have such food in your meal list"
    //     }

    // }


    /**
     * This method is generating meal based on desired ingredients. All provided ingredinets must match 
     * @param {*provide ingredients that you want your meal to containing} ingredients 
     * @returns if successfull meal else message. 
     */
    generateMealBasedOnIngredientsMAX()
    {
       var ingredients= this.Pantry.pantryfoods;

        if(ingredients == undefined)
        {
            return "invalid ingredients passed to generateMealBasedOnIngredientsMAX";
        }
        else if(ingredients.length == 1) // if ingredint is one 
        {
            

            var index_of_ingredients = this.Meal.findIndex(Meal =>Meal.ingrdients == ingredients);


            const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(ingredients);

            //const index_of_pantry = this.Pantry.pantryfoods.indexOf(ingredients);
            if(index_of_forbidden !=-1)
            {
                return (ingredients+ " in your pantry forbidden list. Meal can not be generated ");
            }
            else if(index_of_ingredients !=-1)
            {
                //console.log("You have meal with ", ingredients, "in your meal list");
                return this.Meal[index_of_ingredients];
            }
            else
            {
                //console.log("You do not have meal with ", ingredients, "in your meal list");
                return ("You do not have meal with "+ingredients+" in your meal list");
                //return [];
            }

        }
        else
        { 
            
            // if ingredints is list 
            
            for(let i=0; i<ingredients.length; i++)
            {
                // here I am cheking if user can make this food. I am checking with his pantry 
                const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(ingredients[i]);

                //const index_of_pantry = this.Pantry.pantryfoods.indexOf(ingredients[i]);

                    
                if(index_of_forbidden !=-1)
                {
                    return  (ingredients+ " in your pantry forbidden list. Meal can not be generated ");
                    
                }

                // if(index_of_pantry == -1)
                // {
                //     return (ingredients+ " is not in your pantry food list. Meal can not be generated ");
                // }

            }

            for(let i=0; i<this.Meal.length; i++)
            {
                let count =0;
                    for(let k=0; k<ingredients.length; k++)
                    {
                        for(let j=0; j<this.Meal[i].ingrdients.length; j++)
                        {   
                            if(this.Meal[i].ingrdients[j] == ingredients[k])
                            {
                                count++;
                            }

                        }

                    }
                    

                    if(count == this.Meal[i].ingrdients.length )
                    {
                        //console.log(this.Meal[i])
                        return this.Meal[i]
                    }
                    count =0;
                

                if(i==this.Meal.length-1)
                {
                    //console.log(typeof ("You do not have meal with "+ingredients+" in your created meal list"))
                    return ("You do not have a meal with " + ingredients);
                }

            }
        }

        
    }







    /**
     * This class generates meal based on ingredinets and checks if all ingredinets are in pantry. 
     * It will generate meal even if one ingredinet will match. 
     * @param {*} ingredients 
     * @returns 
     */
    generateMealBasedOnIngredientsMIN()
    {
        var ingredients= this.Pantry.pantryfoods;
        //console.log(ingredients);
        if(ingredients==undefined)
        {
            return "invalid ingredients passed generateMealBasedOnIngredientsMIN";
        }
        else if(ingredients.length == 1) // if ingredint is one 
        {
            // console.log('skdhfb;sk');
            const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(ingredients);

            if(index_of_forbidden !=-1)
            {
                return ( ingredients+" in your pantry forbidden list. Meal can not be generated ");
            }

            const mealslist =[];     
            for(let i=0; i<this.Meal.length; i++)
            {
                
                let flag =0; 
                    if(typeof this.Meal[i].ingrdients == "string")
                    {
                        if(this.Meal[i].ingrdients == ingredients[0] )
                        {
                            flag=1;
                          
                        }

                    }
                    else 
                    {
                        for(let j=0; j<this.Meal[i].ingrdients.length; j++)
                        { 
                            if(this.Meal[i].ingrdients[j] == ingredients[0])
                            {
                                flag=1;
                             
                            }
                        }

                    }
                    

                

                if(flag==1)
                {
                    mealslist.push(this.Meal[i]);
                }
                flag=0;
            }

            if(mealslist.length==0)
            {
                
                //console.log("You do not have meal with ", ingredients, "in your meal list jh");
                return ("You do not have a meal with " + ingredients);
                // return [];
            }
            else
            {
                
                return mealslist;
            }
        }
        else
        { 
            
            // if ingredints is list then we have to check for all list if they are in forbidden list or not or in pantry  
            
            for(let i=0; i<ingredients.length; i++)
            {
                // here I am cheking if user can make this food. I am checking with his pantry 
                const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(ingredients[i]);


                    
                if(index_of_forbidden !=-1)
                {
                    return  (ingredients+ " in your pantry forbidden list. Meal can not be generated ");
                    
                }

            }
            




            const mealslist =[];
            let forbidden_in_list =0;
            for(let i=0; i<this.Meal.length; i++)
            {
                
                let flag =0; 
                
                for(let k=0; k<ingredients.length; k++)
                {
                    
                    if(typeof this.Meal[i].ingrdients == "string")
                    {
                        if(this.Meal[i].ingrdients == ingredients[k])
                        {
                            flag=1;

                        }

                        const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(this.Meal[i].ingrdients);

                        if(index_of_forbidden !=-1)
                        {
                            
                            flag=0;
                           forbidden_in_list =1;
                        }


                    }
                    else 
                    {
                        for(let j=0; j<this.Meal[i].ingrdients.length; j++)
                        {  
                            if(this.Meal[i].ingrdients[j] == ingredients[k])
                            {
                                flag=1;

                            }

                            const index_of_forbidden = this.Pantry.forbiddeningredients.indexOf(this.Meal[i].ingrdients[j]);

                            
                            if(index_of_forbidden !=-1)
                            {
                                
                                flag=0;
                            forbidden_in_list =1;
                            }


                        }

                    }
                    
                    

                }

                if(flag==1 && forbidden_in_list==0)
                {
                    mealslist.push(this.Meal[i]);
                
                }
                flag=0;
                forbidden_in_list =0;

            }

                if(mealslist.length==0)
                {
                    return ("You do not have meal with "+ingredients+" in your created meal list");
                }
                else 
                {

                    return mealslist;
                }

        }
        

        
    }
}


const meal = new MealManager();
let ingredient1 = ["potato0", "potato1", "potato2", "potato3", "potato4", "potato5", "potato6"];
let ingredient2 = ["potato22", "apple1", "apple0", "apple2", "apple3", "apple4", "apple5"];
let ingredient3 = ["potato0", "apple0", "potato2", "potato3", "potato4", "potato5", "potato6"];
let ingredient4 = ["potato0", "potato1", "potato2", "potato3", "potato4", "potato5", "e"];
const testmeal = new Meal("test1","ddd", ingredient1, 6, 3, 2, 16 );
try 
{
   // Adding to pantry forbiddedn ingredinets and foods 
    meal.Pantry.addExistingIngredient("potato0");
    meal.Pantry.addForbiddenIngredient("a");
    meal.Pantry.addExistingIngredient("potato1");
    meal.Pantry.addForbiddenIngredient("b");
    meal.Pantry.addExistingIngredient("potato2");
    meal.Pantry.addForbiddenIngredient("c");
    meal.Pantry.addExistingIngredient("potato3");
    meal.Pantry.addForbiddenIngredient("d");
    meal.Pantry.addExistingIngredient("potato4");
    meal.Pantry.addForbiddenIngredient("e");
    meal.Pantry.addExistingIngredient("potato5");
    // meal.Pantry.addForbiddenIngredient("f");
    // meal.Pantry.addExistingIngredient("potato6");
    // meal.Pantry.addForbiddenIngredient("g");
    // meal.Pantry.addExistingIngredient("apple0");
    // meal.Pantry.addExistingIngredient("potato10");
    // meal.Pantry.addExistingIngredient("potato11");
    // meal.Pantry.addExistingIngredient("potato12");
    // meal.Pantry.addExistingIngredient("potato13");
    // meal.Pantry.addExistingIngredient("potato14");
    // meal.Pantry.addExistingIngredient("potato15");
    // meal.Pantry.addExistingIngredient("potato16");
  

    // creating new meals for user 
    meal.createNewMeal("potato","aaa", "potato0", 5, 4, 1, 12 );
    meal.createNewMeal("apple","bbb", "apple0", 6, 7, 2, 15 );
    meal.createNewMeal("potato1","aaasa", "potato3", 5, 4, 1, 12 );
    meal.createNewMeal("apple1","sd", "apple0", 6, 7, 2, 15 );
    meal.createNewMeal("test1","ddd", ingredient1, 6, 3, 2, 16 );
    meal.createNewMeal("test2","ccc", ingredient2, 5, 7, 4, 12 );
    meal.createNewMeal("test3","ggg", ingredient3, 6, 3, 2, 16 );
    meal.createNewMeal("test4","kkk", ingredient4, 5, 7, 4, 12 );
}
catch(error)
{
    console.log(error);
}



// if(meal.Meal[1].Nutrients.calories != 6)
// {
//     throw new Error("Calories of second meal do not match ");
// }

// if(meal.Meal[3].Nutrients.protein != 7)
// {
//     throw new Error("Proteint of fourth meal does not match ");
// }
// console.log(meal.Meal.ingrdients.length)
//  console.log(meal.Meal)
// console.log(meal.Pantry.pantryfoods)
//console.log(meal.generateMealBasedOnIngredientsMAX());
//console.log(meal.generateMealBasedOnIngredientsMAX(["potato10", "potato11", "potato12", "potato13", "potato14", "potato15", "potato16"]));

//  if(meal.generateMealBasedOnIngredientsMAX(ingredient1).Name !=testmeal.Name )
//  {
//      throw new Error("Different meal has been generated. Meal name should be "+testmeal.Name);
//  }

 //console.log(meal.generateMealBasedOnIngredientsMAX())


//  if(meal.generateMealBasedOnIngredientsMAX(ingredient3).Name !="test3")
//  {
//      throw new Error("Different meal has been generated. Meal name should be test2");
//  }


// if(meal.searchforMeal("apple").Name != "apple")
// {
//     throw new Error("Searchmeal has failed, returned meal name should be  apple")
// }


// meal.generateMealBasedOnIngredientsMAX("potato11")
// meal.generateMealBasedOnIngredientsMAX("potato0")
// meal.generateMealBasedOnIngredientsMAX("potato31")
// meal.generateMealBasedOnIngredientsMAX("apple0")

// //console.log(meal.generateMealBasedOnIngredientsMAX("apple0").Name)

// if(meal.generateMealBasedOnIngredientsMAX("apple0").Name != "apple" )
//  {
//      throw new Error("Different meal has been generated. Meal name should be apple");
//  }

 //meal.generateMealBasedOnIngredientsMIN();

//  meal.generateMealBasedOnIngredientsMIN("apple0");

 console.log(meal.generateMealBasedOnIngredientsMIN());


// meal.removeMeal("apple");
// if(meal.searchforMeal("apple").Name == "apple")
// {
//     throw new Error("Remonemeal  has failed, returned meal with name apple while it should not")
// }

 console.log(" *** Test has been completed successfull  MealManager*** ")
module.exports = MealManager;