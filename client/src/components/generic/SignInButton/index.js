import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {userSignInSuccess} from '../../../actions'

class SignInButton extends React.PureComponent {
  componentDidMount() {
    const {onsuccess} = this.props

    window.gapi.signin2.render('my-signin2', {
      longtitle: true,
      onsuccess,
      theme: 'dark',
    })
  }

  render() {
    return <div id="my-signin2" />
  }
}

SignInButton.propTypes = {
  onsuccess: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  onsuccess: userSignInSuccess,
}

export default connect(null, mapDispatchToProps)(SignInButton)
