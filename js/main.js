document.addEventListener("DOMContentLoaded", function () {
    // Select the form and result elements
    const calorieForm = document.getElementById("calorie-form");
    const resultSection = document.getElementById("result");
  
    // Attach an event listener to the "Calculate Calories" button
    const calculateButton = document.getElementById("calculate-button");
    calculateButton.addEventListener("click", calculateCalories);
  
    // Function to calculate daily calorie needs
    function calculateCalories() {
      // Get user input values
      const gender = document.getElementById("gender").value;
      const age = parseInt(document.getElementById("age").value);
      const measurementSystem = document.getElementById("measurement-system").value;
      let height = parseInt(document.getElementById("height").value);
      let weight = parseInt(document.getElementById("weight").value);
      const activityLevel = document.getElementById("activity-level").value;
  
      // Convert height and weight to metric if the Imperial system is selected
      if (measurementSystem === "imperial") {
          height *= 2.54; // Convert inches to centimeters
          weight *= 0.453592; // Convert pounds to kilograms
      }
  
      // Calculate BMR based on gender
      let bmr;
      if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else if (gender === "female") {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
  
      // Define calorie multipliers based on activity levels
      const activityLevels = {
        bmr: 1.2,
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        heavy: 1.725,
        physicalJob: 1.9,
        athlete: 2.0, // Doubles the calorie needs for athletes
      };
  
      // Calculate daily calorie needs based on activity level
      let calorieNeeds;
      if (activityLevels.hasOwnProperty(activityLevel)) {
        calorieNeeds = bmr * activityLevels[activityLevel];
      } else {
        calorieNeeds = 0;
      }
  
      // Display the result
      if (calorieNeeds > 0) {
        resultSection.innerHTML = `<p>Your estimated daily calorie needs: ${calorieNeeds.toFixed(2)} calories</p>`;
      } else {
        resultSection.innerHTML = `<p>Please select a valid activity level.</p>`;
      }
    }
  });
  