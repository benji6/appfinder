import React from 'react'
import Icon from '../../generic/Icon'

class CloseButton extends React.PureComponent {
  render() {
    return (
      <button
        {...this.props}
        aria-label="clear search query"
        className="search__close-button"
      >
        <Icon name="x" />
      </button>
    )
  }
}

export default CloseButton
