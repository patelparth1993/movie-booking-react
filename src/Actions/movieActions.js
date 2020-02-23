var actionTypes = require("../Actions/ActionTypes");
var axios = require("axios");

function getMovies(location) {
  return dispatch => {
    axios.get("http://localhost:1020/movies/" + location).then(response => {
      //console.log(response.data);
      dispatch({
        type: actionTypes.MOVIES,
        payload: response.data
      });
    });
  };
}

module.exports = { getMovies };
