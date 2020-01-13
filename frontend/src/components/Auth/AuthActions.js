import axios from 'axios'
import { API_URL, clientConfig } from '../../config/constants'
import { makeAuthRequest } from '../../helpers/requestHelpers'
import { showSuccess } from '../Global/Toast'

export const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN'
export const REQUEST_AUTH_TOKEN_FAILED = 'REQUEST_AUTH_TOKEN_FAILED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

export const login = async (authContext, email, password, history) => {
  let response
  try {
    response = await axios({
      url: `${API_URL}/oauth2/token`,
      method: 'post',
      data: {
        ...clientConfig,
        username: email,
        password: password
      }
    }
    )
  } catch (err) {
    authContext.dispatch({
      type: REQUEST_AUTH_TOKEN_FAILED,
      payload: err.response.data
    })
  }
  if (response) {
    authContext.dispatch({
      type: REQUEST_AUTH_TOKEN,
      payload: response.data
    })
    history.push('/')
  }
}
export const logout = async ({ authContext, wizzardContext }) => {
  await makeAuthRequest({
    url: `${API_URL}/oauth2/logout`,
    method: 'post'
  }
  )(authContext)
  wizzardContext.dispatch({
    type: LOGOUT_SUCCESS
  })
  authContext.dispatch({
    type: LOGOUT_SUCCESS
  })
}
export const getUser = async (authContext) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/users/me`,
    method: 'get'
  })(authContext)
  if (response && response.data) {
    authContext.dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data
    })
  }
}
export const refreshToken = async (authContext) => {
  try {
    const response = await axios({
      url: `${API_URL}/oauth2/token`,
      method: 'post',
      data: {
        ...clientConfig,
        refresh_token: authContext.state.refresh_token,
        grant_type: 'refresh_token'
      }
    }
    )
    authContext.dispatch({
      type: REQUEST_AUTH_TOKEN,
      payload: response.data
    })
    return response.data
  } catch (e) {
    authContext.dispatch({
      type: REQUEST_AUTH_TOKEN_FAILED
    })
  }
}

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'
export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS'
export const UPDATE_USER_DETAILS_FAIL = 'UPDATE_USER_DETAILS_FAIL'

export const updateUserDetails = async ({ userId, data, authContext, onSuccess }) => {
  authContext.dispatch({
    type: UPDATE_USER_DETAILS
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users/${userId}`,
    method: 'put',
    data
  })(authContext)
  if (response && onSuccess) {
    onSuccess()
  }
  response && authContext.dispatch({
    type: UPDATE_USER_DETAILS_SUCCESS,
    payload: response.data
  })
  response && showSuccess('User Updated')
  !response && authContext.dispatch({
    type: UPDATE_USER_DETAILS_FAIL
  })
}