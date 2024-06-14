import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt=" not found"
      className="not-found-image"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFoundDescription">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
