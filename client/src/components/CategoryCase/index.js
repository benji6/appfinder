import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {categoryCaseMount} from '../../actions'
import {categoryCaseAppsSelector} from '../../reducers/categoryCases'
import AppCard from '../AppCard'
import Spinner from '../Spinner'
import './style.css'

const capitalizeFirst = ([first, ...rest]) => first.toUpperCase() + rest.join('')

class CategoryCase extends React.PureComponent {
  componentDidMount() {
    this.props.handleMount(this.props.category)
  }

  render() {
    const {category, apps} = this.props

    return (
      <div className="category-case">
        <h3 className="category-case__title">{capitalizeFirst(category)}</h3>
        <div className="category-case__item-container">
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
