import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import SignIn from "./components/sign-in/SignIn"
import SignUp from "./components/sing-up/SignUp"
import ForgotPassword from "./components/forgot-password/ForgotPassword"
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage"
import AllEventsPage from "./pages/AllEventsPage"
import Footer from "./components/layout/Footer"
import CreateEventPage from "./pages/CreateEventPage"

// Wrapper component to conditionally render Navbar and Footer
const AppLayout = () => {
  const location = useLocation()

  // Check if current route is an auth page
  const isAuthPage = ["/signin", "/signup", "/forgot-password"].includes(
    location.pathname
  )

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="/events"
          element={<AllEventsPage />}
        />
        <Route
          path="/events/create"
          element={<CreateEventPage />}
        />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}
