import React, { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Users, MapPin, Clock } from "lucide-react"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax effect values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>

        {/* Abstract shapes for background interest */}
        <div className="absolute top-[20%] left-[15%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-blue-400 opacity-20 blur-xl"></div>
        <div className="absolute bottom-[30%] right-[10%] w-32 h-32 md:w-56 md:h-56 rounded-full bg-purple-400 opacity-20 blur-xl"></div>
        <div className="absolute top-[60%] left-[20%] w-36 h-36 md:w-48 md:h-48 rounded-full bg-pink-400 opacity-20 blur-xl"></div>
      </motion.div>

      {/* Glassmorphic container */}
      <div className="relative flex items-center justify-center w-full h-full px-4">
        <motion.div
          style={{ y: textY }}
          className="w-full max-w-3xl p-8 md:p-12 rounded-xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 shadow-xl"
        >
          <div className="text-center">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-balck">
              Create Your Event
            </h1>
            <p className="mb-8 text-lg md:text-xl font-light text-balck">
              Fill in the details below to publish your event.
            </p>

            {/* Feature icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                <Calendar className="w-8 h-8 mb-2 text-balck" />
                <span className="text-balck text-sm">Plan Date</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                <MapPin className="w-8 h-8 mb-2 text-balck" />
                <span className="text-balck text-sm">Choose Location</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                <Users className="w-8 h-8 mb-2 text-balck" />
                <span className="text-balck text-sm">Invite Guests</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                <Clock className="w-8 h-8 mb-2 text-balck" />
                <span className="text-balck text-sm">Set Schedule</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              className="px-8 py-3 text-lg font-medium text-balck bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
