const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY; 
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function getRecipesFromGemini(ingredients = []) {
  //console.log(process.env.NEXT_PUBLIC_GEMINI_KEY)
  if (!ingredients.length) return null;

  const prompt = `
You are a helpful cooking assistant.

Based on these ingredients: ${ingredients.join(', ')}, suggest 3 simple Indian recipes.

For each recipe, include:
- Recipe name
- Ingredients needed
- Step-by-step instructions
- Cooking time
- Serving size

Only return text in readable markdown or plain text format.
Please return the recipes in plain text only. Do not use markdown, bold, bullets, or headings.
Give me only the recipes with heading like "Recipe Name:". 
Also make sure that you should not made any assumptions about the ingredients that it is available or not.
`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.text ||
      null;

    if (!text) {
      throw new Error('No recipe found in response.');
    }

    const rawRecipes = text
      .split(/(?=Recipe Name:)/i) 
      .map(r => r.trim())
      .filter(Boolean);

    while (rawRecipes.length < 3) {
      rawRecipes.push('Recipe not available.');
    }

    return rawRecipes.slice(0, 3);

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
