// Log class
class Log{
    constructor(date)
    {
      this.date = date;
      this.Meals = [];
      this.water = 0;
      this.time = 0;
      this.weight = 0;
      this.totalNutrients = {
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fats: 0
      };
    }
    addMeal(Meal)
    {
      if(Meal && Meal.Nutrients)
      {
        this.totalNutrients.calories += parseFloat(Meal.Nutrients.calories);
        this.totalNutrients.carbohydrates += parseFloat(Meal.Nutrients.carbohydrates);
        this.totalNutrients.protein += parseFloat(Meal.Nutrients.protein);
        this.totalNutrients.fats += parseFloat(Meal.Nutrients.fats);
        this.Meals.push(Meal);
      }
    }
    addWater()
    {
      this.water++;
    }
    removeMeal(mealRemoved)
    {
      const indexToRemove = this.Meals.findIndex(meal => meal.Name == mealRemoved.Name);
  
      // Event should have been found but still do a check
      if(indexToRemove !== -1)
      {
        this.totalNutrients.calories -= parseFloat(mealRemoved.Nutrients.calories);
        this.totalNutrients.carbohydrates -= parseFloat(mealRemoved.Nutrients.carbohydrates);
        this.totalNutrients.protein -= parseFloat(mealRemoved.Nutrients.protein);
        this.totalNutrients.fats -= parseFloat(mealRemoved.Nutrients.fats);
        this.Meals.splice(indexToRemove, 1);
      }
    }
  }
  module.exports = Log;