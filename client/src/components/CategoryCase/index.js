import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {categoryCaseMount} from '../../actions'
import {categoryCaseAppsSelector} from '../../reducers/categoryCases'
import AppCard from '../AppCard'
import Spinner from '../Spinner'
import './style.css'

const capitalizeFirst = ([first, ...rest]) => first.toUpperCase() + rest.join('')
const remPropertyToPx = rem => parseInt(rem, 10) * 16

class CategoryCase extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)

    const styles = getComputedStyle(document.documentElement)
    const spacing = remPropertyToPx(styles.getPropertyValue('--cmp-app-card-spacing'))
    const width = remPropertyToPx(styles.getPropertyValue('--cmp-app-card-width'))
    this.scrollAmount = spacing + width
  }

  componentDidMount() {
    this.props.handleMount(this.props.category)
  }

  handleLeftButtonClick() {
    this.itemContainer.scrollBy(-176, 0)
  }

  handleRightButtonClick() {
    this.itemContainer.scrollBy(176, 0)
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="17 22 5 12 17 2" />
              </svg>
            </button>
            <button
              aria-label="scroll right"
              className="category-case__scroll-button"
              onClick={this.handleRightButtonClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 22 17 12 5 2" />
              </svg>
            </button>
          </div>
        </div>
        <div className="category-case__item-container" ref={ref => { this.itemContainer = ref }}>
          {apps
            ? apps.map(app => <AppCard key={app.id} {...app} />)
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
