import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/shared/FlashMessages"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appToken")));
  const [flashMessages, setFlashMessages] = useState([])

  const addFlashMessage = (msg) => {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <Router>
      <FlashMessages messages={flashMessages}/>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

      <Routes>
        <Route path='/' element={loggedIn ? <Home/> : <HomeGuest/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/create-post' element={<CreatePost addFlashMessage={addFlashMessage}/>} />
        <Route path='/post/:id' element={<ViewSinglePost/>} />
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
