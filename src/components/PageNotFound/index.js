import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="page-not-found-container">
    <img
      src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695709600/erroring_1_th4taz.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
