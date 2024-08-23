#include "httplib.h"
#include <nlohmann/json.hpp>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>

// Include the food category classes
#include "FoodCategories.h"

using json = nlohmann::json;
using namespace httplib;

// Initialize food categories
Carbs carbs;
Protein protein;
Sweets sweets;
Veggies veggies;

// Function to generate a one-week diet plan
std::vector<std::string> generateDietPlan()
{
    std::vector<std::string> dietPlan;

    for (int i = 1; i <= 7; ++i)
    {
        // Add a header for the day
        dietPlan.push_back("Day " + std::to_string(i) + ":");

        // Generate and add the meals for the day
        dietPlan.push_back("  Breakfast: " + carbs.getRandomItem().name + ", " + protein.getRandomItem().name);
        dietPlan.push_back("  Lunch: " + veggies.getRandomItem().name + ", " + protein.getRandomItem().name);
        dietPlan.push_back("  Dinner: " + carbs.getRandomItem().name + ", " + veggies.getRandomItem().name + ", " + protein.getRandomItem().name);
        dietPlan.push_back("  Snack: " + sweets.getRandomItem().name);

        // Add a separator for the next day
        dietPlan.push_back("---------------------------");
    }

    return dietPlan;
}

void addCORSHeaders(Response &res)
{
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");
}

void saveData(const Request &req, Response &res)
{
    try
    {
        // Parse the JSON data
        json formData = json::parse(req.body);

        // Log the received data
        std::ofstream outFile("form_data.txt", std::ios::app);
        outFile << "Name: " << formData["name"] << "\n";
        outFile << "Age: " << formData["age"] << "\n";
        outFile << "Gender: " << formData["gender"] << "\n";
        outFile << "Weight: " << formData["weight"] << "\n";
        outFile << "Height: " << formData["height"] << "\n";
        outFile << "Activity Level: " << formData["activityLevel"] << "\n";
        outFile << "Health Conditions: " << formData["healthConditions"] << "\n";
        outFile << "Dietary Preferences: " << formData["dietaryPreferences"] << "\n";
        outFile << "--------------------------\n";
        outFile.close();

        // Generate a diet plan
        std::vector<std::string> dietPlan = generateDietPlan();

        // Display candidate information and diet plan
        std::cout << "User Name: " << formData["name"] << std::endl;
        std::cout << "Generated Diet Plan:" << std::endl;
        for (const auto &item : dietPlan)
        {
            std::cout << item << std::endl;
        }

        // Save the diet plan to a log file
        outFile.open("diet_plan.txt", std::ios::app);
        outFile << "Diet Plan for " << formData["name"] << ":\n";
        for (const auto &item : dietPlan)
        {
            outFile << item << "\n";
        }
        outFile << "--------------------------\n";
        outFile.close();

        // Send the diet plan back to the client as a JSON response
        json response;
        response["dietPlan"] = dietPlan;
        res.set_content(response.dump(), "application/json");
    }
    catch (const std::exception &e)
    {
        res.status = 500;
        res.set_content("Error processing request", "text/plain");
        std::cerr << "Error: " << e.what() << std::endl;
    }

    // Add CORS headers to the response
    addCORSHeaders(res);
}

void handleOptions(const Request &req, Response &res)
{
    // Handle CORS preflight requests
    addCORSHeaders(res);
    res.set_content("", "text/plain");
}

int main()
{
    srand(static_cast<unsigned>(time(0))); // Seed for random number generation

    Server svr;

    svr.Post("/save-data", saveData);

    // Handle CORS preflight requests
    svr.Options("/save-data", handleOptions);

    std::cout << "Server started at http://localhost:8080" << std::endl;
    svr.listen("0.0.0.0", 8080); // Listen on all interfaces on port 8080

    return 0;
}
