import React from 'react'
import { Link } from 'react-router-dom'

// This is cool stuff, provided by Wasp.
import SignupForm from '@wasp/auth/forms/Signup'

const SignupPage = (props) => {
  return (
    <>
      <SignupForm/>
      <br/>
      <span>
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
    </>
  )
}

export default SignupPage