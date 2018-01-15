import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {searchResultsClear} from '../../actions'
import AppCard from '../AppCard'
import Spinner from '../Spinner'
import './style.css'

class SearchResults extends React.PureComponent {
  componentWillUnmount() {
    this.props.handleUnmount()
  }

  render() {
    const {apps} = this.props

    return (
      <div className="search-results">
        <h2>Search results</h2>
        {apps ? (
          apps.map(app => <AppCard key={app.id} {...app} />)
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}

SearchResults.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
  handleUnmount: PropTypes.func.isRequired,
}

const mapStateToProps = ({apps}) => ({
  apps: apps.ids && apps.ids.map(id => apps.byId[id]),
})

const mapDispatchToProps = {
  handleUnmount: searchResultsClear,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
