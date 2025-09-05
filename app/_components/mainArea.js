"use client";

import { useState } from 'react';

export default function MainArea() {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addIngredients = () => {
    if (!input.trim()) return;

    const newIngredients = input
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing && !ingredients.includes(ing)); // remove empty & duplicates

    setIngredients(prev => [...prev, ...newIngredients]);
    setInput('');
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(prev => prev.filter(ing => ing !== ingredientToRemove));
  };

  return (
    <main className="p-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Fridge Se Rasoi!</h2>
      <p className="mb-4">Discover delicious recipes based on the ingredients you have at home.</p>

      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={input}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <button
          onClick={addIngredients}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add Ingredients
        </button>
      </div>

      {ingredients.length > 0 && (
        <>
          <p className="font-medium mb-2">Added Ingredients:</p>
          <div className="flex flex-wrap justify-center mb-4">
            {ingredients.map((ing, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-200 text-gray-800 px-3 py-1 m-1 rounded-full text-sm"
              >
                {ing}
                <button
                  onClick={() => removeIngredient(ing)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  title="Remove"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </>
      )}

      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
        Find Recipes
      </button>

      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Recipe Results:</h3>
        <p>No recipes found. Please enter ingredients to see results.</p>
      </section>
    </main>
  );
}
