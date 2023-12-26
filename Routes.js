/**
 * A file to contain all the routes for the API
 */

const IP = '10.0.0.5';                          // User's IP address
const baseURL = 'http://' + IP + ':8080/';      // Base URL for the API

export const routes = {
    FOOD_URL: baseURL + 'getFoodItems',
    REMOVE_FOOD: baseURL + 'removeMealsLoggedToday',
    LOG_MEAL_URL: baseURL + 'logMeal',
    GET_MEALS_URL: baseURL + 'getMyMeals',
    GET_LOGGED_MEALS_URL: baseURL + 'getMealsLoggedToday',
    GET_CALENDAR_EVENTS_URL: baseURL + 'getCalendarEvents',
    ADD_CALENDAR_EVENT_URL: baseURL + 'addCalendarEvent',
    NUTRIENTS_LOGGED_TODAY_URL: baseURL + 'nutrientsLoggedToday',
    UPDATE_WEIGHT_URL: baseURL + '',
    ADD_CUSTOM_MEAL: baseURL + 'addCustomRecipe',
    GET_WEIGHTS: baseURL + 'getWeights',
    ADD_WEIGHT: baseURL + 'addWeight',
    GET_USER_INFO: baseURL + 'getUserInfo',
    SET_GOAL_WEIGHT: baseURL + 'setGoalWeight',
    ADD_FORBIDDEN_FOOD: baseURL + 'addForbiddenIngredient',
    REMOVE_FORBIDDEN_FOOD: baseURL + 'removeForbiddenIngredient',
    GET_FORBIDDEN_FOOD: baseURL + 'getForbiddenIngredient',
    GET_PANTRY_FOOD: baseURL + 'getPantryFoods',
    ADD_PANTRY_FOOD: baseURL + 'addFoodToPantry',
    REMOVE_PANTRY_FOOD: baseURL + 'removeFoodFromPantry',
    ONE_INGREDIENT_MEALS: baseURL + 'generateMealBasedOnIngredientsMIN',
    ALL_INGREDIENT_MEALS: baseURL + 'generateMealBasedOnIngredientsMAX',
    GENERATE_MEAL_PLAN: baseURL + 'generateMealPlan',
    GET_MEAL_PLAN: baseURL + 'getMealPlan',
    ADD_TO_MEAL_PLAN: baseURL + 'addToMealPlan',
    REMOVE_FROM_MEAL_PLAN: baseURL + 'removefromMealPlan',
    SET_ACTIVITY_LEVEL: baseURL + 'setActivityLevel',
}