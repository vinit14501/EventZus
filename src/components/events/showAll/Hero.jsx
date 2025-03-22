import React, { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, Search } from "lucide-react"

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
      </motion.div>

      {/* Glassmorphism container */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        style={{ opacity }}
      >
        <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-16 backdrop-blur-lg bg-white/20 rounded-lg shadow-2xl border border-white/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Explore Events
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Find upcoming and past events happening near you.
            </p>

            {/* Search Form */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
              </div>
              <div className="relative flex-1 md:flex-none md:w-40">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md appearance-none">
                  <option value="">Any date</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
              <div className="relative flex-1 md:flex-none md:w-40">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md appearance-none">
                  <option value="">Location</option>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                </select>
              </div>
              <button className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Find Events
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 54C1248 48 1344 48 1392 48L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}
