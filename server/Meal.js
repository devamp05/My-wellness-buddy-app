const Nutrients = require('./Nutrients');

class Meal{

    constructor(Name,instruction,ingrdients,Calories,Protein,carbohydrates,fats){
        this.Name = Name;
        this.instruction = instruction;
        // store list of strings
        this.ingrdients = ingrdients;
        // store list of nutrient object
        this.Nutrients = new Nutrients(Calories,Protein,carbohydrates,fats);
    }

    // gettters for Nutrients's attributes

    /**
     * @returns the calories of meal (within Nutrients object)
     */
    getCalories(){
        return this.Nutrients.calories;
    }

    /**
     * 
     * @returns protein of meal (within Nutrients object)
     */
    getProtein(){
        return this.Nutrients.protein;
    }

    /**
     * 
     * @returns carbohydrates of meal (within Nutrients object)
     */
    getCarbohydrates(){
        return this.Nutrients.carbohydrates;
    }

    /**
     * 
     * @returns fat of meal (within Nutrients object)
     */
    getFat(){
        return this.Nutrients.fats;
    }
    
    // setters for Nutrients's attributes

    /**
     * 
     * @param {Sting} car new carbohydrates of meal is going to replace the old one
     */
    setCarbohydrates(car){
        this.Nutrients.carbohydrates = car;
    }

    /**
     * 
     * @param {String} fat new fat of meal is going to replace the old one
     */
    setFat(fat){
        this.Nutrients.fats = fat;
    }

    /**
     * 
     * @param {String} cal new calories of meal is going to replace the old one
     */
    setCalories(cal){
        this.Nutrients.calories = cal;
    }

    /**
     * 
     * @param {String} pro new protein of meal is going to replace the old one
     */
    setProtein(pro){
        this.Nutrients.protein = pro;
    }

    /**
     * @purpose: setter to create a new Nutrients obejct and assign it to meal's Nutrients attribute
     * @param {String} Calories new calories of meal 
     * @param {String} Protein new protein of meal 
     * @param {String} carbohydrates new carbohydrates of meal
     * @param {String} fat new fat of meal
     */
    setNutrients(Calories,Protein,carbohydrates,fat){
        this.Nutrients = new Nutrients(Calories,Protein,carbohydrates,fat);
    }
}

function Test() {
    // unit test, report error when there is issue

    var ingre = ["apple","banana"]
    meal = new Meal("meal2", "instruction", ingre,'Calories','Protein','carbohydrates','fat');
    if (meal.Name!="meal2"){
        console.log("error in Meal.js: meal.name");
    }
    if (meal.instruction!="instruction"){
        console.log("error in Meal.js: meal.instruction");
    }
    if (meal.ingrdients!= ingre){
        console.log("error in Meal.js: meal.ingrdients");
    }
    if (meal.getCalories()!='Calories'){
        console.log("error in Meal.js: meal.getCalories()");
    }
    if (meal.getCarbohydrates()!='carbohydrates'){
        console.log("error in Meal.js: meal.getCarbohydrates");
    }
    if (meal.getProtein()!='Protein'){
        console.log("error in Meal.js: meal.getProtein()");
    }
    if (meal.getFat()!='fat'){
        console.log("error in Meal.js: meal.getFat()");
    }

    // test getter and setter
    var test_param = 'new_cal'
    meal.setCalories(test_param);
    if (meal.getCalories()!=test_param){
        console.log("error in Meal.js: meal.getCalories(), setCalories()");
    }

    var test_param = 'new_car'
    meal.setCarbohydrates(test_param);
    if (meal.getCarbohydrates()!=test_param){
        console.log("error in Meal.js: meal.getCarbohydrates(), setCarbohydrates()");
    }

    var test_param = 'new_pro'
    meal.setProtein(test_param);
    if (meal.getProtein()!=test_param){
        console.log("error in Meal.js: meal.getProtein(), setProtein()");
    }

    var test_param = 'new_fat'
    meal.setFat(test_param);
    if (meal.getFat()!=test_param){
        console.log("error in Meal.js: meal.getFat(), setFat()");
    }

    // unit test for setNutrients
    var test_param = meal.Nutrients
    meal.setNutrients('Cal','Pro','Car','Fat');
    if (meal.Nutrients==test_param){
        console.log("error in Meal.js: meal.setNutrients()");
    }

    var test_param = 'Cal'
    if (meal.getCalories()!=test_param){
        console.log("error in Meal.js: meal.getCalories(), setCalories()");
    }

    var test_param = 'Car'
    if (meal.getCarbohydrates()!=test_param){
        console.log("error in Meal.js: meal.getCarbohydrates(), setCarbohydrates()");
    }

    var test_param = 'Pro'
    if (meal.getProtein()!=test_param){
        console.log("error in Meal.js: meal.getProtein(), setProtein()");
    }

    var test_param = 'Fat'
    if (meal.getFat()!=test_param){
        console.log("error in Meal.js: meal.getFat(), setFat()");
    }
}

Test();

module.exports = Meal;