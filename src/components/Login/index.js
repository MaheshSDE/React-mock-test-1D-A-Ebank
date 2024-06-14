import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    isError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePinId = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.setState
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, isError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginContainer">
        <div className="loginCardContainer">
          <div className="imageContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ebank-login-image"
            />
          </div>
          <form className="formContainer" onSubmit={this.onSubmitLogin}>
            <h1 className="loginHeading">Welcome Back</h1>
            <label htmlFor="user-id" className="styling">
              User ID
            </label>
            <input
              type="text"
              id="user-id"
              value={userId}
              className="input-style"
              placeholder="Enter User Id"
              onChange={this.onChangeUserId}
            />
            <label htmlFor="pin-id" className="styling">
              PIN
            </label>
            <input
              type="text"
              id="pin-id"
              value={pin}
              placeholder="Enter PIN"
              className="input-style"
              onChange={this.onChangePinId}
            />
            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>

            {isError && (
              <div className="error-msg">
                <p>{errorMsg}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
