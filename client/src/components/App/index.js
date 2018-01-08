import React, {Fragment} from 'react'
import AppList from '../AppList'
import Header from '../Header'
import TagList from '../TagList'

class App extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <TagList />
        <AppList />
      </Fragment>
    )
  }
}

export default App
