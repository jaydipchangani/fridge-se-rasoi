"use client";
import { getRecipesFromGemini } from '@/lib/geminiApi';
import { useState } from 'react';

export default function MainArea() {
    const [input, setInput] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); //

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const addIngredients = () => {
        if (!input.trim()) return;

        const newIngredients = input
            .split(',')
            .map(ing => ing.trim())
            .filter(ing => ing && !ingredients.includes(ing));

        setIngredients(prev => [...prev, ...newIngredients]);
        setInput('');
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredients(prev => prev.filter(ing => ing !== ingredientToRemove));
    };

    const fetchRecipes = async () => {
        if (ingredients.length === 0) return;

        setLoading(true);
        setError('');
        setRecipes([]);

        try {
            const geminiResponse = await getRecipesFromGemini(ingredients);
            setRecipes(geminiResponse);
        } catch (err) {
            setError(err.message || 'Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
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

            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4" onClick={() => { fetchRecipes() }}>
                Find Recipes
            </button>

            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Recipe Results:</h3>

                {error && <p className="text-red-500">{error}</p>}
                {loading && <p>Loading recipes...</p>}

                {!loading && recipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recipes.map((recipeText, index) => {
                            const titleMatch = recipeText.match(/Recipe Name:\s*(.*)/i);
                            const ingredientsMatch = recipeText.match(/Ingredients needed:\s*([\s\S]*?)Step-by-step instructions:/i);
                            const stepsMatch = recipeText.match(/Step-by-step instructions:\s*([\s\S]*?)Cooking time:/i);
                            const timeMatch = recipeText.match(/Cooking time:\s*(.*)/i);
                            const servingMatch = recipeText.match(/Serving size:\s*(.*)/i);

                            return (
                                <div
                                    key={index}
                                    className="bg-white border rounded-lg p-4 shadow text-left space-y-2"
                                >
                                    <h4 className="text-lg font-bold text-blue-600">Recipe {index + 1}</h4>

                                    {titleMatch && (
                                        <h5 className="text-md font-semibold text-gray-800">
                                            {titleMatch[1]}
                                        </h5>
                                    )}

                                    {ingredientsMatch && (
                                        <div>
                                            <h6 className="font-medium text-gray-700">Ingredients:</h6>
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {ingredientsMatch[1]
                                                    .split('\n')
                                                    .map((line, i) => line.trim())
                                                    .filter(Boolean)
                                                    .map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    )}

                                    {stepsMatch && (
                                        <div>
                                            <h6 className="font-medium text-gray-700">Instructions:</h6>
                                            <ol className="list-decimal list-inside text-sm text-gray-600">
                                                {stepsMatch[1]
                                                    .split(/\d+\.\s+/)
                                                    .filter(Boolean)
                                                    .map((step, i) => <li key={i}>{step.trim()}</li>)}
                                            </ol>
                                        </div>
                                    )}

                                    {timeMatch && (
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Cooking Time:</span> {timeMatch[1]}
                                        </p>
                                    )}

                                    {servingMatch && (
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Serving Size:</span> {servingMatch[1]}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}





                {!loading && !recipes.length && !error && (
                    <p>No recipes found. Please enter ingredients to see results.</p>
                )}
            </section>
        </main>
    );
}
