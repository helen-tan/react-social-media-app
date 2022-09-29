import React, { useEffect } from 'react'
import Container from './Container'

// Page component updates the title of the page
const Page = (props) => {
  useEffect(() => {
    // Update title of the page
    document.title = `${props.title} | Social Media App`
    // Scroll to top of the page
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container wide={props.wide}>
      {props.children}
    </Container>
  )
}

export default Page
