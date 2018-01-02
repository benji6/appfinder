import React, {Fragment} from 'react'
import AppList from '../AppList'
import Header from '../Header'

class App extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <AppList />
      </Fragment>
    )
  }
}

export default App
