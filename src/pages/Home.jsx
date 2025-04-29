import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaClock, FaChartPie, FaSearch } from 'react-icons/fa';
import RecipeCard from '../components/recipes/RecipeCard';
import { getAllRecipes, getPopularRecipes } from '../data/recipeService';

function Home() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [cuisineRecipes, setCuisineRecipes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Get popular recipes
    const popular = getPopularRecipes(16);
    setPopularRecipes(popular);

    // Get recipes grouped by cuisine
    const allRecipes = getAllRecipes();
    const cuisines = {};
    
    // Group recipes by cuisine
    allRecipes.forEach(recipe => {
      if (!cuisines[recipe.cuisine]) {
        cuisines[recipe.cuisine] = [];
      }
      
      // Only take 5 recipes per cuisine for homepage
      if (cuisines[recipe.cuisine].length < 6) {
        cuisines[recipe.cuisine].push(recipe);
      }
    });
    
    setCuisineRecipes(cuisines);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    const allRecipes = getAllRecipes();
    const results = allRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://img.freepik.com/free-photo/woman-cooking-kitchen_1303-12914.jpg?semt=ais_hybrid&w=740')"
          }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cook Book — Your Personal Library
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover recipes from world-famous cuisines. Bring global flavors to your kitchen with our easy-to-follow recipes.
            </p>
            
            <form onSubmit={handleSearch} className="flex w-full max-w-lg">
              <input
                type="text"
                placeholder="Search for recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-3 px-4 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-r-lg transition-colors duration-300"
              >
                <FaSearch />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {isSearching && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-medium">
                Search Results for "{searchTerm}"
              </h2>
              <button
                onClick={clearSearch}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Search
              </button>
            </div>
            
            {searchResults.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {searchResults.map((recipe) => (
                  <motion.div key={recipe.id} variants={itemVariants}>
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any recipes matching "{searchTerm}"
                </p>
                <button
                  onClick={clearSearch}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!isSearching && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-medium mb-4">
                Why Cook with Our Recipes?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our collection features carefully curated recipes from around the world, bringing authentic flavors to your kitchen.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-primary-50 p-6 rounded-lg text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUtensils className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">Easy to Follow</h3>
                <p className="text-gray-600">
                  Step-by-step instructions make cooking simple, even for beginners.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-primary-50 p-6 rounded-lg text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">Time-Saving</h3>
                <p className="text-gray-600">
                  Perfectly timed recipes help you plan and prepare meals efficiently.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-primary-50 p-6 rounded-lg text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartPie className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">Diverse Cuisines</h3>
                <p className="text-gray-600">
                  Explore authentic recipes from Indian, Chinese, French, and American traditions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Recipes */}
      {!isSearching && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
            >
              <h2 className="text-3xl font-serif font-medium mb-4 md:mb-0">
                Popular Recipes
              </h2>
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
              
              </Link>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {popularRecipes.map((recipe) => (
                <motion.div key={recipe.id} variants={itemVariants}>
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Cuisines Section */}
      {!isSearching && Object.keys(cuisineRecipes).length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-medium mb-12 text-center"
            >
              Explore World Cuisines
            </motion.h2>
            
            <div className="space-y-16">
              {Object.entries(cuisineRecipes).map(([cuisine, recipes]) => (
                <div key={cuisine} className="mb-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h3 className="text-2xl font-serif font-medium capitalize mb-4 md:mb-0">
                      {cuisine} Cuisine
                    </h3>
                    <Link 
                      to={`/cuisine/${cuisine.toLowerCase()}`} 
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All {cuisine} Recipes
                    </Link>
                  </div>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {recipes.map((recipe) => (
                      <motion.div key={recipe.id} variants={itemVariants}>
                        <RecipeCard recipe={recipe} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!isSearching && (
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-serif font-medium mb-4"
              >
              "Discover flavors from around the world — one recipe at a time!"
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-100 mb-8"
              >
                
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* <Link
                  to="/"
                  className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Explore All Recipes
                </Link> */}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;