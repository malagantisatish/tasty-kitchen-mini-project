import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {showMenuForSm: false}

  showTheNavItem = () => {
    this.setState(prevState => ({showMenuForSm: !prevState.showMenuForSm}))
  }

  logoutTheUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderTheNavItemForSm = () => (
    <div className="nav-container-for-sm">
      <ul className="nav-items-sm-devices">
        <li className="nav-item">
          <Link to="/" className="link-style">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cart" className="link-style">
            Cart
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-btn-sm"
            onClick={this.logoutTheUser}
          >
            Logout
          </button>
        </li>
      </ul>

      <button type="button" className="menu-btn" onClick={this.showTheNavItem}>
        <AiFillCloseCircle className="menu-icon" />
      </button>
    </div>
  )

  render() {
    const {showMenuForSm} = this.state
    return (
      <>
        <nav className="navbar">
          <div className="logo-heading-container">
            <Link to="/" className="link-style">
              <img
                src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695099967/Frame_274_po3ioz.svg"
                alt="website logo"
                className="website-logo-header"
              />
            </Link>
            <h1 className="brand-name">Tasty Kitchen</h1>
          </div>

          <ul className="nav-items-lg-devices">
            <li className="nav-item">
              <Link to="/" className="link-style">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/cart" className="link-style">
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-btn-lg"
                onClick={this.logoutTheUser}
              >
                Logout
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="menu-btn"
            onClick={this.showTheNavItem}
          >
            <AiOutlineMenu className="menu-icon" />
          </button>
        </nav>
        {showMenuForSm && this.renderTheNavItemForSm()}
      </>
    )
  }
}

export default withRouter(Header)
