import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {categoryCaseMount} from '../../../actions'
import {categoryCaseAppsSelector} from '../../../reducers/categoryCases'
import AppCard from '../../generic/AppCard'
import Spinner from '../../generic/Spinner'
import Icon from '../../generic/Icon'
import {computedStyle} from '../../../utils'
import './style.css'

const capitalizeFirst = ([first, ...rest]) => first.toUpperCase() + rest.join('')
const remPropertyToPx = rem => parseFloat(rem, 10) * 16
const scrollAmount = () => {
  const spacing = remPropertyToPx(computedStyle.getPropertyValue('--cmp-app-card-spacing'))
  const width = remPropertyToPx(computedStyle.getPropertyValue('--cmp-app-card-width'))
  return spacing * 2 + width
}

class CategoryCase extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)
  }

  componentWillMount() {
    this.props.handleMount(this.props.category)
  }

  handleLeftButtonClick() {
    this.itemContainer.scrollBy(-scrollAmount(), 0)
  }

  handleRightButtonClick() {
    this.itemContainer.scrollBy(scrollAmount(), 0)
  }

  render() {
    const {category, apps} = this.props

    return (
      <div className="category-case">
        <div className="category-case__header">
          <h3 className="category-case__title">{capitalizeFirst(category)}</h3>
          <div>
            <button
              aria-label="scroll left"
              className="category-case__scroll-button"
              onClick={this.handleLeftButtonClick}
            >
              <Icon name="arrow-left" />
            </button>
            <button
              aria-label="scroll right"
              className="category-case__scroll-button"
              onClick={this.handleRightButtonClick}
            >
              <Icon name="arrow-right" />
            </button>
          </div>
        </div>
        <div className="category-case__item-container" ref={ref => { this.itemContainer = ref }}>
          {apps
            ? apps.map(({color, iconUrl, id, name, rating}) => (
              <AppCard
                key={id}
                color={color}
                iconUrl={iconUrl}
                id={id}
                name={name}
                rating={rating}
              />
            ))
            : <Spinner />}
          <div className="category-case__end" />
        </div>
      </div>
    )
  }
}

CategoryCase.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string.isRequired,
  handleMount: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  apps: categoryCaseAppsSelector(state, props),
})

const mapDispatchToProps = {
  handleMount: categoryCaseMount,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCase)
