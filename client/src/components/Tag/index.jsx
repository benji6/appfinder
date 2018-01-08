import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {tagsToggleSelectedTag} from '../../actions'
import './style.css'

class Tag extends React.PureComponent {
  render() {
    const {children, handleTagClick, id, selected} = this.props
    const className = classnames('tag', {
      'tag--selected': selected,
    })
    return (
      <button
        aria-label={`Filter by "${children}" tag`}
        className={className}
        onClick={() => handleTagClick(id)}
      >
        {children}
      </button>
    )
  }
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
}

const mapDispatchToProps = {
  handleTagClick: tagsToggleSelectedTag,
}

export default connect(undefined, mapDispatchToProps)(Tag)
