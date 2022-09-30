import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appToken")));

  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

      <Routes>
        <Route path='/' element={loggedIn ? <Home/> : <HomeGuest/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/create-post' element={<CreatePost/>} />
      </Routes>

      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
