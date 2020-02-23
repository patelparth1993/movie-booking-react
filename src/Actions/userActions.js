var axios = require("axios");
var actionTypes = require("./ActionTypes");

function validateUser(user) {
  return dispatch => {
    axios.post("http://localhost:1020/login", user).then(response => {
      if (response.data.UserFound) {
        user.firstname = response.data.UserData.firstname;
        user.lastname = response.data.UserData.lastname;

        dispatch({
          type: actionTypes.LOGIN_USER,
          payload: user
        });
      } else {
        dispatch({
          type: actionTypes.INVALID_USER,
          payload: user
        });
      }
    });
  };
}

function signUpUser(userData) {
  return dispatch => {
    axios.post("http://localhost:1020/signup", userData).then(response => {
      console.log(response);
      if (response.data.message === "User Created") {
        userData.message = "User Created";

        dispatch({
          type: actionTypes.SIGNUP_USER,
          payload: userData
        });
      } else {
        userData.message = response.data.message;

        dispatch({
          type: actionTypes.ERROR,
          payload: userData
        });
      }
    });
  };
}

function logOutUser(user) {
  return {
    type: actionTypes.LOGOUT_USER
  };
}

function selectLocation(location) {
  return {
    type: actionTypes.LOCATION,
    payload: location
  };
}

module.exports = { validateUser, signUpUser, logOutUser, selectLocation };
