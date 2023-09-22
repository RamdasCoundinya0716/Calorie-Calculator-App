document.addEventListener("DOMContentLoaded", function () {
    // Select the form, result, and measurement system elements
    const calorieForm = document.getElementById("calorie-form");
    const resultSection = document.getElementById("result");
    const measurementSystemRadio = document.getElementsByName("measurement-system");
  
    // Select the input fields for height and weight
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
  
    // Create input fields for feet and inches
    const feetInput = document.createElement("input");
    feetInput.type = "number";
    feetInput.id = "feet";
    feetInput.name = "feet";
    feetInput.min = "1";
    feetInput.placeholder = "Feet";
  
    const inchesInput = document.createElement("input");
    inchesInput.type = "number";
    inchesInput.id = "inches";
    inchesInput.name = "inches";
    inchesInput.min = "0";
    inchesInput.max = "11";
    inchesInput.placeholder = "Inches";
  
    // Attach an event listener to the "Calculate Calories" button
    const calculateButton = document.getElementById("calculate-button");
    calculateButton.addEventListener("click", calculateCalories);
  
    // Attach an event listener to the measurement system radio buttons
    measurementSystemRadio.forEach(function (radio) {
      radio.addEventListener("change", function () {
        // Clear the input fields when the measurement system changes
        weightInput.value = "";
        resultSection.innerHTML = ""; // Clear the calculated calories
  
        // Remove or add the "Feet" and "Inches" input fields based on the selected measurement system
        if (radio.value === "metric") {
          // Switch to Metric System: Remove "Feet" and "Inches" fields
          if (feetInput.parentNode) {
            feetInput.parentNode.removeChild(feetInput);
          }
          if (inchesInput.parentNode) {
            inchesInput.parentNode.removeChild(inchesInput);
          }
          // Restore the "Height in cms" input field
          heightInput.type = "number";
          heightInput.placeholder = "Height in cms";
          weightInput.placeholder = "Weight in kilos";
        } else if (radio.value === "imperial") {
          // Switch to Imperial System: Remove "Height in cms" field
          heightInput.type = "hidden";
          heightInput.value = "";
          heightInput.removeAttribute("placeholder");
          // Add "Feet" and "Inches" fields
          heightInput.parentNode.insertBefore(feetInput, heightInput.nextSibling);
          heightInput.parentNode.insertBefore(inchesInput, heightInput.nextSibling);
          // Update the placeholders for "Feet" and "Inches" fields
          feetInput.placeholder = "Feet";
          inchesInput.placeholder = "Inches";
          weightInput.placeholder = "Weight in pounds"; 
        }
      });
    });
  
    // Function to calculate daily calorie needs
    function calculateCalories() {
      // Get user input values
      const gender = document.getElementById("gender").value;
      const age = parseInt(document.getElementById("age").value);
      let height, weight;
  
      // Determine the selected measurement system (metric or imperial)
      const selectedMeasurementSystem = document.querySelector('input[name="measurement-system"]:checked').value;
  
      if (selectedMeasurementSystem === "metric") {
        // Get the value from the single input field for height in centimeters
        height = parseFloat(heightInput.value) || 0;
      } else if (selectedMeasurementSystem === "imperial") {
        // Get the values from the separate input fields for feet and inches
        const feet = parseInt(feetInput.value) || 0;
        const inches = parseFloat(inchesInput.value) || 0;
  
        // Calculate height in inches
        height = feet * 12 + inches; // Convert feet to inches and add inches
      }
  
      // Get weight from the input field
      weight = parseFloat(weightInput.value) || 0;
  
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
  
      // Get the selected activity level
      const activityLevel = document.getElementById("activity-level").value;
  
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
  
