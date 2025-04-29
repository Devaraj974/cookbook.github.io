import { recipes } from './recipes';

/**
 * Get all recipes
 * @returns {Array} All recipes
 */
export const getAllRecipes = () => {
  return recipes;
};

/**
 * Get recipe by ID
 * @param {string} id - Recipe ID
 * @returns {Object} Recipe object
 */
export const getRecipeById = (id) => {
  return recipes.find(recipe => recipe.id === id);
};

/**
 * Get recipes by cuisine
 * @param {string} cuisine - Cuisine name
 * @returns {Array} Filtered recipes
 */
export const getRecipesByCuisine = (cuisine) => {
  return recipes.filter(recipe => 
    recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
  );
};

/**
 * Get popular recipes (random selection)
 * @param {number} limit - Number of recipes to return
 * @returns {Array} Popular recipes
 */
export const getPopularRecipes = (limit = 8) => {
  // In a real app, this would use view counts or ratings
  // For now, just shuffle and return random recipes
  return shuffleArray([...recipes]).slice(0, limit);
};

/**
 * Get related recipes (same cuisine, excluding current recipe)
 * @param {string} currentId - Current recipe ID to exclude
 * @param {string} cuisine - Cuisine to match
 * @param {number} limit - Number of recipes to return
 * @returns {Array} Related recipes
 */
export const getRelatedRecipes = (currentId, cuisine, limit = 4) => {
  const sameCuisine = recipes.filter(recipe => 
    recipe.cuisine === cuisine && recipe.id !== currentId
  );
  
  return shuffleArray(sameCuisine).slice(0, limit);
};

/**
 * Shuffle array elements (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}