import { useState } from "react";
import axios from "axios";

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

  return (
    <div className="App">
      <h1>Random Food Recipe Generator</h1>
      <button onClick={getRandomRecipe}>Get Random Recipe</button>
      {recipe && (
        <div>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
