import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [recipe, setRecipe] = useState(null);

  const getRandomRecipe = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const renderInstructions = (instructions) => {
    // Split instructions based on the period (.)
    const instructionLines = instructions.split(".");

    // Filter out empty strings
    const filteredLines = instructionLines.filter((line) => line.trim() !== "");

    // Map each line to a new paragraph
    return filteredLines.map((line, index) => (
      <p key={index}>{line.trim()}.</p>
    ));
  };

  return (
    <div className="App m-6">
      <h1 className="text-amber-700 text-3xl m-5">
        Random Food Recipe Generator
      </h1>
      <button
        className="border-solid border-2 p-2 rounded-lg m-5"
        onClick={getRandomRecipe}
      >
        Get Random Recipe
      </button>
      {recipe && (
        <div>
          <h2 className="m-5 text-xl">{recipe.strMeal}</h2>
          <div className="flex flex-row space-x-8 m-5">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div>{renderInstructions(recipe.strInstructions)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
