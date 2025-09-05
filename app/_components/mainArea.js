export default function MainArea() {
  return (
    <main className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Fridge Se Rasoi!</h2>
        <p className="mb-4">Discover delicious recipes based on the ingredients you have at home.</p>
        
        <input type="text" placeholder="Enter ingredients (comma separated)" className="p-2 border border-gray-300 rounded w-full max-w-md mb-4" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Find Recipes</button>
        
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Recipe Results:</h3>
          <p>No recipes found. Please enter ingredients to see results.</p>
        </section>
      </main>
    );
}