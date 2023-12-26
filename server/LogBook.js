const Log = require("./Log");

class LogBook{
    constructor()
    {
        this.Logs = [];         // Initialize an empty list to store a list of logs for a user
    }

    addLog(log)
    {
      this.Logs.push(log);
    }
    findLog(date)
    {
      const logIndex = this.Logs.findIndex(log => log.date == date);
  
      // If there is a log for that date return it
      if(logIndex !== -1)
      {
        var foundLog = this.Logs[logIndex];
        const newLog = new Log(foundLog.date);
        newLog.Meals = foundLog.Meals;
        newLog.water = foundLog.water;
        newLog.time = foundLog.time;
        newLog.weight = foundLog.weight;
        newLog.totalNutrients = foundLog.totalNutrients;
        return newLog;
      }
  
      // Or return -1
      else
      {
        return -1;
      }
    }

    findDailyNutrients(date)
    {
        // get the index of that days log
        const logIndex = this.Logs.findIndex(log => log.date == date);
        if(logIndex !== -1)
        {
            const log = this.Logs[logIndex];
            return log.totalNutrients;
        }

        // If no log for that date return a -1
        return -1;
    }
    logWater()
    {
      let d = new Date()
      let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();
      let log = this.findLog(date);
      if(log !== -1)
      {
        log.addWater;
      }
      // If there is no log for today
      else{
        log = new log(date);
        log.addWater;
        this.addLog(log);
      }
    }
  
    logMeal(Meal)
    {
      let d = new Date()
      let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();
      let log = this.findLog(date);
      if(log !== -1)
      {
        log.addMeal(Meal);
      }
      // If there is no log for today
      else{
        log = new Log(date);
        log.addMeal(Meal);
        this.addLog(log);
      } 
    }
}

module.exports = LogBook;