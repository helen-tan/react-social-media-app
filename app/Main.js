import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import StateContext from './StateContext'
import DispatchContext from "./DispatchContext"

// Components
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
  // In reducers, instead of multiple useStates, this will store the global states
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("appToken")),
    flashMessages: []
  }

  // note: in React, we don't mutate/modify state. Instead, we must create a new object based on the previous values
  const ourReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return ({
          loggedIn : true,
          flashMessages: state.flashMessages
        })
      case "logout":
        return ({
          loggedIn : false,
          flashMessages: state.flashMessages
        })
      case "flashMessage":
        return ({
          loggedIn : state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value)
        })
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)





  return (
   <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      <Router>
        <FlashMessages messages={flashMessages}/>
        <Header loggedIn={loggedIn} />

        <Routes>
          <Route path='/' element={loggedIn ? <Home/> : <HomeGuest/>} />
          <Route path='/about-us' element={<About/>} />
          <Route path='/terms' element={<Terms/>} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<ViewSinglePost/>} />
        </Routes>

        <Footer />
      </Router>
    </DispatchContext.Provider>
   </StateContext.Provider>

  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
