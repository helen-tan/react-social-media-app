import React from 'react'

// Container component controls the width of contents on the page
const Container = (props) => {
  return (
    <div className={`container py-md-5 ${props.wide ? '' : 'container--narrow'}`} >
      {props.children}
    </div>
  )
}

export default Container
