const GroceryList = require("./GroceryList");

/**
 * Pantry class stores you foods that you have and also forbiddent ingrdients 
 */
class Pantry{

    constructor()
    {
        this.forbiddeningredients=[];
        this.pantryfoods=[];


    }

    /**
     * This method adding forbidden ingrdinets to the list 
     * @param {*} forbiddeningredient 
     */
    addForbiddenIngredient(forbiddeningredient)
    {
        this.forbiddeningredients.push(forbiddeningredient); // add string to list 

    }

    /**
     * This method removes forbidden ingredinets from llist 
     * @param {*} forbiddeningredient 
     */
    removeForbiddenIngredient(forbiddeningredient)
    {
        const index_of_ing = this.forbiddeningredients.indexOf(forbiddeningredient); // find index of matching ingredinet 
       

        if(index_of_ing != -1)
        {
            this.forbiddeningredients.splice(index_of_ing, 1); // remove from list 
        

        }
        else
        {
            console.log(forbiddeningredient+" ingredient does not exist"); 
            return (forbiddeningredient+" ingredient does not exist"); 
        }

    }

    /**
     * This method adding our foood to the system 
     * @param {*} ingredient 
     */
    addExistingIngredient(ingredient)
    {
        this.pantryfoods.push(ingredient);// add string to list 
    }

    /**
     * This method removing ingredinets from pantry 
     * @param {*} ingredient 
     */
    removeIngredient(ingredient)
    {
        const index_of_ing = this.pantryfoods.indexOf(ingredient);// find index of matching ingredinet 

        if(index_of_ing != -1)
        {
            this.pantryfoods.splice(index_of_ing, 1); // remove ingredient 

        }
        else
        {
            console.log(ingredient+" ingredient does not exist")
            return (ingredient+" ingredient does not exist")
        }

    }

    /**
     * This method is showing all pantry foods that we have 
     * @returns all pantry foods 
     */
    ShowPantryFoods()
    {
        //console.log(this.pantryfoods);
        return this.pantryfoods;
    }


    /**
     * This method is showing  all pantry forbidden ingredients 
     * @returns all pantry forbidden ingredients 
     */
    ShowPantryForbiddenIngredients()
    {
        //console.log(this.forbiddeningredients);
        return this.forbiddeningredients;
    }
}


// *********************  Test case  ********************* //
const  pantry = new Pantry();
pantry.addExistingIngredient("potato0");
pantry.addForbiddenIngredient("a");
pantry.addExistingIngredient("potato1");
pantry.addForbiddenIngredient("b");
pantry.addExistingIngredient("potato2");
pantry.addForbiddenIngredient("c");
pantry.addExistingIngredient("potato3");
pantry.addForbiddenIngredient("d");
pantry.addExistingIngredient("potato4");
pantry.addForbiddenIngredient("e");
pantry.addExistingIngredient("potat5");
pantry.addForbiddenIngredient("f");
pantry.addExistingIngredient("potato6");
pantry.addForbiddenIngredient("g");

try{
    
    pantry.removeForbiddenIngredient("g");
}
catch(err)
{
    console.log("Could not remove from list of forbidden ingredientts, while it is in the list "+err);
}

if(pantry.forbiddeningredients.indexOf("g") != -1)
{
    throw new Error("g was not removed from pantry forbidden ingredient list");
}

try{
    
    pantry.removeIngredient("potato4");
}
catch(err)
{
    console.log("Could not remove from list of forbidden ingredientts, while it is in the list "+err);
}

if(pantry.pantryfoods.indexOf("potato4") != -1)
{
    throw new Error("potato2 was not removed from pantry forbidden ingredient list");
}




try{
    
    pantry.removeForbiddenIngredient("d");
}
catch(err)
{
    console.log("Could not remove from list of forbidden ingredientts, while it is in the list "+err);
}

if(pantry.forbiddeningredients.indexOf("d") != -1)
{
    throw new Error("d was not removed from pantry forbidden ingredient list");
}

try{
    
    pantry.removeIngredient("potato2");
}
catch(err)
{
    console.log("Could not remove from list of forbidden ingredientts, while it is in the list "+err);
}
if(pantry.pantryfoods.indexOf("potato2") != -1)
{
    throw new Error("potato2 was not removed from pantry forbidden ingredient list");
}

let test_pantry_food_list2=[ 'potato0', 'potato1', 'potato3', 'potat5', 'potato6' ]; // our expected list 
let test_forbidden_ingredients_list2=[ 'a', 'b', 'c', 'e', 'f' ];
for(let i=0; i < pantry.pantryfoods.length; i++)
{
    if(test_pantry_food_list2[i]!=pantry.pantryfoods[i])
    {
        throw new Error("Pnatry food list does not match to what should be in it");
    }
}
for(let i=0; i < pantry.forbiddeningredients.length; i++)
{
    if(test_forbidden_ingredients_list2[i] != pantry.forbiddeningredients[i] )
    {
        throw new Error("Pnatry forbidden ingredient list does not match to what should be in it");
    }
}


console.log(" *** Test has been completed successfull *** ")



module.exports=Pantry;