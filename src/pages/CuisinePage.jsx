import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import RecipeCard from '../components/recipes/RecipeCard';
import { getRecipesByCuisine } from '../data/recipeService';

function CuisinePage() {
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({
    prepTime: 'all',
    searchTerm: '',
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const cuisineName = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cuisineRecipes = getRecipesByCuisine(name);
    setRecipes(cuisineRecipes);
    setFilteredRecipes(cuisineRecipes);
    setLoading(false);
  }, [name]);

  useEffect(() => {
    let result = [...recipes];
    
    // Filter by search term
    if (filters.searchTerm) {
      result = result.filter(recipe => 
        recipe.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      );
    }
    
    // Filter by prep time
    if (filters.prepTime !== 'all') {
      switch (filters.prepTime) {
        case 'quick':
          result = result.filter(recipe => recipe.prepTime <= 30);
          break;
        case 'medium':
          result = result.filter(recipe => recipe.prepTime > 30 && recipe.prepTime <= 60);
          break;
        case 'long':
          result = result.filter(recipe => recipe.prepTime > 60);
          break;
        default:
          break;
      }
    }
    
    setFilteredRecipes(result);
  }, [filters, recipes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      prepTime: 'all',
      searchTerm: '',
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cuisineImages = {
    'indian': 'https://sukhis.com/app/uploads/2022/12/image5-2-1024x849.jpg',
    'chinese': 'https://kohinoor-joy.com/wp-content/uploads/2020/01/indo-chinese-food.jpg',
    'french': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/36/5a/fd/entrepotes.jpg?w=600&h=-1&s=1',
    'american': 'https://images.squarespace-cdn.com/content/v1/55adab46e4b0d3eba6318941/1625935466674-8ZQ4SI68CCLSZNCVDJIT/Food-platter-e1604016303456.jpg?format=1500w',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${cuisineImages[name.toLowerCase()]}')`
          }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {cuisineName} Cuisine
            </h1>
            <p className="text-xl text-gray-200">
              Discover authentic {cuisineName} recipes with our easy-to-follow instructions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-2xl font-serif font-medium mb-4 md:mb-0">
                {cuisineName} Recipes
              </h2>
              <button
                onClick={toggleFilters}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 md:hidden"
              >
                <FaFilter />
                <span>Filter Recipes</span>
              </button>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-sm ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Recipes
                  </label>
                  <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search by name or ingredient..."
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preparation Time
                  </label>
                  <select
                    name="prepTime"
                    value={filters.prepTime}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All</option>
                    <option value="quick">Quick (≤ 30 mins)</option>
                    <option value="medium">Medium (31-60 mins)</option>
                    <option value="long">Long ( 60 mins)</option>
                  </select>
                </div>
                
                <button
                  onClick={resetFilters}
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Recipe Cards */}
          {filteredRecipes.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredRecipes.map((recipe) => (
                <motion.div key={recipe.id} variants={itemVariants}>
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to find more recipes
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CuisinePage;