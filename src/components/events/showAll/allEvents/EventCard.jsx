import React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock } from "lucide-react"

const EventCard = ({ event, cardSize }) => {
  const { id, title, image, date, time, location, description, isVideo } = event

  // Truncate description based on card size
  const truncatedDescription =
    cardSize === "compact"
      ? description.length > 60
        ? `${description.substring(0, 60)}...`
        : description
      : description.length > 100
      ? `${description.substring(0, 100)}...`
      : description

  // Adjust card height based on size
  const imageHeight = cardSize === "compact" ? "h-36" : "h-48"
  const titleSize = cardSize === "compact" ? "text-lg" : "text-xl"
  const padding = cardSize === "compact" ? "p-3" : "p-4"

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      <div className={`relative overflow-hidden ${imageHeight}`}>
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              poster={image}
            >
              <source
                src={image}
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-16 border-l-blue-600 ml-1"></div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>

      <div className={`${padding} flex flex-col flex-grow`}>
        <h3 className={`${titleSize} font-bold italic text-gray-900 mb-2`}>
          {title}
        </h3>

        <div className="flex items-center mb-2 text-gray-600">
          <Calendar
            size={16}
            className="mr-2 text-blue-600"
          />
          <span>{date}</span>
        </div>

        <div className="flex items-center mb-2 text-gray-600">
          <Clock
            size={16}
            className="mr-2 text-blue-600"
          />
          <span>{time}</span>
        </div>

        <div className="flex items-center mb-3 text-gray-600">
          <MapPin
            size={16}
            className="mr-2 text-blue-600"
          />
          <span>{location}</span>
        </div>

        <p className="text-gray-700 mb-4 flex-grow">{truncatedDescription}</p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
          }}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 mt-auto"
          onClick={() => (window.location.href = `/event/${id}`)}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default EventCard
