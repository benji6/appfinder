import React from 'react'
import './style.css'

class Header extends React.PureComponent {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">AppFinder</h1>
      </header>
    )
  }
}

export default Header
