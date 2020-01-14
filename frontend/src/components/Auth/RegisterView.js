import React, { useState, useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
  WrapperAuth, PageContent
} from '../../styles/shared/wrapper'
import { AvatarAuth } from '../../styles/shared/avatar'
import { login } from './AuthActions'
import { PageTitle } from '../Global/Header/HeaderTopMob'
import { AuthContext } from './AuthContext'
import { LabelAuth } from '../../styles/typography/typography'
import { Logo } from '../../styles/shared/logo'
import { PrimaryButton } from '../../styles/shared/button'
import { Input, InputWithIcon, InputWrapper, LoginError } from '../../styles/shared/input'
import { LoginForm } from '../../styles/shared/form'
import { ForgotPass, LinksWrapper, NewPlayer } from '../../styles/shared/links'
import { isMobile } from 'react-device-detect'
import { AT_ICON, KEY_SKELETON_ICON_ALT, USER_ICON } from '../../styles/abstract/variables'

function RegisterView ({ history, type }) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')
  const authContext = useContext(AuthContext)
  const onSubmit = async (e) => {
    e.preventDefault()
    login(authContext, email, password, history)
  }
  const { errorLogin } = authContext.state
  return (
    <PageContent type={type}>
      
      <WrapperAuth>
        <Logo web>
          <Link to='./'>{PageTitle}</Link>
        </Logo>
        <LabelAuth center>Login</LabelAuth>
        <AvatarAuth><i className={USER_ICON} /></AvatarAuth>
        <LoginForm type={type} onSubmit={onSubmit}>
          <InputWrapper web={!isMobile}>
            <LabelAuth>EMAIL</LabelAuth>
            <InputWithIcon focus={focus === 'email' && true}>
              <Input
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setFocus('email')
                }} onBlur={(e) => {
                  setFocus('none')
                }}
                login
              />
              <i className={AT_ICON} />
            </InputWithIcon>
          </InputWrapper>
          <InputWrapper web={!isMobile}>
            <LabelAuth>First Name</LabelAuth>
            <InputWithIcon focus={focus === 'First Name' && true}>
              <Input
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => {
                  setFocus('First Name')
                }} onBlur={(e) => {
                  setFocus('First Name')
                }}
                login
              />
              <i className={AT_ICON} />
            </InputWithIcon>
          </InputWrapper>
          <InputWrapper web={!isMobile}>
            <LabelAuth>PASSWORD</LabelAuth>
            <InputWithIcon focus={focus === 'password' && true}>
              <Input
                value={password}
                placeholder='password'
                type='password'
                onFocus={() => {
                  setFocus('password')
                }}
                onBlur={(e) => {
                  setFocus('none')
                }}
                onChange={(e) => setPassword(e.target.value)}
                login
              />
              <i className={KEY_SKELETON_ICON_ALT} />
            </InputWithIcon>
          </InputWrapper>

          <InputWrapper web={!isMobile}>
            {
              errorLogin && <LoginError>Invalid credentials</LoginError>
            }
            <PrimaryButton top type='submit'>Register</PrimaryButton>
          </InputWrapper>
          <LinksWrapper>
            <Link to='./'> <ForgotPass>Forgot password?</ForgotPass> </Link>
            <Link to='./'> <NewPlayer><b>Register.</b></NewPlayer> </Link>
          </LinksWrapper>
        </LoginForm>

      </WrapperAuth>
    </PageContent>
  )
}

export default withRouter(RegisterView)
