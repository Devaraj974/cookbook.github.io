import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
  {/* Logo */}
  <img 
    src="https://media.istockphoto.com/id/1687829806/vector/open-book-with-chef-hat-above.jpg?s=612x612&w=0&k=20&c=8MHkogOT9EXeKoaTYap_WFrBtUmcKgstkBOv07GOh18=" 
    alt="Cook Book Logo" 
    className="w-16 h-16 object-cover" 
  />
</div>

          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary-800">
              Cook<span className="text-accent-500">Book</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/cuisine/indian" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Indian
            </NavLink>
            <NavLink 
              to="/cuisine/chinese" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Chinese
            </NavLink>
            <NavLink 
              to="/cuisine/french" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              French
            </NavLink>
            <NavLink 
              to="/cuisine/american" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              American
            </NavLink>
          </div>

          {/* Search & Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            {/* <button 
              onClick={toggleSearch}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              aria-label="Search recipes"
            >
              <FaSearch className="w-5 h-5" />
            </button> */}
            
            {user ? (
              <div className="relative">
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              >
                <FaUser className="w-5 h-5" />
                <span className="hidden md:inline">Sign In</span>
              </Link>
            )}
            
            {/* <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button> */}
          </div>
        </div>

        {/* Search Bar */}
        {/* {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 relative"
          >
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>
        )} */}

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col py-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-4 py-3 text-lg font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/cuisine/indian" 
                className={({ isActive }) => 
                  `px-4 py-3 text-lg font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`
                }
              >
                Indian
              </NavLink>
              <NavLink 
                to="/cuisine/chinese" 
                className={({ isActive }) => 
                  `px-4 py-3 text-lg font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`
                }
              >
                Chinese
              </NavLink>
              <NavLink 
                to="/cuisine/french" 
                className={({ isActive }) => 
                  `px-4 py-3 text-lg font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`
                }
              >
                French
              </NavLink>
              <NavLink 
                to="/cuisine/american" 
                className={({ isActive }) => 
                  `px-4 py-3 text-lg font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`
                }
              >
                American
              </NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;