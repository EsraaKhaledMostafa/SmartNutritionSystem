#include "httplib.h"
#include <nlohmann/json.hpp>
#include <fstream>
#include <iostream>

using json = nlohmann::json;
using namespace httplib;

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

        // Log the data into a text file
        std::ofstream outFile("form_data.txt", std::ios::app);
        if (outFile.is_open())
        {
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

            res.set_content("Data received and logged successfully!", "text/plain");
        }
        else
        {
            res.status = 500;
            res.set_content("Failed to open the log file", "text/plain");
        }
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
    Server svr;

    svr.Post("/save-data", saveData);

    // Handle CORS preflight requests
    svr.Options("/save-data", handleOptions);

    std::cout << "Server started at http://localhost:8080" << std::endl;
    svr.listen("0.0.0.0", 8080); // Listen on all interfaces on port 8080

    return 0;
}
