import React from 'react'
import CategoryCase from '../CategoryCase'
import Heading from '../generic/Heading'
import './style.css'

class Browse extends React.PureComponent {
  render() {
    return (
      <div className="browse">
        <Heading variation="h2">Browse apps</Heading>
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

export default Browse
