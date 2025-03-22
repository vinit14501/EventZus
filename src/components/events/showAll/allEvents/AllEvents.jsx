import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import EventCard from "./EventCard"
import ListEventCard from "./ListEventCard"
import FilterBar from "./FilterBar"
import LayoutControls from "./LayoutControls"
import Pagination from "./Pagination"
import { eventData } from "./eventData"

const AllEvents = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  // Layout states
  const [gridLayout, setGridLayout] = useState(3)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"
  const [cardSize, setCardSize] = useState("normal") // "compact" or "normal"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage, setEventsPerPage] = useState(8)

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      try {
        // In a real app, you would fetch from an API here
        setEvents(eventData)
        setFilteredEvents(eventData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (filter === "all") {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter((event) => event.category === filter)
      setFilteredEvents(filtered)
    }
    // Reset to first page when filter changes
    setCurrentPage(1)
  }, [filter, events])

  // Adjust events per page based on view mode and card size
  useEffect(() => {
    if (viewMode === "list") {
      setEventsPerPage(cardSize === "compact" ? 12 : 8)
    } else {
      setEventsPerPage(cardSize === "compact" ? 12 : 8)
    }
    // Reset to first page when layout changes
    setCurrentPage(1)
  }, [viewMode, cardSize])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleLayoutChange = (layout) => {
    setGridLayout(layout)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const handleCardSizeChange = (size) => {
    setCardSize(size)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const endIndex = startIndex + eventsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // Dynamic grid classes based on selected layout
  const getGridClasses = () => {
    switch (gridLayout) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full px-4 md:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-md"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Upcoming <span className="text-blue-600">Events</span>
          </h1>

          <FilterBar
            filter={filter}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600">No events found</h3>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <LayoutControls
                  currentLayout={gridLayout}
                  onLayoutChange={handleLayoutChange}
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                  cardSize={cardSize}
                  onCardSizeChange={handleCardSizeChange}
                />
              </div>

              {viewMode === "grid" ? (
                <div className={`grid ${getGridClasses()} gap-6`}>
                  {currentEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      cardSize={cardSize}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {currentEvents.map((event) => (
                    <ListEventCard
                      key={event.id}
                      event={event}
                      cardSize={cardSize}
                    />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default AllEvents
