import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, Calendar, Users, LogIn } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Enhanced menu items with icons for better visual identity
  const menuItems = [
    {
      id: 1,
      title: "Create Event",
      path: "/events/create",
      icon: (
        <Calendar
          size={18}
          className="hidden sm:block"
        />
      ),
    },
    {
      id: 2,
      title: "All Events",
      path: "/events",
      icon: (
        <Users
          size={18}
          className="hidden sm:block"
        />
      ),
    },
    {
      id: 3,
      title: "Sign In",
      path: "/signin",
      icon: (
        <LogIn
          size={18}
          className="hidden sm:block"
        />
      ),
    },
  ]

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-gradient-to-r from-blue-900/90 to-blue-700/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="EventPro"
                className="h-10 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                  location.pathname === item.path ? "font-bold " : ""
                }${
                  scrolled
                    ? "text-gray-800 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
                onClick={handleLinkClick}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            {/* Phone icon for contact with clickable link */}
            <Link
              to="/contact"
              className={`transition-colors duration-200 p-2 rounded-full ${
                location.pathname === "/contact" ? "bg-blue-700 " : ""
              }${
                scrolled
                  ? "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  : "text-white hover:text-blue-200 hover:bg-blue-800/50"
              }`}
              onClick={handleLinkClick}
              aria-label="Contact"
            >
              <Phone size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className={scrolled ? "text-gray-800" : "text-white"}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-2/3 h-full bg-blue-900 shadow-xl z-50 overflow-y-auto md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col py-4 px-6 space-y-6">
              {menuItems.map((item) => (
                <motion.div key={item.id}>
                  <Link
                    to={item.path}
                    className={`text-white hover:text-blue-200 font-medium text-lg flex items-center gap-3 ${
                      location.pathname === item.path
                        ? "font-bold text-blue-300"
                        : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </motion.div>
              ))}
              {/* Phone icon with proper link for mobile menu */}
              <motion.div>
                <Link
                  to="/contact"
                  className={`flex items-center text-white hover:text-blue-200 p-2 w-fit rounded-full hover:bg-blue-800/50 ${
                    location.pathname === "/contact" ? "bg-blue-700" : ""
                  }`}
                  onClick={handleLinkClick}
                  aria-label="Contact us"
                >
                  <Phone
                    size={24}
                    className="mr-3"
                  />
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black md:hidden"
            onClick={() => setIsOpen(false)}
            style={{ zIndex: 40 }}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
