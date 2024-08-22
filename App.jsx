import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import TabBar from "./Components/TabBar";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Form from "./Components/Form";

function App() {
  const [content, setContent] = useState(
    "Welcome to the Smart Nutrition System"
  );

  const handleTabChange = (tab) => {
    switch (tab) {
      case "SmartNutritionSystem":
        setContent(<Form />);
        break;
      case "About":
        setContent(<About />);
        break;
      case "Feedback":
        setContent("We value your feedback. Please share your thoughts.");
        break;
      case "Contact":
        setContent(<Contact />);

        break;
      default:
        setContent("Welcome!");
    }
  };

  return (
    <div>
      <TabBar onTabChange={handleTabChange} />
      <div className="content">{content}</div>
    </div>
  );
}

export default App;
