import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Spinner from '../generic/Spinner'
import {appDetailsMount} from '../../actions'
import Rating from '../Rating'
import ReviewForm from '../ReviewForm'
import Reviews from '../Reviews'
import AppCard from '../generic/AppCard'
import {reviewsIsLoadingSelector} from '../../selectors'
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
      showRating,
      showReviewForm,
      url,
    } = this.props

    if (isLoading) return <Spinner />

    return (
      <div className="app-details">
        <div className="app-details__info-container">
          <h2 className="app-details__heading">{name}</h2>
          <div className="app-details__url-container">
            <a
              className="app-details__url"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {url}
            </a>
          </div>
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
        {rating == null ? (
          <Fragment>
            <hr className="app-details__hr" />
            <h3 className="app-details__no-reviews-heading">Be the first to review this app!</h3>
            <ReviewForm appId={id} />
          </Fragment>
        ) : (
          <Fragment>
            {showRating && <hr className="app-details__hr" />}
            {showRating && <Rating />}
            {showReviewForm && <hr className="app-details__hr" />}
            {showReviewForm && <ReviewForm appId={id} />}
            <hr className="app-details__hr" />
            <Reviews id={id} />
          </Fragment>
        )}
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
  showRating: PropTypes.bool.isRequired,
  showReviewForm: PropTypes.bool.isRequired,
  url: PropTypes.string,
  urlId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, {match: {params: {id}}}) => {
  const urlId = Number(id)
  const {app} = state
  const reviewsNotLoading = !reviewsIsLoadingSelector(state)

  return {
    ...app,
    isLoading: !app.id || app.id !== urlId,
    showRating: reviewsNotLoading,
    showReviewForm: reviewsNotLoading,
    urlId,
  }
}

const mapDispatchToProps = {
  handleMount: appDetailsMount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
