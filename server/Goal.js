const Nutrients = require('./Nutrients');

class Goal {
    constructor(){
        this.Nutrients = new Nutrients(); // User's Daily Nutritional goal
        this.Weight = 0;   // User's Weight goal
        this.Duration = 0; // Duration to reach goal in days 
    }

    /*
        Parameters are only updated if a non-null value is passed into the function
        Parameters: 
            duration
        Return: None
        Post-Conditions: Sets/Updates the weight goal the user wants to reach
    */
    setWeight(weight){
        if(weight != null){
            this.Weight = weight;
        }
    }

    /*
        Parameters are only updated if a non-null value is passed into the function
        Parameters: 
            duration
        Return: None
        Post-Conditions: Sets/Updates the duration(days) that a users needs to acheive their goal
    */
    setDuration(duration){
        if(duration != null){
            this.Duration = duration;
        }
    }

    /*
        Parameters are only updated if a non-null value is passed into the function
        Parameters: 
            calories
            protein
            carbohydrates
            fat
        Return: None
        Post-Conditions: Updates the nutritional breakdown of a users goal
    */
    setNutrition(calories, protein, carbohydrates, fats){
        
        if(calories != null){
            this.Nutrients.calories = calories;
        }
        if(protein != null){
            this.Nutrients.protein = protein;
        }
        if(carbohydrates != null){
            this.Nutrients.carbohydrates = carbohydrates;
        }
        if(fats != null){
            this.Nutrients.fats = fats;
        }

    }

}

module.exports = Goal;