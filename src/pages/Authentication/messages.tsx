import { defineMessages } from 'react-intl';

const authenticationResources = defineMessages({
  email: {
    id: 'authenticationMessages.email',
    defaultMessage: 'Email'
  },
  password: {
    id: 'authenticationMessages.password',
    defaultMessage: 'Password'
  },
  inputEmailMessage: {
    id: 'authenticationMessages.inputEmailMessage',
    defaultMessage: 'Please input your Email.'
  },
  inputPasswordMessage: {
    id: 'authenticationMessages.inputPasswordMessage',
    defaultMessage: 'Please input your Password.'
  },
  rememberMe: {
    id: 'authenticationMessages.rememberMe',
    defaultMessage: 'Remember me'
  },
  forgotPassword: {
    id: 'authenticationMessages.forgotPassword',
    defaultMessage: 'Forgot password'
  },
  login: {
    id: 'authenticationMessages.login',
    defaultMessage: 'Log in'
  },
  register: {
    id: 'authenticationMessages.register',
    defaultMessage: 'Register'
  },
  registerNow: {
    id: 'authenticationMessages.registerNow',
    defaultMessage: 'Register Now!'
  },
  name: {
    id: 'authenticationMessages.name',
    defaultMessage: 'Name'
  },
  lastName: {
    id: 'authenticationMessages.lastName',
    defaultMessage: 'Lastname'
  },
  inputNameMessage: {
    id: 'authenticationMessages.inputNameMessage',
    defaultMessage: 'Please input your Name.'
  },
  inputLastNameMessage: {
    id: 'authenticationMessages.inputLastNameMessage',
    defaultMessage: 'Please input your Lastname.'
  },
  inputNameMaxMessage: {
    id: 'authenticationMessages.inputNameMaxMessage',
    defaultMessage: 'Name must be less than 30 characters.'
  },
  inputLastNameMaxMessage: {
    id: 'authenticationMessages.inputLastNameMaxMessage',
    defaultMessage: 'Lastname must be less than 30 characters.'
  },
  inputEmailMaxMessage: {
    id: 'authenticationMessages.inputEmailMaxMessage',
    defaultMessage: 'Email must be less than 240 characters.'
  },
  inputPasswordMinMessage: {
    id: 'authenticationMessages.inputPasswordMinMessage',
    defaultMessage: 'Password must be at least 6 characters.'
  },
  inputPasswordNotMatchMessage: {
    id: 'authenticationMessages.inputPasswordNotMatchMessage',
    defaultMessage: 'The two passwords that you entered do not match.'
  },
  loginNow: {
    id: 'authenticationMessages.loginNow',
    defaultMessage: 'Login Now!'
  },
  alreadyHaveAccount: {
    id: 'authenticationMessages.alreadyHaveAccount',
    defaultMessage: 'Already have an account?'
  },
  dontHaveAccount: {
    id: 'authenticationMessages.dontHaveAccount',
    defaultMessage: "Don't have an account?"
  }
});

export default authenticationResources;
