import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, isError: true})
  }

  submitTheUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-side-container">
          <div className="login-card">
            <img
              src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695099967/Frame_274_po3ioz.svg"
              alt="website login"
              className="login-logo"
            />
            <h1 className="heading">Tasty Kitchens</h1>
            <img
              src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695381646/Rectangle_1457_i3s1kq.png"
              alt="website logo"
              className="website-logo-for-sm"
            />
            <form className="login-form" onSubmit={this.submitTheUserDetails}>
              <h1 className="login-heading">Login</h1>
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="input-element"
                value={username}
                onChange={this.getUsername}
              />
              <br />
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="input-element"
                value={password}
                onChange={this.getPassword}
              />
              <br />
              <button type="submit" className="login-btn">
                Login
              </button>
              {isError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dpgoeszn9/image/upload/v1695102694/Rectangle_1456loginimage_gg7upa.png"
          alt="website logo"
          className="login-website-logo"
        />
      </div>
    )
  }
}

export default LoginPage
