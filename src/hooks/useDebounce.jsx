import { useState, useEffect } from "react"

/**
 * Custom hook for debouncing a value
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout if the value changes before the delay has elapsed
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
