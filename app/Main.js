import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest";

function ExampleComponent() {
  return (
    <>
      <Header />

      <HomeGuest />

      <footer className="border-top text-center small text-muted py-3">
        <p><a href="/" className="mx-1">Home</a> | <a className="mx-1" href="/about-us">About Us</a> | <a className="mx-1" href="/terms">Terms</a></p>
        <p className="m-0">Copyright &copy; 2020 <a href="/" className="text-muted">ComplexApp</a>. All rights reserved.</p>
      </footer>
  </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);

if (module.hot) {
  module.hot.accept();
}
