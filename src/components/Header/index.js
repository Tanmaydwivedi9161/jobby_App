import './index.css'
import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {FaBriefcase} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const ClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="logo-box">
        <Link to="/">
          <button type="button" className="logo-btn">
            {' '}
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </button>
        </Link>
      </div>
      <ul className="list-items">
        <Link to="/" className="link">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="nav-item">Jobs</li>
        </Link>
      </ul>
      <div className="btn-box">
        <button className="my-btn" type="button" onClick={ClickLogout}>
          Logout
        </button>
      </div>
      <div className="mobile-box">
        <Link to="/">
          {' '}
          <IoMdHome className="icon" />
        </Link>
        <Link to="/jobs">
          {' '}
          <FaBriefcase className="icon" />
        </Link>
        <button className="logo-btn" onClick={ClickLogout} type="button">
          <IoIosLogOut className="icon" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
