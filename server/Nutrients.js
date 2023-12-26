class Nutrients{
    /*
    Nutrients class store a serious of Nutrients attribute
    including: Calories,Protein,carbohydrates and fat
    */

    constructor(Calories,Protein,carbohydrates,fats){
        this.calories = Calories;
        this.protein = Protein;
        this.carbohydrates = carbohydrates;
        this.fats = fats;
    }

}

module.exports = Nutrients;