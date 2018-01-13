import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React from 'react'
import {searchQueryClear, searchQuerySet} from '../../actions'
import {searchQuerySelector} from '../../reducers/search'
import './style.css'

class Search extends React.PureComponent {
  render() {
    const {
      handleChange,
      handleClear,
      query,
    } = this.props

    return (
      <div className="search">
        <label className="search__label" htmlFor="search">Search:&nbsp;</label>
        <input id="search" onChange={e => handleChange(e.target.value)} value={query} />
        <button onClick={handleClear}>CLEAR</button>
      </div>
    )
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  query: searchQuerySelector(state),
})

const mapDispatchToProps = {
  handleChange: searchQuerySet,
  handleClear: searchQueryClear,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
