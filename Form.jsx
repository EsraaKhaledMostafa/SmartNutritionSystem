import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    healthConditions: "",
    dietaryPreferences: "",
  });

  function handleChange(props) {
    const name = props.target.name;
    const value = props.target.value;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a POST request to the server
    fetch("http://localhost:8080/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send the form data as JSON
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="nutrition-form-container">
      <h1>Fill in the Form to receive your Diet Plan</h1>
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

        <label htmlFor="healthConditions">Health Conditions:</label>
        <textarea
          id="healthConditions"
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleChange}
        />

        <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
        <textarea
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
