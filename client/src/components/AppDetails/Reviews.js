import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {userSignOutRequest} from '../../actions'
import {
  userImageUrlSelector,
  userIsLoadingSelector,
  userIsSignedInSelector,
} from '../../reducers/user'
import Spinner from '../generic/Spinner'
import SignInButton from '../generic/SignInButton'
import './style.css'

class AppDetails extends React.PureComponent {
  render() {
    const {
      handleSignOut,
      isLoading,
      isSignedIn,
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
  handleSignOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  userImageUrl: PropTypes.string,
}

const mapStateToProps = state => ({
  isLoading: userIsLoadingSelector(state),
  isSignedIn: userIsSignedInSelector(state),
  userImageUrl: userImageUrlSelector(state),
})

const mapDispatchToProps = {
  handleSignOut: userSignOutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
