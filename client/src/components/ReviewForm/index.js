import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {
  userImageUrlSelector,
  userIsSignedInSelector,
  userNameSelector,
} from '../../reducers/user'
import {userSignOutRequest} from '../../actions'
import Avatar from '../generic/Avatar'
import SignInButton from '../generic/SignInButton'
import './style.css'

class ReviewForm extends React.PureComponent {
  render() {
    const {
      handleSignOut,
      isSignedIn,
      userImageUrl,
      userName,
    } = this.props

    const handleSubmit = e => {
      e.preventDefault()
    }

    return (
      isSignedIn ? (
        <Fragment>
          <div className="review-form__header">
            <Avatar url={userImageUrl} />
            <div className="reviews_user-name">{userName}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Rating:
              <input min="1" max="5" type="number" />
            </label>
            <label>
              Review:
              <input type="text" />
            </label>
            <button>Submit</button>
          </form>
          <button onClick={handleSignOut}>Sign Out</button>
        </Fragment>
      ) : (
        <Fragment>
          <div>Not Signed In</div>
          <SignInButton />
        </Fragment>
      )
    )
  }
}

ReviewForm.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string,
}

const mapStateToProps = state => ({
  isSignedIn: userIsSignedInSelector(state),
  userImageUrl: userImageUrlSelector(state),
  userName: userNameSelector(state),
})

const mapDispatchToProps = {
  handleSignOut: userSignOutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
