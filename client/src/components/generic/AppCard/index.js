import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Icon from '../Icon'
import {computedStyle} from '../../../utils'
import './style.css'

class AppCard extends React.PureComponent {
  render() {
    const {color, iconUrl, id, name, rating, url} = this.props

    const Component = url ? 'a' : Link

    const componentProps = {
      className: 'app-card',
      style: {backgroundColor: color},
      ...url ? {
        href: url,
        rel: 'noopener noreferrer',
        target: '_blank',
      } : {
        to: `app/${id}`,
      },
    }

    return (
      <Component {...componentProps}>
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
            {(rating || 0).toFixed(1)}
            &nbsp;
            <Icon name="star" size={computedStyle.getPropertyValue('--cmp-app-card-font-size')} />
          </Fragment>
        </div>
      </Component>
    )
  }
}

AppCard.propTypes = {
  color: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  url: PropTypes.string,
}

export default AppCard
