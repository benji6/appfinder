import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {
  reviewsGetRequest,
  userSignOutRequest,
} from '../../actions'
import {reviewsSelector} from '../../reducers/reviews'
import {
  userImageUrlSelector,
  userIsLoadingSelector,
  userIsSignedInSelector,
} from '../../reducers/user'
import Spinner from '../generic/Spinner'
import SignInButton from '../generic/SignInButton'
import './style.css'

class AppDetails extends React.PureComponent {
  componentDidMount() {
    this.props.handleMount(this.props.id)
  }

  render() {
    const {
      handleSignOut,
      isLoading,
      isSignedIn,
      reviews,
      userImageUrl,
    } = this.props

    if (isLoading) {
      return <Spinner />
    }

    return (
      <div className="app-details__reviews">
        <h3>Reviews</h3>
        {isSignedIn ? (
          <Fragment>
            <img alt="profile" src={userImageUrl} height="100" width="100" />
            <button onClick={handleSignOut}>Sign Out</button>
            {reviews.map(({review, rating}) => (
              <div>{rating} {review}</div>
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <div>Not Signed in</div>
            <SignInButton />
          </Fragment>
        )}
      </div>
    )
  }
}

AppDetails.propTypes = {
  handleMount: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired),
  userImageUrl: PropTypes.string,
}

const mapStateToProps = state => ({
  isLoading: userIsLoadingSelector(state),
  isSignedIn: userIsSignedInSelector(state),
  reviews: reviewsSelector(state),
  userImageUrl: userImageUrlSelector(state),
})

const mapDispatchToProps = {
  handleMount: reviewsGetRequest,
  handleSignOut: userSignOutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
