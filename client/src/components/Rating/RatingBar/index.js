import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class RatingBar extends React.PureComponent {
  componentDidMount() {
    this.el.style.transitionDelay = `${this.props.n * 0.1}s`
    requestAnimationFrame(() => {
      this.el.style.transform = `scaleX(${Math.max(this.props.amount, 3e-2)})`
    })
  }

  componentWillReceiveProps(nextProps) {
    this.el.style.transitionDelay = ''
    requestAnimationFrame(() => {
      this.el.style.transform = `scaleX(${Math.max(nextProps.amount, 3e-2)})`
    })
  }

  render() {
    return (
      <span
        className="rating-bar"
        ref={el => this.el = el}
      />
    )
  }
}

RatingBar.propTypes = {
  amount: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,
}

export default RatingBar
