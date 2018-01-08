import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import Tag from '../Tag'
import {tagsRequest} from '../../actions'
import {
  selectedTagIdsSelector,
  tagIdsSelector,
  tagsByIdSelector,
} from '../../reducers/tags'
import './style.css'

class App extends React.PureComponent {
  componentDidMount() {
    this.props.tagsRequest()
  }

  render() {
    const {tags} = this.props

    return (
      <div className="tag-list">
        {tags && (
          tags.map(({id, name, selected}) => (
            <Tag key={id} id={id} selected={selected}>{name}</Tag>
        )))}
      </div>
    )
  }
}

App.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  tagsRequest: PropTypes.func.isRequired,
}

const tagsSelector = createSelector(
  selectedTagIdsSelector,
  tagIdsSelector,
  tagsByIdSelector,
  (selectedTagIds, ids, byId) => ids && ids.map(id => ({
    ...byId[id],
    selected: selectedTagIds.includes(id),
  })),
)

const mapStateToProps = state => ({
  tags: tagsSelector(state),
})

const mapDispatchToProps = {
  tagsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
