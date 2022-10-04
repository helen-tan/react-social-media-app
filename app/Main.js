import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from 'use-immer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

// Contexts
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
  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // There is 1 context provider for state and 1 contect provider for dispatch
  // This way, each indiv component can decide which context they wan to consume and watch for changes,
  // instead of passing both state & dispatch to 1 context provider and having to re-render when smth they don't need changes
  // e.g. some components only need access to dispatch, but we don't want them to unnecessarily re-render when the global state changes
  return (
   <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      <Router>
        <FlashMessages messages={state.flashMessages}/>
        <Header/>

        <Routes>
          <Route path='/' element={state.loggedIn ? <Home/> : <HomeGuest/>} />
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
