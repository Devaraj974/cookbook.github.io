import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaUtensils } from 'react-icons/fa';

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <motion.div 
        className="recipe-card h-full flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-card-img"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-primary-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {recipe.cuisine}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-serif font-medium text-gray-800 mb-2 line-clamp-2">{recipe.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{recipe.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <FaClock className="mr-1" /> {recipe.prepTime} mins
            </span>
            <span className="flex items-center">
              <FaUtensils className="mr-1" /> {recipe.difficulty}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default RecipeCard;