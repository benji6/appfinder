import React from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Header from '../Header'
import AppDetails from '../AppDetails'
import Browse from '../Browse'
import Search from '../Search'
import ScrollToTop from '../ScrollToTop'

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Header />
          <Switch>
            <Route path="/" component={Browse} exact />
            <Route path="/app/:id" component={AppDetails} exact />
            <Route path="/search" component={Search} exact />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
