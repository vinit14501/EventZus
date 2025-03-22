import React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react"

const EventHeader = ({ event }) => {
  const {
    title,
    image,
    date,
    time,
    locationType,
    venue,
    city,
    onlineLink,
    isVideo,
  } = event

  const locationText =
    locationType === "physical"
      ? `${venue}, ${city}`
      : locationType === "online"
      ? "Online Event"
      : `${venue}, ${city} & Online`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-64 md:h-96 w-full">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              poster={image}
              controls
            >
              <source
                src={image}
                type="video/mp4"
              />
            </video>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Back button overlay */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300"
        >
          <ArrowLeft
            size={20}
            className="text-gray-800"
          />
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-gray-600">
            <Calendar
              size={20}
              className="mr-2 text-blue-600"
            />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock
              size={20}
              className="mr-2 text-blue-600"
            />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin
              size={20}
              className="mr-2 text-blue-600"
            />
            <span>{locationText}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventHeader
