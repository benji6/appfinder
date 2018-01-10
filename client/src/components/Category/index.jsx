import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {categoriesToggleSelectedCategory} from '../../actions'
import './style.css'

class Category extends React.PureComponent {
  render() {
    const {children, handleCategoryClick, id, selected} = this.props

    return (
      <label className="category" htmlFor={id}>
        <input
          aria-label={`Filter by "${children}" category`}
          checked={selected}
          className="category__input"
          id={id}
          onChange={() => handleCategoryClick(id)}
          type="checkbox"
        />
        <span className="category__appearance">
          {children}
        </span>
      </label>
    )
  }
}

Category.propTypes = {
  children: PropTypes.node.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
}

const mapDispatchToProps = {
  handleCategoryClick: categoriesToggleSelectedCategory,
}

export default connect(undefined, mapDispatchToProps)(Category)
