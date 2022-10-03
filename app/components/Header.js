import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderLoggedOut from './HeaderLoggedOut'
import HeaderLoggedIn from './HeaderLoggedIn'
import StateContext from '../StateContext'

const Header = (props) => {
  const globalState = useContext(StateContext)

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            Social Media App
          </Link>
        </h4>

        {globalState.loggedIn ? <HeaderLoggedIn/> : <HeaderLoggedOut/>}

      </div>
    </header>
  )
}

export default Header
