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


function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/sign-in" element = {<SignIn />} />
          <Route path="/register" element = {<Register />} />
          <Route path="/about" element = {<About />} />
          <Route path="/project" element = {<Projects />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element = {<DashBoard />} />
            <Route path="/profile" element = {<ProfilePage />} />
            <Route path="/l-card" element = {<LibraryCard />} />
            <Route path="/update-password" element = {<UpdatePassword />} />
          </Route>

          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/dashboard?tab=update-book" element = {<UpdateBook />} />
          </Route>
  

        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
