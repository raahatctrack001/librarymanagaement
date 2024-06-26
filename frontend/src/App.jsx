import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignIn from "./pages/SignIn"
import Register from "./pages/Register"
import About from "./pages/About"
import Projects from "./pages/Projects"
import DashBoard from "./pages/DashBoard"
import ProfilePage from "./pages/ProfilePage"
import LibraryCard from "./pages/LibraryCard"
import UpdatePassword from "./pages/UpdatePassword"
import ReserveSuccess from "./components/ReserveSuccess"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import PrivateRoute from "./components/PrivateRoute"
import UpdateBook from "./components/UpdateBook"
import SearchBooks from "./components/SearchBooks"
import SearchUser from "./components/SearchUser"


function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/sign-in" element = {<SignIn />} />
          <Route path="/register" element = {<Register />} />
          <Route path="/about" element = {<About />} />
          <Route path="/projects" element = {<Projects />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element = {<DashBoard />} />
            <Route path="/profile" element = {<ProfilePage />} />
            <Route path="/l-card" element = {<LibraryCard />} />
            <Route path="/update-password" element = {<UpdatePassword />} />
          </Route>

          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/search-user" element = {<SearchUser />} />
            <Route path="/dashboard?tab=update-book" element = {<UpdateBook />} />
            <Route path="/update-book/:bookId" element = {<UpdateBook />} />
          </Route>

          <Route path="/search-book/:searchTerm" element = {<SearchBooks />} />
  

        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
