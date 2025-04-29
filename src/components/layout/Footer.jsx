import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold">
                Cook<span className="text-accent-400">Book</span>
              </span>
            </Link>
            <p className="text-gray-300">
              Your personal library of world-famous cuisine recipes. Bring the flavors of the world to your kitchen.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FaFacebookF />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FaTwitter />
              </a> */}
              <a href="https://www.instagram.com/cookbook166/" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FaInstagram />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <FaPinterestP />
              </a> */}
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="text-xl font-medium mb-4">Cuisines</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cuisine/indian" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Indian Cuisine
                </Link>
              </li>
              <li>
                <Link to="/cuisine/chinese" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Chinese Cuisine
                </Link>
              </li>
              <li>
                <Link to="/cuisine/french" className="text-gray-300 hover:text-white transition-colors duration-300">
                  French Cuisine
                </Link>
              </li>
              <li>
                <Link to="/cuisine/american" className="text-gray-300 hover:text-white transition-colors duration-300">
                  American Cuisine
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div> */}

          {/* Newsletter
          <div>
            <h3 className="text-xl font-medium mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get the latest recipes and cooking tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>
            © 2025 Cook Book — Your Personal Library. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center">
            Made with <FaHeart className="mx-1 text-red-500" /> for food lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;