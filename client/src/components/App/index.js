import React, {Fragment} from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Header from './Header'
import Browse from '../Browse'
import Search from '../Search'

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route path="/" component={Browse} exact />
            <Route path="/search" component={Search} exact />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default App
