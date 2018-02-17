import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import Spinner from '../generic/Spinner'
import {appDetailsMount} from '../../actions'
import Reviews from '../Reviews'
import AppCard from '../generic/AppCard'
import './style.css'

class AppDetails extends React.PureComponent {
  componentWillMount() {
    const {id, urlId, handleMount} = this.props
    if (id !== urlId) handleMount(urlId)
  }

  render() {
    const {
      color,
      description,
      iconUrl,
      id,
      isLoading,
      name,
      rating,
      url,
    } = this.props

    if (isLoading) return <Spinner />

    return (
      <div className="app-details">
        <div className="app-details__info-container">
          <h2 className="app-details__heading">{name}</h2>
          <a
            className="app-details__url"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {url}
          </a>
          <div className="app-details__app-card-container">
            <AppCard
              color={color}
              iconUrl={iconUrl}
              name={name}
              rating={rating}
              url={url}
            />
          </div>
          <p className="app-details__description">{description || 'No description available.'}</p>
        </div>
        <Reviews id={id} />
      </div>
    )
  }
}

AppDetails.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
  handleMount: PropTypes.func.isRequired,
  iconUrl: PropTypes.string,
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  rating: PropTypes.number,
  url: PropTypes.string,
  urlId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, {match: {params: {id}}}) => {
  const urlId = Number(id)
  const {app} = state

  return {
    ...app,
    isLoading: !app.id || app.id !== urlId,
    urlId,
  }
}

const mapDispatchToProps = {
  handleMount: appDetailsMount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
