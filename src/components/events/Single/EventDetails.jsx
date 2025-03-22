import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import EventHeader from "./EventHeader"
import EventDescription from "./EventDescription"
import EventInformation from "./EventInformation"
import EventOrganizer from "./EventOrganizer"
import EventSpeakers from "./EventSpeakers"
import EventAgenda from "./EventAgenda"
import EventSponsors from "./EventSponsors"
import EventFAQs from "./EventFAQs"
import EventRegistration from "./EventRegistration"
import EventShare from "./EventShare"
import RelatedEvents from "./RelatedEvents"
import { eventData } from "./eventData" // Import sample data for now

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate fetching data from API
    const fetchEventDetails = async () => {
      try {
        // In a real app, you would fetch from an API using the ID
        // const response = await fetch(`/api/events/${id}`)
        // const data = await response.json()

        // For now, find the event in our sample data
        const foundEvent = eventData.find((event) => event.id === parseInt(id))

        if (!foundEvent) {
          throw new Error("Event not found")
        }

        // Simulate network delay
        setTimeout(() => {
          setEvent(foundEvent)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching event details:", error)
        setError("Unable to load event details. Please try again later.")
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-md">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200 max-w-md">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">
            Event Not Found
          </h2>
          <p className="text-yellow-600">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => (window.location.href = "/events")}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EventHeader event={event} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-8">
              <EventDescription event={event} />
              <EventInformation event={event} />
              {event.speakers && event.speakers.length > 0 && (
                <EventSpeakers speakers={event.speakers} />
              )}
              {event.agenda && event.agenda.length > 0 && (
                <EventAgenda agenda={event.agenda} />
              )}
              {event.sponsors && event.sponsors.length > 0 && (
                <EventSponsors sponsors={event.sponsors} />
              )}
              {event.faqs && event.faqs.length > 0 && (
                <EventFAQs faqs={event.faqs} />
              )}
            </div>

            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-8">
              <EventRegistration event={event} />
              <EventOrganizer
                organizer={{
                  name: event.organiserName,
                  email: event.organiserEmail,
                  phone: event.organiserPhone,
                  website: event.organiserWebsite,
                  socialMedia: event.socialMedia,
                }}
              />
              <EventShare
                eventId={event.id}
                title={event.title}
              />
            </div>
          </div>

          {/* Related Events Section */}
          <RelatedEvents
            category={event.category}
            currentEventId={event.id}
          />
        </motion.div>
      </main>
    </div>
  )
}

export default EventDetails
