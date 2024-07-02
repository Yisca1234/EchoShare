import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actionTypes';

import { userRequest } from '../user/actions.js';
import apiClient from '../../utils/apiClient.js'



export const logoutRequest = () => ({
  type: LOGOUT,
});


export const registerSuccess = (userEmail) => ({
  type: REGISTER_SUCCESS,
  payload: {userEmail },
});


export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: { error},
});


export const loginSuccess = (userEmail) => ({
  type: LOGIN_SUCCESS,
  payload: {userEmail},
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {error: error || 'Network error'},
});


export const login = (useremail, password) => async (dispatch) => {
  try {
    const response = await apiClient.post('/login', { useremail, password });

    try {
      sessionStorage.setItem('jwtToken', response.data.token);
    } catch (e) {
      
    }  


    await dispatch(loginSuccess(response.data.userEmail));
    await dispatch(userRequest(response));
    
    // localStorage.setItem('authToken', response.data.token);

  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    
  }
};




export const logoutAction = () => async (dispatch) => {
  await sessionStorage.removeItem('jwtToken');
  await dispatch(logoutRequest());
}





export const register = (emailUser, password) => async (dispatch) => {
  try {
    const response = await apiClient.post('/signup', { emailUser, password });

    sessionStorage.setItem('jwtToken', response.data.token);
  
    await dispatch(registerSuccess(response.data.emailUser));
    await dispatch(userRequest(response));

    
  } catch (error) {
    //console.log(error.response.data.message);
    await dispatch(registerFailure(error.response.data.message));
    
  }
};

// export const register = (username, password) => {
//   return async (dispatch) => {
//     dispatch(registerRequest());

//     try {
//       // Simulate API call for registration
//       const response = await fakeRegisterAPI(username, password, email);
//       dispatch(registerSuccess(response.user));
//     } catch (error) {
//       dispatch(registerFailure(error.message));
//     }
//   };
// };

// Thunk action for login (with asynchronous logic)
// export const login = (username, password) => {
//   return async (dispatch) => {
//     dispatch(loginRequest());

//     try {
//       // Simulate an API call to authenticate
//       const response = await fakeLoginAPI(username, password);
//       dispatch(loginSuccess(response.token, response.user));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };
// };

// export const loginRequest = () => ({
//   type: LOGIN_REQUEST,
// });