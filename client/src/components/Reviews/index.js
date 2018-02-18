import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {reviewsGetRequest} from '../../actions'
import {reviewsSelector} from '../../reducers/reviews'
import Review from './Review'
import './style.css'

class AppDetails extends React.PureComponent {
  componentDidMount() {
    this.props.handleMount(this.props.id)
  }

  render() {
    const {reviews,
    } = this.props

    return (
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
        <hr />
      </div>
    )
  }
}

AppDetails.propTypes = {
  handleMount: PropTypes.func.isRequired,
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
  reviews: reviewsSelector(state),
})

const mapDispatchToProps = {
  handleMount: reviewsGetRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
