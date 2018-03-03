import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {
  userImageUrlSelector,
  userNameSelector,
  userRatingSelector,
  userReviewIdSelector,
  userReviewSelector,
} from '../../selectors'
import Avatar from '../generic/Avatar'
import RadioStar from './RadioStar'
import {reviewFormSubmit} from '../../actions'
import './style.css'

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super()

    this.state = {
      rating: props.rating || null,
      review: props.review || '',
    }

    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rating !== nextProps.rating || this.props.review !== nextProps.review) {
      this.setState({
        rating: nextProps.rating || null,
        review: nextProps.review || '',
      })
    }
  }

  handleRatingChange(e) {
    this.setState({rating: Number(e.target.value)})
  }

  handleReviewChange(e) {
    this.setState({review: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()

    const {appId, reviewId} = this.props
    const {rating, review} = this.state

    this.props.handleFormSubmit({
      appId,
      rating,
      review,
      reviewId,
    })
  }

  render() {
    const {
      userImageUrl,
      userName,
    } = this.props
    const {rating, review} = this.state

    return (
      <div className="review-form">
        <Fragment>
          <div className="review-form__header">
            <Avatar url={userImageUrl} />
            <div>{userName}</div>
          </div>
          <form className="review-form__form" onSubmit={this.handleSubmit}>
            <div className="review-form__rating-container">
              {[1, 2, 3, 4, 5].map(value => (
                <RadioStar
                  key={value}
                  onChange={this.handleRatingChange}
                  rating={rating}
                  value={value}
                />
              ))}
            </div>
            <label className="review-form__review-label">
              Review
              <textarea
                className="review-form__review-input"
                onChange={this.handleReviewChange}
                placeholder="Write your review here"
                type="text"
                value={review}
              />
            </label>
            <button className="review-form__submit">Submit</button>
          </form>
        </Fragment>
      </div>
    )
  }
}

ReviewForm.propTypes = {
  appId: PropTypes.number.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  rating: PropTypes.number,
  review: PropTypes.string,
  reviewId: PropTypes.number,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string,
}

const mapStateToProps = state => ({
  rating: userRatingSelector(state),
  review: userReviewSelector(state),
  reviewId: userReviewIdSelector(state),
  userImageUrl: userImageUrlSelector(state),
  userName: userNameSelector(state),
})

const mapDispatchToProps = {
  handleFormSubmit: reviewFormSubmit,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
