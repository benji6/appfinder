import PropTypes from 'prop-types'
import {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'

class ScrollToTop extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default withRouter(ScrollToTop)
