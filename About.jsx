import React from "react";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Smart Nutrition System</h1>
      </header>
      <section className="about-content">
        <h2>What is the Smart Nutrition System?</h2>
        <p>
          The Smart Nutrition System is a cutting-edge platform designed to help
          individuals achieve their health and fitness goals through
          personalized diet plans and nutritional guidance. Leveraging advanced
          algorithms and real-time data, our system provides tailored
          recommendations based on users' personal and health information.
        </p>
        <p>Key features include:</p>
        <ul>
          <li>
            Personalized diet plans based on individual health metrics and
            preferences
          </li>
          <li>Real-time tracking of nutritional intake and progress</li>
          <li>
            Integration with wearable devices for accurate data collection
          </li>
          <li>Accessible through both web and mobile platforms</li>
        </ul>
        <p>
          Our mission is to make healthy eating simple and accessible for
          everyone, providing users with the tools they need to lead a healthier
          and more balanced life.
        </p>
      </section>
    </div>
  );
}

export default About;
