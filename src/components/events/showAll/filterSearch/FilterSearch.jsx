import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  SortDesc,
} from "lucide-react"
import DateRangePicker from "./DateRangePicker"
import LocationDropdown from "./LocationDropdown"
import CategoryDropdown from "./CategoryDropdown"
import PriceFilter from "./PriceFilter"
import SortByDropdown from "./SortByDropdown"
import { useDebounce } from "../../../../hooks/useDebounce"

const FilterSearch = () => {
  // States for filter values
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState(null)

  // Debounced search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Handle scroll to show/hide sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Toggle filter dropdown visibility
  const toggleFilter = (filterName) => {
    if (activeFilter === filterName) {
      setActiveFilter(null)
      setIsFilterOpen(false)
    } else {
      setActiveFilter(filterName)
      setIsFilterOpen(true)
    }
  }

  // Close all filters
  const closeAllFilters = () => {
    setActiveFilter(null)
    setIsFilterOpen(false)
  }

  // Handle click outside to close filters
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".filter-container") &&
        !e.target.closest(".filter-button")
      ) {
        closeAllFilters()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Apply selected filters
  const applyFilters = (filterData) => {
    console.log("Applying filters:", filterData)
    closeAllFilters()
    // Implementation would depend on your data fetching strategy
  }

  return (
    <motion.div
      className={`w-full bg-white z-50 ${
        isScrolled ? "sticky top-0 shadow-md" : ""
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Mobile Search Bar */}
        <div className="md:hidden mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Desktop Search */}
          <div className="hidden md:block flex-grow mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              className={`filter-button flex items-center px-3 py-2 rounded-lg border ${
                activeFilter === "date"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => toggleFilter("date")}
            >
              <Calendar
                size={18}
                className="mr-1"
              />
              <span className="hidden sm:inline">Date</span>
            </button>

            <button
              className={`filter-button flex items-center px-3 py-2 rounded-lg border ${
                activeFilter === "location"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => toggleFilter("location")}
            >
              <MapPin
                size={18}
                className="mr-1"
              />
              <span className="hidden sm:inline">Location</span>
            </button>

            <button
              className={`filter-button flex items-center px-3 py-2 rounded-lg border ${
                activeFilter === "category"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => toggleFilter("category")}
            >
              <Tag
                size={18}
                className="mr-1"
              />
              <span className="hidden sm:inline">Category</span>
            </button>

            <button
              className={`filter-button flex items-center px-3 py-2 rounded-lg border ${
                activeFilter === "price"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => toggleFilter("price")}
            >
              <DollarSign
                size={18}
                className="mr-1"
              />
              <span className="hidden sm:inline">Price</span>
            </button>

            <button
              className={`filter-button flex items-center px-3 py-2 rounded-lg border ${
                activeFilter === "sort"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => toggleFilter("sort")}
            >
              <SortDesc
                size={18}
                className="mr-1"
              />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              className="filter-container relative mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeFilter === "date" && (
                <DateRangePicker onApply={applyFilters} />
              )}
              {activeFilter === "location" && (
                <LocationDropdown onApply={applyFilters} />
              )}
              {activeFilter === "category" && (
                <CategoryDropdown onApply={applyFilters} />
              )}
              {activeFilter === "price" && (
                <PriceFilter onApply={applyFilters} />
              )}
              {activeFilter === "sort" && (
                <SortByDropdown onApply={applyFilters} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display */}
        <div className="mt-3 flex flex-wrap gap-2">
          {/* You can add pills here to show active filters */}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterSearch
