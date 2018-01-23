import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {searchResultsClear} from '../../../actions'
import AppCard from '../../generic/AppCard'
import Spinner from '../../generic/Spinner'
import {
  searchResultsAppsSelector,
  searchIsLoadingSelector,
  searchQuerySelector,
} from '../../../reducers/search'
import './style.css'

class SearchResults extends React.PureComponent {
  componentWillUnmount() {
    this.props.handleUnmount()
  }

  render() {
    const {apps, isLoading, isUserSearching} = this.props

    if (!isUserSearching) return null

    return (
      <div className="search-results">
        <h2>Search results</h2>
        {apps.length ? (
          apps.map(app => <AppCard key={app.id} {...app} />)
        ) : isLoading ? (
          <Spinner />
        ) : (
          <div className="search-results__no-results">No results found</div>
        )}
      </div>
    )
  }
}

SearchResults.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
  handleUnmount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUserSearching: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  apps: searchResultsAppsSelector(state),
  isLoading: searchIsLoadingSelector(state),
  isUserSearching: Boolean(searchQuerySelector(state)),
})

const mapDispatchToProps = {
  handleUnmount: searchResultsClear,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
