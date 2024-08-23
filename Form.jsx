import React, { useState } from "react";
import displayDietPlan from "./DietPlan";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    healthConditions: "",
  });

  // State to keep track of the diet plan
  const [dietPlan, setDietPlan] = useState(null);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedConditions = checked
          ? [...prevData.healthConditions, value]
          : prevData.healthConditions.filter(
              (condition) => condition !== value
            );

        return { ...prevData, healthConditions: updatedConditions };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a POST request to the server
    fetch("http://localhost:8080/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Set the diet plan state with the received data
        setDietPlan(data.dietPlan);
        alert(
          "Form submitted successfully! Press Ok to Receive your Diet Plan :D"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });
  }

  return (
    <div className="nutrition-form-container">
      {!dietPlan ? (
        <>
          <h1>Your Healthy Life starts Here!</h1>
          <form onSubmit={handleSubmit} className="nutrition-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />

            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />

            <label htmlFor="activityLevel">Activity Level:</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly active</option>
              <option value="moderate">Moderately active</option>
              <option value="intense">Intensely active</option>
            </select>

            <fieldset className="fieldset-container">
              <legend>Health Conditions:</legend>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="BloodPressure"
                  checked={formData.healthConditions.includes("BloodPressure")}
                  onChange={handleChange}
                />
                Blood Pressure
              </label>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="Diabetes"
                  checked={formData.healthConditions.includes("Diabetes")}
                  onChange={handleChange}
                />
                Diabetes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="HeartDiseases"
                  checked={formData.healthConditions.includes("HeartDiseases")}
                  onChange={handleChange}
                />
                Heart Diseases
              </label>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="DigestiveDisorders"
                  checked={formData.healthConditions.includes(
                    "DigestiveDisorders"
                  )}
                  onChange={handleChange}
                />
                Digestive Disorders
              </label>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="LactoseIntolerance"
                  checked={formData.healthConditions.includes(
                    "LactoseIntolerance"
                  )}
                  onChange={handleChange}
                />
                Lactose Intolerance
              </label>
              <label>
                <input
                  type="checkbox"
                  name="healthConditions"
                  value="Vegeterian"
                  checked={formData.healthConditions.includes("Vegeterian")}
                  onChange={handleChange}
                />
                Vegeterian
              </label>
            </fieldset>

            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <div id="output">{displayDietPlan(dietPlan)}</div>
      )}
    </div>
  );
}

export default Form;
