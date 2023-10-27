import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Auth from "./pages/Auth"
import CreateListing from "./pages/CreateListing"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import ListingPage from "./pages/ListingPage"
import About from "./pages/About"
import LandingPage from "./pages/Index"

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />} >
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="create-listing" element={<CreateListing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path='about' element={<About />} />
        <Route path="listing/:id" element={<ListingPage />} />
      </Route>
    </>
  ))


  return (
   <RouterProvider router={router} />
  )
}

export default App
