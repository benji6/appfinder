import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class RatingBar extends React.PureComponent {
  render() {
    const {amount} = this.props
    return (
      <span
        className="rating-bar"
        style={{
          transform: `scaleX(${Math.max(amount, 3e-2)})`,
        }}
      />
    )
  }
}

RatingBar.propTypes = {
  amount: PropTypes.number.isRequired,
}

export default RatingBar
