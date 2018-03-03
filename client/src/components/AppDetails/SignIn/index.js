import React from 'react'
import SignInButton from '../../generic/SignInButton'
import './style.css'

class SignIn extends React.PureComponent {
  render() {
    return (
      <div className="sign-in">
        <div>Not Signed In</div>
        <SignInButton />
      </div>
    )
  }
}

export default SignIn
