import React from "react";

function displayDietPlan(dietPlan) {
  return (
    <div className="diet-plan-container">
      <h2>Your Personalized Diet Plan</h2>
      <ul className="plan-list">
        {dietPlan.map((item, index) => (
          <li key={index} className="list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default displayDietPlan;
