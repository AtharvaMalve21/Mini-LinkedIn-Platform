import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";

const Navbar = () => {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const URI = import.meta.env.VITE_BACKEND_URI;

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(URI + "/api/auth/logout", { withCredentials: true });
      if (data.success) {
        setUser(null);
        setIsLoggedIn(false);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 transition-transform duration-200 hover:scale-105">
            {/* The image and h1 tags are unchanged. Consider using a higher-quality SVG for the logo. */}
            <img src="../../public/linkedin.png" alt="Community Connect Logo" className="w-8 h-8" />
            <h1 className="hidden sm:block text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Community Connect
            </h1>
            <h1 className="sm:hidden text-lg font-bold text-indigo-600">
              CC
            </h1>
          </Link>

          {/* Right User/Menu */}
          <div className="relative flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 sm:space-x-3 border-2 border-indigo-500 px-2 py-1 sm:px-3 sm:py-2 rounded-full hover:shadow-lg hover:border-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-gradient-to-r from-indigo-50 to-purple-50"
                >
                  {/* User Initial */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-md uppercase ring-2 ring-white">
                    {user.name?.charAt(0)}
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-indigo-700 max-w-24 truncate">
                    {user.name}
                  </span>
                  {/* Dropdown Arrow */}
                  <svg className="w-4 h-4 text-indigo-600 transition-transform duration-200"
                    style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <>
                    {/* Backdrop for mobile */}
                    <div
                      className="fixed inset-0 z-10 md:hidden"
                      onClick={() => setIsMenuOpen(false)}
                    ></div>

                    <div className="absolute right-0 mt-3 w-56 sm:w-60 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                        <p className="text-sm font-semibold text-indigo-900 truncate">{user.name}</p>
                        <p className="text-xs text-indigo-600 truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* Profile Link */}
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                          onClick={() => setIsMenuOpen(false)}>
                          <svg className="w-4 h-4 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                        {/* Add Post Link */}
                        <Link
                          to="/create-post"
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                          onClick={() => setIsMenuOpen(false)}>
                          <svg className="w-4 h-4 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Post
                        </Link>
                      </div>

                      <div className="border-t border-gray-100">
                        {/* Logout Button */}
                        <button
                          onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150">
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;