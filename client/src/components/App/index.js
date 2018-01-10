import React, {Fragment} from 'react'
import AppList from '../AppList'
import Header from '../Header'
import Search from '../Search'
import CategoryList from '../CategoryList'

class App extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <Search />
        <CategoryList />
        <AppList />
      </Fragment>
    )
  }
}

export default App
