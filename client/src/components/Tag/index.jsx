import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {tagsToggleSelectedTag} from '../../actions'
import './style.css'

class Tag extends React.PureComponent {
  render() {
    const {children, handleTagClick, id, selected} = this.props

    return (
      <label className="tag" htmlFor={id}>
        <input
          aria-label={`Filter by "${children}" tag`}
          checked={selected}
          className="tag__input"
          id={id}
          onChange={() => handleTagClick(id)}
          type="checkbox"
        />
        <span className="tag__appearance">
          {children}
        </span>
      </label>
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
