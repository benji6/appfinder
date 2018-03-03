import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../../generic/Icon'
import './style.css'

class RadioStar extends React.PureComponent {
  render() {
    const {onChange, rating, value} = this.props

    const appearanceClassName = classnames('radio-star__appearance', {
      'radio-star__appearance--highlighted': value <= rating,
    })

    return (
      <label className="radio-star">
        <input
          checked={rating === value}
          className="radio-star__input"
          name="rating"
          onChange={onChange}
          type="radio"
          value={value}
        />
        <span className={appearanceClassName}>
          <Icon fill={value <= rating} name="star" size="1.33rem" />
        </span>
      </label>
    )
  }
}

RadioStar.propTypes = {
  onChange: PropTypes.func.isRequired,
  rating: PropTypes.number,
  value: PropTypes.number.isRequired,
}

export default RadioStar
