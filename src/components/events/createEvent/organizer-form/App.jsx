import React from "react"
import { motion } from "framer-motion"
import EventForm from "./EventForm"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Event Submission
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Fill out the form below to add your event to our platform
          </p>
        </div>

        <EventForm />
      </motion.div>
    </div>
  )
}

export default App
