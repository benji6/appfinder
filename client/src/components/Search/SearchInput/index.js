import classnames from 'classnames'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React from 'react'
import {searchQueryClear, searchRequest} from '../../../actions'
import {searchQuerySelector} from '../../../selectors'
import CloseButton from './CloseButton'
import {SEARCH_QUERY_MAX_LENGTH} from '../../../constants'
import './style.css'

class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
    this.state = {
      isFocussed: false,
    }
  }

  componentDidMount() {
    const {input} = this
    input.onfocus = () => this.setState({isFocussed: true})
    input.onblur = () => this.setState({isFocussed: false})
  }

  handleClear() {
    this.props.handleClear()
    this.input.focus()
  }

  render() {
    const {
      handleChange,
      query,
    } = this.props
    const {isFocussed} = this.state

    const searchContainerClassName = classnames('search__container', {
      'search__container--focus': isFocussed,
    })

    return (
      <div className="search">
        <div className={searchContainerClassName}>
          <input
            className="search__input"
            id="search"
            maxLength={SEARCH_QUERY_MAX_LENGTH}
            onChange={e => handleChange(e.target.value)}
            placeholder="Enter search here"
            ref={ref => { this.input = ref }}
            value={query}
          />
          <label className="search__label" htmlFor="search">Search</label>
          <CloseButton onClick={this.handleClear} />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  query: searchQuerySelector(state),
})

const mapDispatchToProps = {
  handleChange: searchRequest,
  handleClear: searchQueryClear,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
