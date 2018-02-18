import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class RatingBar extends React.PureComponent {
  componentDidMount() {
    requestAnimationFrame(() => {
      this.el.style.transform = `scaleX(${Math.max(this.props.amount, 3e-2)})`
    })
  }

  render() {
    const {n} = this.props
    return (
      <span
        className="rating-bar"
        ref={el => this.el = el}
        style={{
          transitionDelay: `${n * 0.1}s`,
        }}
      />
    )
  }
}

RatingBar.propTypes = {
  amount: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,
}

export default RatingBar
