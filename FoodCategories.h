#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>

class FoodItem
{
public:
    std::string name;
    int calories;

    FoodItem(const std::string &name, int calories) : name(name), calories(calories) {}
};

class Carbs
{
public:
    std::vector<FoodItem> items;

    Carbs()
    {
        items.push_back(FoodItem("Bread", 80));
        items.push_back(FoodItem("Rice", 130));
        items.push_back(FoodItem("Pasta", 120));
    }

    FoodItem getRandomItem()
    {
        return items[rand() % items.size()];
    }
};

class Protein
{
public:
    std::vector<FoodItem> items;

    Protein()
    {
        items.push_back(FoodItem("Chicken", 165));
        items.push_back(FoodItem("Beef", 250));
        items.push_back(FoodItem("Eggs", 70));
    }

    FoodItem getRandomItem()
    {
        return items[rand() % items.size()];
    }
};

class Sweets
{
public:
    std::vector<FoodItem> items;

    Sweets()
    {
        items.push_back(FoodItem("Chocolate", 200));
        items.push_back(FoodItem("Ice Cream", 180));
        items.push_back(FoodItem("Cake", 250));
    }

    FoodItem getRandomItem()
    {
        return items[rand() % items.size()];
    }
};

class Veggies
{
public:
    std::vector<FoodItem> items;

    Veggies()
    {
        items.push_back(FoodItem("Carrot", 25));
        items.push_back(FoodItem("Broccoli", 30));
        items.push_back(FoodItem("Spinach", 23));
    }

    FoodItem getRandomItem()
    {
        return items[rand() % items.size()];
    }
};
