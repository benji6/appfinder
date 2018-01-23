import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <NavLink activeClassName="header__link--active" className="header__link" exact to="/">
          Browse
        </NavLink>
        <h1 className="header__title">AppFinder</h1>
        <NavLink activeClassName="header__link--active" className="header__link" to="/search">
          Search
        </NavLink>
      </header>
    )
  }
}

export default Header
