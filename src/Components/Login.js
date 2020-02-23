import React from "react";
import { connect } from "react-redux";

import { validateUser } from "../Actions/userActions";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      emailid: this.props.user.emailid,
      password: "",
      textClass: "hide"
    };
  }

  getInput = e => {
    const field = e.target.name;
    const value = e.target.value;
    if (value === "") {
      this.setState({
        message: `${field} is required`,
        textClass: "danger",
        [field]: ""
      });
    } else {
      this.setState({ [field]: value, textClass: "hide", message: "" });
    }
  };

  validateUser = () => {
    //call user login action
    this.props.validateUserProp(
      {
        emailid: this.state.emailid,
        password: this.state.password
      },
      //console.log(this.props)
      this.props.history.push("/movies")
    );
  };

  navigateToSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div className='panel col-md-5'>
        <div
          className='text text-success'
          hidden={this.props.user.userMessage === ""}
        >
          {this.props.user.userMessage}
        </div>

        <div
          className='panel-heading'
          style={{ textAlign: "center", color: "white" }}
        >
          <h5>Login</h5>
        </div>
        <div className='panel-body'>
          <div className='form-group'>
            <label style={{ color: "white" }}>EmailId</label>
            <input
              type='email'
              className='form-control'
              name='emailid'
              value={this.state.emailid}
              onChange={this.getInput}
              required
            />
          </div>

          <div className='form-group'>
            <label style={{ color: "white" }}>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={this.state.password}
              onChange={this.getInput}
              required
            />
          </div>

          <div
            className={`text text-${this.state.textClass}`}
            style={{ position: "relative", top: "-5px" }}
          >
            {this.state.message}
          </div>

          <button
            className='btn btn-success'
            onClick={this.validateUser}
            disabled={this.state.emailid === "" || this.state.password === ""}
          >
            Login
          </button>

          <button
            className='btn btn-primary'
            style={{ position: "relative", left: "5px" }}
            onClick={this.navigateToSignup}
          >
            Sign Up
          </button>

          <div
            style={{ color: "green", position: "relative", top: "5px" }}
            hidden={
              !(
                this.props.user.emailid !== "" && !this.props.user.userLoggedIn
              ) || this.props.user.userMessage !== ""
            }
          >
            User does not exists. Please Sign Up!!
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  validateUserProp: validateUser
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
