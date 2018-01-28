import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import Spinner from '../generic/Spinner'
import {appDetailsMount} from '../../actions'
import './style.css'

class AppDetails extends React.PureComponent {
  componentWillMount() {
    const {id, urlId, handleMount} = this.props
    if (id !== urlId) handleMount(urlId)
  }

  render() {
    const {urlId, ...rest} = this.props
    const {color, iconUrl, id, name, url} = rest

    if (!id || id !== urlId) return <Spinner />

    return (
      <div className="app-details">
        <div className="app-details__info-container">
          <div className="app-details__float-left-container">
            <a
              className="app-details__logo-container"
              href={url}
              rel="noopener noreferrer"
              style={{backgroundColor: color}}
              target="_blank"
            >
              <img
                alt={`${name} logo`}
                className="app-details__logo"
                src={`/${iconUrl}`}
              />
            </a>
            <a className="app-details__launch" href={url} rel="noopener noreferrer" target="_blank">
              Launch
            </a>
          </div>
          <h2>{name}</h2>
          <div>
            In a future release we will have loads of information about this app. Stay tuned!
          </div>
        </div>
      </div>
    )
  }
}

AppDetails.propTypes = {
  handleMount: PropTypes.func.isRequired,
  id: PropTypes.number,
  urlId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, {match: {params: {id}}}) => ({
  ...state.app,
  urlId: Number(id),
})

const mapDispatchToProps = {
  handleMount: appDetailsMount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
