import React, { useState } from "react";

function TabBar({ onTabChange }) {
  const [activeTab, setActiveTab] = useState("SmartNutritionSystem");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab); // Trigger the action passed as a prop
    }
  };

  const getClassName = (tab) => {
    return "tab " + (activeTab === tab ? "active" : "");
  };

  return (
    <div className="tab-bar">
      <div className="tab-group left">
        <div
          className={getClassName("SmartNutritionSystem")}
          onClick={() => handleTabClick("SmartNutritionSystem")}
        >
          Smart Nutrition System
        </div>
      </div>
      <div className="tab-group right">
        <div
          className={getClassName("Feedback")}
          onClick={() => handleTabClick("Feedback")}
        >
          Feedback
        </div>
        <div
          className={getClassName("About")}
          onClick={() => handleTabClick("About")}
        >
          About
        </div>
        <div
          className={getClassName("Contact")}
          onClick={() => handleTabClick("Contact")}
        >
          Contact
        </div>
      </div>
    </div>
  );
}

export default TabBar;
