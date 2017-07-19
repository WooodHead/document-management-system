import axios from 'axios';
import jwtDecode from 'jwt-decode';
import actionTypes from '../constants';

/**
 * loginError - login user error
 * @param {String}  error -report
 * @returns {Object} - action type and error message
 */
export function loginError(error) {
  return {
    type: actionTypes.LOGIN_USER_ERROR,
    error,
  };
}

/**
 * setLoggedInUser
 *
 * @export
 * @param {Object} user selected user data
 * @returns {Object} data
 */
export function setLoggedInUser(user) {
  return {
    type: actionTypes.LOGIN_USER,
    user,
  };
}


/**
 * Creates a new user details
 * @export registerUser
 * @param {object} user - user record to be created
 * @returns {Promise}  -  axios response
 */
export function registerUser(user) {
  return (dispatch) => {
    return axios.post('/api/users', user)
    .then((result) => {
      const token = result.data.token;
      localStorage.setItem('tokenize', token);
      axios.defaults.headers = { 'x-access-token': result.data.token };
      dispatch(setLoggedInUser(jwtDecode(token)));
    });
  };
}

/**
 * loginUser logs in a user
 * @export saveUser
 * @param {object} user - user record for authorization
 * @returns {Promise} - axios promise call
 */
export function loginUser(user) {
  return (dispatch) => {
    return axios.post('/api/users/login', user)
      .then((result) => {
        localStorage.setItem('tokenize', result.data.token);
        axios.defaults.headers = { 'x-access-token': result.data.token };
        dispatch(setLoggedInUser(jwtDecode(result.data.token)));
      });
  };
}

/**
 *
 * log user out and delete details from localStorage
 * @export
 * @returns {Object}
 */
export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('tokenize');
    axios.default.headers = {};
    dispatch(setLoggedInUser({}));
  };
}

/**
 * updateProfile updates a user profile
 * PUT /users/:id
 * @export updateProfile
 * @param {object} user
 * @returns {Promise} - axios promise
 */
export function updateProfile(user) {
  return (dispatch) => {
    return axios.put(`/api/users/${user.UserId}`, user)
      .then((res) => {
        dispatch({
          type: actionTypes.USER_RECORD_UPDATED,
          user: { ...user, ...res.data.data },
        });
      })
      .catch((err) => {
        dispatch(loginError({ message: 'error occurred please try again' }));
      });
  };
}

