import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaUser, FaUtensils, FaPrint, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { getRecipeById, getRelatedRecipes } from '../data/recipeService';
import RecipeCard from '../components/recipes/RecipeCard';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [servings, setServings] = useState(4);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    const recipeData = getRecipeById(id);
    setRecipe(recipeData);
    
    if (recipeData) {
      const related = getRelatedRecipes(recipeData.id, recipeData.cuisine, 4);
      setRelatedRecipes(related);
      
      // Check if recipe is in favorites (localStorage)
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorite(favorites.includes(recipeData.id));
      
      // Set default servings
      setServings(recipeData.servings);
    }
    
    setLoading(false);
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(favId => favId !== recipe.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(recipe.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setFavorite(!favorite);
  };

  const handlePrint = () => {
    window.print();
  };

  const adjustServings = (newServings) => {
    setServings(newServings);
  };

  // Calculate adjusted ingredient quantities
  const getAdjustedQuantity = (quantity) => {
    if (!quantity.match(/^\d+(\.\d+)?/)) return quantity;
    
    const originalServings = recipe.servings;
    const numericPart = quantity.match(/^\d+(\.\d+)?/)[0];
    const textPart = quantity.replace(numericPart, '').trim();
    
    const adjustedValue = (parseFloat(numericPart) / originalServings) * servings;
    const roundedValue = Math.round(adjustedValue * 100) / 100;
    
    return `${roundedValue}${textPart ? ' ' + textPart : ''}`;
  };

  if (loading || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to={`/cuisine/${recipe.cuisine.toLowerCase()}`} className="text-gray-500 hover:text-primary-600 capitalize">
                {recipe.cuisine}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-primary-600 font-medium truncate">
              {recipe.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Recipe Header */}
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <Link 
                  to={`/cuisine/${recipe.cuisine.toLowerCase()}`}
                  className="absolute top-4 left-4 flex items-center justify-center bg-white bg-opacity-90 rounded-full w-10 h-10 text-primary-600 hover:bg-primary-50 transition-colors duration-300"
                  aria-label="Back to cuisine page"
                >
                  <FaArrowLeft />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-2">
                    {recipe.name}
                  </h1>
                  <div className="flex flex-wrap items-center text-white space-x-4">
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {recipe.prepTime} mins
                    </span>
                    <span className="flex items-center">
                      <FaUser className="mr-1" /> {servings} servings
                    </span>
                    <span className="flex items-center">
                      <FaUtensils className="mr-1" /> {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Recipe Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center mb-6 print:hidden"
                >
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleFavorite}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${favorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-700'} hover:bg-opacity-80 transition-colors duration-300`}
                      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorite ? <FaHeart /> : <FaRegHeart />}
                      <span>{favorite ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300"
                      aria-label="Print recipe"
                    >
                      <FaPrint />
                      <span>Print</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">Adjust servings:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => adjustServings(Math.max(1, servings - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        aria-label="Decrease servings"
                      >
                        -
                      </button>
                      <span className="font-medium">{servings}</span>
                      <button
                        onClick={() => adjustServings(servings + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        aria-label="Increase servings"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-gray-700 leading-relaxed">
                    {recipe.description}
                  </p>
                </motion.div>

                {/* Ingredients */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-serif font-medium mb-4">Ingredients</h2>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => {
                        const [quantity, ...rest] = ingredient.split(' ');
                        const adjustedQuantity = getAdjustedQuantity(quantity);
                        const restOfIngredient = rest.join(' ');
                        
                        return (
                          <li key={index} className="flex space-x-3">
                            <span className="text-primary-600 font-medium">•</span>
                            <span>
                              <span className="font-medium">{adjustedQuantity}</span> {restOfIngredient}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>

                {/* Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-serif font-medium mb-4">Instructions</h2>
                  <ol className="space-y-6">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 flex items-center justify-center bg-primary-500 text-white w-8 h-8 rounded-full mr-4 font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="print:hidden">
            {/* Related Recipes */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-serif font-medium mb-4">Related Recipes</h3>
              <div className="space-y-4">
                {relatedRecipes.map(relatedRecipe => (
                  <Link
                    key={relatedRecipe.id}
                    to={`/recipe/${relatedRecipe.id}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
                  >
                    <img
                      src={relatedRecipe.image}
                      alt={relatedRecipe.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{relatedRecipe.name}</h4>
                      <p className="text-sm text-gray-500">{relatedRecipe.prepTime} mins • {relatedRecipe.difficulty}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Recipe Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-serif font-medium mb-4">Recipe Info</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Cuisine:</span>
                  <span className="font-medium capitalize">{recipe.cuisine}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Preparation Time:</span>
                  <span className="font-medium">{recipe.prepTime} minutes</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cooking Time:</span>
                  <span className="font-medium">{recipe.cookTime} minutes</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Total Time:</span>
                  <span className="font-medium">{recipe.prepTime + recipe.cookTime} minutes</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium">{recipe.difficulty}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Servings:</span>
                  <span className="font-medium">{recipe.servings}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;