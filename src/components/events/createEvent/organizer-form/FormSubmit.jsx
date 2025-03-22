import React, { useState } from "react"
import { motion } from "framer-motion"
import { Check, AlertCircle, RefreshCw, Send } from "lucide-react"

const FormSubmit = ({ formData }) => {
  const [submissionState, setSubmissionState] = useState("initial") // initial, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const validateForm = () => {
    // Required fields check
    const requiredFields = [
      { name: "title", label: "Event Title" },
      { name: "category", label: "Event Category" },
      { name: "description", label: "Event Description" },
      { name: "startDate", label: "Start Date" },
      { name: "startTime", label: "Start Time" },
      { name: "organiserName", label: "Organizer Name" },
      { name: "organiserEmail", label: "Organizer Email" },
      { name: "organiserPhone", label: "Organizer Phone" },
    ]

    const locationFields =
      formData.locationType === "physical"
        ? [
            { name: "venue", label: "Venue" },
            { name: "address", label: "Address" },
            { name: "city", label: "City" },
            { name: "country", label: "Country" },
          ]
        : [{ name: "onlineLink", label: "Online Link" }]

    const missingFields = [...requiredFields, ...locationFields].filter(
      (field) => !formData[field.name]
    )

    if (missingFields.length > 0) {
      return {
        valid: false,
        message: `Please fill in the following required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`,
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.organiserEmail)) {
      return {
        valid: false,
        message: "Please enter a valid email address for the organizer",
      }
    }

    // Date validation
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (startDate < today) {
      return {
        valid: false,
        message: "Start date cannot be in the past",
      }
    }

    if (
      formData.registrationDeadline &&
      new Date(formData.registrationDeadline) >= startDate
    ) {
      return {
        valid: false,
        message: "Registration deadline must be before the event start date",
      }
    }

    if (formData.endDate && endDate < startDate) {
      return {
        valid: false,
        message: "End date cannot be before start date",
      }
    }

    if (
      formData.startDate === formData.endDate &&
      formData.endTime <= formData.startTime
    ) {
      return {
        valid: false,
        message: "End time must be after start time on the same date",
      }
    }

    const socialMediaFields = Object.entries(formData.socialMedia)
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/

    for (const [platform, url] of socialMediaFields) {
      if (url && !urlRegex.test(url)) {
        return {
          valid: false,
          message: `Please enter a valid URL for ${
            platform.charAt(0).toUpperCase() + platform.slice(1)
          }`,
        }
      }
    }

    return { valid: true }
  }

  const handleSubmit = async () => {
    const validation = validateForm()

    if (!validation.valid) {
      setSubmissionState("error")
      setErrorMessage(validation.message)
      return
    }

    setSubmissionState("submitting")

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Successful submission
      setSubmissionState("success")
      setSuccessMessage(
        "Event submitted successfully! You will be redirected to the event dashboard."
      )

      // Redirect after success (simulated)
      // setTimeout(() => {
      //   window.location.href = "/events/dashboard";
      // }, 3000);
    } catch (error) {
      setSubmissionState("error")
      setErrorMessage(
        "There was an error submitting your event. Please try again."
      )
    }
  }

  const resetSubmission = () => {
    setSubmissionState("initial")
    setErrorMessage("")
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ready to Submit Your Event?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Review all the details in the preview above before submitting. Once
          submitted, you can make changes from your event dashboard.
        </p>

        {/* Terms and Conditions Checkbox */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-medium text-gray-700"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-gray-500">
                By creating this event, you agree to our Terms of Service and
                Privacy Policy. You confirm that the information provided is
                accurate and that you have the right to publish this event.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Status */}
        {submissionState === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 p-4 rounded-md border border-green-200 mb-6"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <Check
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Submission successful
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>{successMessage}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {submissionState === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 p-4 rounded-md border border-red-200 mb-6"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There was an error with your submission
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={resetSubmission}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              submissionState === "submitting" || submissionState === "success"
            }
            className={`flex-1 flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
              ${
                submissionState === "submitting" ||
                submissionState === "success"
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
          >
            {submissionState === "submitting" ? (
              <>
                <RefreshCw
                  size={20}
                  className="mr-2 animate-spin"
                />
                Submitting...
              </>
            ) : submissionState === "success" ? (
              <>
                <Check
                  size={20}
                  className="mr-2"
                />
                Submitted
              </>
            ) : (
              <>
                <Send
                  size={20}
                  className="mr-2"
                />
                Submit Event
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Need help? Contact our support team at support@example.com
        </p>
      </motion.div>
    </div>
  )
}

export default FormSubmit
