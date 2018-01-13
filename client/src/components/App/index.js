import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import SearchResults from '../SearchResults'
import Header from '../Header'
import Search from '../Search'
import CategoryCaseContainer from '../CategoryCaseContainer'
import {searchQuerySelector} from '../../reducers/search'

class App extends React.PureComponent {
  render() {
    const {isUserSearching} = this.props
    return (
      <Fragment>
        <Header />
        <Search />
        {isUserSearching ? (
          <SearchResults />
        ) : (
          <CategoryCaseContainer />
        )}
      </Fragment>
    )
  }
}

App.propTypes = {
  isUserSearching: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isUserSearching: Boolean(searchQuerySelector(state)),
})

export default connect(mapStateToProps)(App)
