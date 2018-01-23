import React, {Fragment} from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

class Search extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <SearchInput />
        <SearchResults />
      </Fragment>
    )
  }
}

export default Search
