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
  userNameSelector,
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
      userName,
    } = this.props

    if (isLoading) {
      return <Spinner />
    }

    return (
      <div className="reviews">
        <hr className="reviews__hr" />
        {isSignedIn ? (
          <Fragment>
            <img
              alt="profile"
              className="reviews__user-avatar"
              height="64"
              src={userImageUrl}
              width="64"
            />
            <div className="reviews_user-name">{userName}</div>
            <button onClick={handleSignOut}>Sign Out</button>
            {reviews.map(({id, review, rating}) => (
              <div key={id}>{rating} {review}</div>
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
  userName: userNameSelector(state),
})

const mapDispatchToProps = {
  handleMount: reviewsGetRequest,
  handleSignOut: userSignOutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
