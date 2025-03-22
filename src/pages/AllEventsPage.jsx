import React from "react"
import Hero from "../components/events/showAll/Hero"
import FilterSearch from "../components/events/showAll/filterSearch/FilterSearch"
import AllEvents from "../components/events/showAll/allEvents/AllEvents"

export default function AllEventsPage() {
  return (
    <>
      <Hero />
      <FilterSearch />
      <AllEvents />
    </>
  )
}
