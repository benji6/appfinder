/* eslint-disable max-len */
import PropTypes from 'prop-types'
import React from 'react'

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="17 22 5 12 17 2" />
  </svg>
)

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 22 17 12 5 2" />
  </svg>
)

const Star = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const nameToComponentMap = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  star: Star,
  x: X,
}

class Icon extends React.PureComponent {
  render() {
    const {name, size} = this.props

    return React.createElement(
      nameToComponentMap[name],
      {style: {height: size, width: size}},
    )
  }
}

Icon.defaultProps = {
  size: '1rem',
}

Icon.propTypes = {
  name: PropTypes.oneOf([
    'arrow-left',
    'arrow-right',
    'star',
    'x',
  ]),
  size: PropTypes.string,
}

export default Icon
