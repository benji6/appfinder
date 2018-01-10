import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React from 'react'
import {searchQuerySet} from '../../actions'
import {querySelector} from '../../reducers/search'
import './style.css'

class Search extends React.PureComponent {
  render() {
    const {handleChange, query} = this.props

    return (
      <div className="search">
        <label className="search__label" htmlFor="search">Search:&nbsp;</label>
        <input id="search" onChange={e => handleChange(e.target.value)} value={query} />
      </div>
    )
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  query: querySelector(state),
})

const mapDispatchToProps = {
  handleChange: searchQuerySet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
