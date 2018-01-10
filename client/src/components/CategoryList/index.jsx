import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Category from '../Category'
import {categoriesRequest} from '../../actions'
import {
  selectedCategoryIdsSelector,
  categoryIdsSelector,
  categoriesByIdSelector,
} from '../../reducers/categories'
import './style.css'

class App extends React.PureComponent {
  componentDidMount() {
    this.props.categoriesRequest()
  }

  render() {
    const {categories} = this.props

    return (
      <div className="category-list">
        {categories && (
          categories.map(({id, name, selected}) => (
            <Category key={id} id={id} selected={selected}>{name}</Category>
        )))}
      </div>
    )
  }
}

App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesRequest: PropTypes.func.isRequired,
}

const categoriesSelector = createSelector(
  selectedCategoryIdsSelector,
  categoryIdsSelector,
  categoriesByIdSelector,
  (selectedCategoryIds, ids, byId) => ids && ids.map(id => ({
    ...byId[id],
    selected: selectedCategoryIds.includes(id),
  })),
)

const mapStateToProps = state => ({
  categories: categoriesSelector(state),
})

const mapDispatchToProps = {
  categoriesRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
