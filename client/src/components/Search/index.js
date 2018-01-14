import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React from 'react'
import {searchQueryClear, searchQuerySet} from '../../actions'
import {searchQuerySelector} from '../../reducers/search'
import CloseButton from './CloseButton'
import {SEARCH_QUERY_MAX_LENGTH} from '../../constants'
import './style.css'

class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    this.props.handleClear()
    this.input.focus()
  }

  render() {
    const {
      handleChange,
      query,
    } = this.props

    return (
      <div className="search">
        <input
          className="search__input"
          id="search"
          maxLength={SEARCH_QUERY_MAX_LENGTH}
          onChange={e => handleChange(e.target.value)}
          ref={ref => { this.input = ref }}
          value={query}
        />
        <label className="search__label" htmlFor="search">Search</label>
        <CloseButton onClick={this.handleClear} />
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
