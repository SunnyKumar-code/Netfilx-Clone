import React, { useState, useEffect } from 'react'
import { IoIosArrowDropdown, IoIosSearch, IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_END_POINT, OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';
import { toast } from 'react-hot-toast';

const Header = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change header background
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

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_END_POINT}/logout`, {}, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Logged out successfully');
        dispatch(clearUser());
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Logout failed');

      // Even if the API call fails, clear the user from Redux
      dispatch(clearUser());
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || showSearch || mobileMenuOpen ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'
        }`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo and Navigation */}
        <div className="flex items-center">
          <Link to="/browse" className="mr-4">
            <img
              className='w-20 sm:w-28'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
            />
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex ml-8 text-white">
              <Link to="/browse" className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === '/browse' ? 'font-bold' : ''}`}>Home</Link>
              <Link to="/tv-shows" className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === '/tv-shows' ? 'font-bold' : ''}`}>TV Shows</Link>
              <Link to="/movies" className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === '/movies' ? 'font-bold' : ''}`}>Movies</Link>
              <Link to="/new-and-popular" className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === '/new-and-popular' ? 'font-bold' : ''}`}>New & Popular</Link>
              <Link to="/my-list" className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === '/my-list' ? 'font-bold' : ''}`}>My List</Link>
            </nav>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white mr-4"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <IoMdClose size={24} /> : <RiMenu3Line size={24} />}
        </button>

        {/* User Controls */}
        {user && (
          <div className='flex items-center text-white'>
            {/* Search Bar */}
            <div className="relative mr-4">
              {showSearch && (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 bg-black bg-opacity-90 border border-gray-700 rounded-md flex overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, people, genres"
                    className="bg-transparent text-white px-4 py-2 outline-none w-48 sm:w-64"
                    autoFocus
                  />
                  <button type="submit" className="px-3 text-white hover:text-red-600 transition-colors">
                    <IoIosSearch size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="px-3 text-white hover:text-red-600 transition-colors"
                  >
                    <IoMdClose size={22} />
                  </button>
                </form>
              )}
              {!showSearch && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="hover:text-red-600 transition-colors"
                  aria-label="Search"
                >
                  <IoIosSearch size={24} />
                </button>
              )}
            </div>

            {/* User Profile */}
            <div className="hidden sm:flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-2">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.fullname}</span>
          
              </div>

              <button
                onClick={handleLogout}
                className='bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm font-medium'
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && user && (
        <div className="md:hidden bg-black text-white py-4 px-6 border-t border-gray-800">
          <nav className="flex flex-col space-y-4 mb-6">
            <Link to="/browse" className={`hover:text-red-600 transition-colors ${location.pathname === '/browse' ? 'text-red-600 font-bold' : ''}`}>Home</Link>
            <Link to="/tv-shows" className={`hover:text-red-600 transition-colors ${location.pathname === '/tv-shows' ? 'text-red-600 font-bold' : ''}`}>TV Shows</Link>
            <Link to="/movies" className={`hover:text-red-600 transition-colors ${location.pathname === '/movies' ? 'text-red-600 font-bold' : ''}`}>Movies</Link>
            <Link to="/new-and-popular" className={`hover:text-red-600 transition-colors ${location.pathname === '/new-and-popular' ? 'text-red-600 font-bold' : ''}`}>New & Popular</Link>
            <Link to="/my-list" className={`hover:text-red-600 transition-colors ${location.pathname === '/my-list' ? 'text-red-600 font-bold' : ''}`}>My List</Link>
          </nav>

          <div className="flex items-center justify-between border-t border-gray-800 pt-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-2">
                {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm font-medium">{user.fullname}</span>
            </div>

            <button
              onClick={handleLogout}
              className='bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm font-medium'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

