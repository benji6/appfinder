import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {appsRequest} from '../../actions'
import AppCard from '../AppCard'
import './style.css'

class App extends React.PureComponent {
  componentDidMount() {
    this.props.appsRequest()
  }

  render() {
    const {apps} = this.props
    return (
      <div className="app-list">
        {apps ? (
          apps.map(app => <AppCard key={app.id} {...app} />)
        ) : (
          'LOADING'
        )}
      </div>
    )
  }
}

App.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
  appsRequest: PropTypes.func.isRequired,
}

const mapStateToProps = ({apps}) => ({
  apps: apps.ids && apps.ids.map(id => apps.byId[id]),
})

const mapDispatchToProps = {
  appsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
