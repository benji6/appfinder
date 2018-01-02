import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class AppCard extends React.PureComponent {
  render() {
    const {color, iconUrl, name, url} = this.props
    return (
      <a
        className="app-card"
        href={url}
        style={{backgroundColor: color}}
      >
        <div className="app-card__logo-container">
          <img alt="app logo" height="96" src={iconUrl} width="96" />
        </div>
        <div className="app-card__name">{name}</div>
      </a>
    )
  }
}

AppCard.propTypes = {
  color: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default AppCard
