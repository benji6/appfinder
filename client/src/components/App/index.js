import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'
import Browse from '../Browse'
import Search from '../Search'

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Browse} />
          <Route path="/search" component={Search} />
        </Fragment>
      </Router>
    )
  }
}

export default App
