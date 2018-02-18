import PropTypes from 'prop-types'
import React from 'react'
import './style.css'

class Avatar extends React.PureComponent {
  render() {
    const {url} = this.props

    return (
      <img
        alt="user avatar"
        className="avatar"
        height="64"
        src={url}
        width="64"
      />
    )
  }
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
}

export default Avatar
