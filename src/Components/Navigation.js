import React from "react";
import { connect } from "react-redux";

import { logOutUser } from "./../Actions/userActions";
import { selectLocation } from "./../Actions/userActions";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser = () => {
    console.log("User logout action");
    this.props.logOutUserProp(this.props.user);
    // console.log(this.props);
  };

  changeLocation = event => {
    //console.log(event.target.value);
    this.props.locationChangeProp(event.target.value);
  };

  render() {
    return (
      <div className='nav navbar'>
        <div className='nav navbar-left' style={{ color: "white" }}>
          Infy Movie Booking App
        </div>
        <div className='nav navbar-right'>
          <button
            className='btn btn-danger'
            style={{
              height: "30px",
              paddingTop: "0px",
              position: "relative",
              right: "10px"
            }}
            onClick={this.logoutUser}
          >
            Logout
          </button>
          <i
            className='fa fa-map-marker'
            style={{
              color: "white",
              fontSize: "25px",
              position: "relative",
              right: "5px"
            }}
          ></i>
          <select defaultValue='mumbai' onChange={this.changeLocation}>
            <option value='mumbai'>Mumbai</option>
            <option value='delhi'>Delhi</option>
            <option value='banglore'>Banglore</option>
            <option value='chennai'>Chennai</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  logOutUserProp: logOutUser,
  locationChangeProp: selectLocation
};

export default connect(mapStateToProps, mapActionsToProps)(Navigation);
