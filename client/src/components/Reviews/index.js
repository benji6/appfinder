import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {textReviewsSelector} from '../../selectors'
import Review from './Review'
import './style.css'

class AppDetails extends React.PureComponent {
  render() {
    const {reviews} = this.props

    return Boolean(reviews.length) && (
      <div className="reviews">
        {reviews.map(({
          dateCreated,
          id,
          imageUrl,
          review,
          rating,
          userName,
        }) => (
          <Review
            date={dateCreated}
            key={id}
            imageUrl={imageUrl}
            rating={rating}
            userName={userName}
          >
            {review}
          </Review>
        ))}
      </div>
    )
  }
}

AppDetails.propTypes = {
  id: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    dateCreated: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired),
}

const mapStateToProps = state => ({
  reviews: textReviewsSelector(state),
})

export default connect(mapStateToProps)(AppDetails)
