import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Icon from '../Icon'
import {computedStyle} from '../../../utils'
import './style.css'

class AppCard extends React.PureComponent {
  render() {
    const {color, iconUrl, id, name, rating} = this.props

    return (
      <Link
        className="app-card"
        to={`app/${id}`}
        style={{backgroundColor: color}}
      >
        <div className="app-card__header">{name}</div>
        <div className="app-card__logo-container">
          <img
            alt={`${name} logo`}
            className="app-card__logo"
            src={`/${iconUrl}`}
          />
        </div>
        <div className="app-card__footer">
          <Fragment>
            {rating ? rating.toFixed(1) : '0.0'}
            &nbsp;
            <Icon name="star" size={computedStyle.getPropertyValue('--cmp-app-card-font-size')} />
          </Fragment>
        </div>
      </Link>
    )
  }
}

AppCard.propTypes = {
  color: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
}

export default AppCard
