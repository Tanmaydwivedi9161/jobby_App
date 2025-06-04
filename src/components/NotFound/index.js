import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="text">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="not-found-desc">
        We are sorry, the page your requested could not found.
      </p>
    </div>
  </div>
)

export default NotFound
