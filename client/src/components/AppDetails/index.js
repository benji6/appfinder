import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import Spinner from '../generic/Spinner'
import {appDetailsMount} from '../../actions'
import {categoriesHaveLoadedSelector} from '../../reducers/categories'
import './style.css'

class AppDetails extends React.PureComponent {
  componentWillMount() {
    const {id, urlId, handleMount} = this.props
    if (id !== urlId) handleMount(urlId)
  }

  render() {
    const {
      categoryNames,
      color,
      description,
      iconUrl,
      isLoading,
      name,
      url,
    } = this.props

    if (isLoading) return <Spinner />

    return (
      <div className="app-details">
        <div className="app-details__info-container">
          <div className="app-details__float-left-container">
            <a
              className="app-details__logo-container"
              href={url}
              rel="noopener noreferrer"
              style={{backgroundColor: color}}
              target="_blank"
            >
              <img
                alt={`${name} logo`}
                className="app-details__logo"
                src={`/${iconUrl}`}
              />
            </a>
            <a className="app-details__launch" href={url} rel="noopener noreferrer" target="_blank">
              Launch
            </a>
          </div>
          <h2 className="app-details__heading">{name}</h2>
          <h3 className="app-details__url">{url}</h3>
          <p>{description || 'No description.'}</p>
        </div>
        <div className="app-details__categories-container">
          <h3 className="app-details__categories-title">Categories:</h3>
          <div className="app-details__category-container">
            {categoryNames.map(categoryName => (
              <div className="app-details__category" key={categoryName}>
                {categoryName}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

AppDetails.propTypes = {
  categoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
  description: PropTypes.string,
  handleMount: PropTypes.func.isRequired,
  iconUrl: PropTypes.string,
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  url: PropTypes.string,
  urlId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, {match: {params: {id}}}) => {
  const urlId = Number(id)
  const {app} = state
  const categoriesHaveLoaded = categoriesHaveLoadedSelector(state)

  return {
    ...app,
    categoryNames: (categoriesHaveLoaded ? app.categoryIds : [])
      .map(categoryId => state.categories.byId[categoryId].name),
    isLoading: !app.id || app.id !== urlId || !categoriesHaveLoaded,
    urlId,
  }
}

const mapDispatchToProps = {
  handleMount: appDetailsMount,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails)
