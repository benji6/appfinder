import format from 'date-fns/format'
import PropTypes from 'prop-types'
import React from 'react'
import Avatar from '../../generic/Avatar'
import Icon from '../../generic/Icon'
import './style.css'

class Review extends React.PureComponent {
  render() {
    const {
      children,
      date,
      imageUrl,
      rating,
      userName,
    } = this.props

    return (
      <div className="review">
        <div className="review__header">
          <Avatar url={imageUrl} />
          <div className="review__headings">
            <h3 className="review__heading">{userName}</h3>
            <h4 className="review__subheading">{rating}&nbsp;<Icon name="star" /></h4>
            <p className="review__date">{format(date, 'YYYY-MM-DD')}</p>
          </div>
        </div>
        <p className="review__body">{children}</p>
      </div>
    )
  }
}

Review.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
}

export default Review
