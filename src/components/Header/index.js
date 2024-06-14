import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const onDeleteToken = props => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="headerContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <button type="button" className="logout-button" onClick={onDeleteToken}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
