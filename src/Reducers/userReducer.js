var actionTypes = require("../Actions/ActionTypes");

const initUser = {
  firstname: "",
  lastname: "",
  emailid: "",
  password: "",
  userLoggedIn: false,
  userMessage: "",
  location: "mumbai"
};

export default function userReducer(state = initUser, { type, payload }) {
  switch (type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        firstname: payload.firstname,
        lastname: payload.lastname,
        emailid: payload.emailid,
        password: payload.password,
        userLoggedIn: true,
        userMessage: "Logged In!"
      };

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        firstname: "",
        lastname: "",
        emailid: "",
        password: "",
        userLoggedIn: false,
        userMessage: "Logged out successfully!"
      };

    case actionTypes.INVALID_USER:
      return {
        ...state,
        emailid: payload.emailid,
        password: payload.password,
        userLoggedIn: false,
        userMessage: "Invalid Login Credentials!"
      };

    case actionTypes.SIGNUP_USER:
      return {
        ...state,
        emailid: payload.emailid,
        userLoggedIn: false,
        password: "",
        userMessage: payload.message
      };

    case actionTypes.LOCATION:
      return {
        ...state,
        location: payload
      };

    case actionTypes.ERROR:
      return { ...state, userLoggedIn: false, userMessage: payload.message };
    default:
      return state;
  }
}
