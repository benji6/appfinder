import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class Heading extends React.PureComponent {
  render() {
    const {variation, ...rest} = this.props
    const className = `heading--${variation}`
    return React.createElement(variation, {...rest, className})
  }
}

Heading.propTypes = {
  variation: PropTypes.oneOf(['h2']),
}

export default Heading
