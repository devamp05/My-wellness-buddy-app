const Event = require("./Event");
const Calendar = require("./Calendar")

/**
 * GroceryList Class is for making notes and setting 
 * event in calendar when you will go for grocery 
 */
class GroceryList
{
    constructor()
    {
        this.ingredients=[];
        this.Calendar = new Calendar();

    }

    /**
     *  addIndrgedients adding adding ingredinets to grocery list. 
     * @param {* (its a string added to ingredients list) } ingredient 
     * @param {* (string) } date 
     * @param {* (string) } startTime 
     * @param {* (string) } endTime 
     * @param {* (string) } title 
     */
    addIngredients(ingredient, date, startTime, endTime, title)
    {
        
        if(this.ingredients.length == 0) // if grocery list is empty then set event also (first time when you add ingredient to list)
        {
            this.ingredients.push(ingredient);
            const event= new Event(date, title, startTime, endTime);
            this.Calendar.addEvent(event);

        }
        else
        {
            this.ingredients.push(ingredient); // if you have already set event you will add ingredients to grocery lists 
        }
        
    }

    /**
     *  remove Ingredients removes ingredinets from grocery list 
     * @param {* (string) } ingredient 
     * @param {* (string) } title 
     */
    removeIngredient(ingredient, title) 
    {
        const index_of_ing =this.ingredients.indexOf(ingredient);
        // removing ingredient from list 
        if( index_of_ing != -1 )
        {
            this.ingredients.splice(index_of_ing, 1);
            
            
        }
        else 
        {
            console.log(ingredient+" ingredient does not exists");
            return (ingredient+" ingredient does not exists");
        }

        // if all ingredinets removed, delete the event 
        if(this.ingredients.length == 0)
        {  
            this.Calendar.removeEvent(title);
        }

    }

    
}



// *********************************** Test Case ******************************** //

const groceryList = new GroceryList();

// adding ingredients to grocerylist and seting up event 
try{
    groceryList.addIngredients("rice0", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice1", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice2", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice3", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice4", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice5", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice6", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice7", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice8", "2023-11-30", "4:00", "5:00", "trytest" );
groceryList.addIngredients("rice9", "2023-11-30", "4:00", "5:00", "trytest" );

}
catch(err)
{
    console.log(err);
}


try{
    if(groceryList.ingredients.length !=10)
    {
        throw new Error("Length of the list should be 10, but it is "+groceryList.ingredients.length);
    }

}
catch(err)
{
    console.log(err);
}



try{
    groceryList.removeIngredient("rice9", "trytest");
groceryList.removeIngredient("rice0", "trytest");
groceryList.removeIngredient("rice1", "trytest");
groceryList.removeIngredient("rice2", "trytest");
groceryList.removeIngredient("rice3", "trytest");
groceryList.removeIngredient("rice4", "trytest");
groceryList.removeIngredient("rice5", "trytest");
groceryList.removeIngredient("rice6", "trytest");
groceryList.removeIngredient("rice7", "trytest");
groceryList.removeIngredient("rice8", "trytest");

}
catch(err)
{
    console.log(err);
}


try{
    if(groceryList.ingredients.length !=0)
    {
        throw new Error("Length of the list should be 0, but it is "+groceryList.ingredients.length);
    }

}
catch(err)
{
    console.log(err);
}


console.log("*** unit test has been completed successfully ***");

module.exports = GroceryList;