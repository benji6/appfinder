import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

class AppCard extends React.PureComponent {
  render() {
    const {color, iconUrl, id, name} = this.props

    return (
      <Link
        className="app-card"
        to={`app/${id}`}
        style={{backgroundColor: color}}
      >
        <div className="app-card__logo-container">
          <img
            alt={`${name} logo`}
            className="app-card__logo"
            src={`/${iconUrl}`}
          />
        </div>
        <div className="app-card__name">{name}</div>
      </Link>
    )
  }
}

AppCard.propTypes = {
  color: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default AppCard
