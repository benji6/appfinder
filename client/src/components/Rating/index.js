import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {appRatingSelector} from '../../reducers/app'
import {
  ratingsBreakdownSelector,
  totalRatingsSelector,
} from '../../reducers/reviews'
import Icon from '../generic/Icon'
import {computedStyle} from '../../utils'
import RatingBar from './RatingBar'
import './style.css'

const headingFontSize = computedStyle.getPropertyValue('--cmp-rating-heading-font-size')

class Rating extends React.PureComponent {
  render() {
    const {
      rating,
      ratingsBreakdown,
      totalRatings,
    } = this.props

    return (
      <div className="rating">
        <div className="rating__header">
          <h3 className="rating__heading">
            {rating.toFixed(1)}&nbsp;<Icon name="star" size={headingFontSize} />
          </h3>
          <h4 className="rating__subheading">({totalRatings} rating{totalRatings > 1 ? 's' : ''})</h4>
        </div>
        <div className="rating__breakdown">
          {Object.entries(ratingsBreakdown)
            .reverse()
            .map(([stars, amount]) => (
              <Fragment key={stars}>
                <div className="rating__breakdown-stars">
                  {stars}&nbsp;<Icon name="star" />
                </div>
                <RatingBar amount={amount} />
                <span>{Math.round(amount * 100)}%</span>
              </Fragment>
            ))}
        </div>
      </div>
    )
  }
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingsBreakdown: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  totalRatings: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  rating: appRatingSelector(state),
  ratingsBreakdown: ratingsBreakdownSelector(state),
  totalRatings: totalRatingsSelector(state),
})

export default connect(mapStateToProps)(Rating)
