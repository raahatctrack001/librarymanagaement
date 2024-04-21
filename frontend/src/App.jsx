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
          <Route path="/dashboard" element = {<DashBoard />} />
          <Route path="/profile" element = {<ProfilePage />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
