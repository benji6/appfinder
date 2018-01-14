import React from 'react'
import CategoryCase from '../CategoryCase'
import './style.css'

class CategoryCaseContainer extends React.PureComponent {
  render() {
    return (
      <div className="category-case-container">
        <h2>Browse apps</h2>
        <CategoryCase category="business" />
        <CategoryCase category="demo" />
        <CategoryCase category="game" />
        <CategoryCase category="news" />
        <CategoryCase category="reference" />
        <CategoryCase category="shopping" />
        <CategoryCase category="social" />
        <CategoryCase category="tool" />
      </div>
    )
  }
}

export default CategoryCaseContainer
