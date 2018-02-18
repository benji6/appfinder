import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__container">
          <NavLink activeClassName="header__link--active" className="header__link" exact to="/">
            Browse
          </NavLink>
          <h1 className="header__title">Appfinder</h1>
          <NavLink activeClassName="header__link--active" className="header__link" to="/search">
            Search
          </NavLink>
        </div>
      </header>
    )
  }
}

export default Header
