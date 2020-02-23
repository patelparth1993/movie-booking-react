import React from 'react';
import {connect} from 'react-redux'

import { signUpUser } from '../Actions/userActions'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../css/signup.css'

const validateFields=({formErrors})=>{
    let arr=[];
    arr=Object.values(formErrors).filter((value)=>{
        if(value.length>0){
            return 1;
        }
    })

    if(arr.length>0) return false;
    return true;
}

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstname:"",
            lastname:"",
            emailid:"",
            password:"",
            confPass:"",
            textClass:"hide",
            message:"",
            formErrors:{
                firstname:"",
                lastname:"",
                emailid:"",
                password:"",
                confPass:"",
            }
        }
    }

    getInput=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        let formErrors=this.state.formErrors;

        switch(name){
            case 'firstname':
                if(value.length<3){
                    formErrors.firstname="Minimum 3 characters are required"
                    document.getElementById(name).style.border="2px solid red"
                }else{
                    formErrors.firstname=""
                    document.getElementById(name).style.border="none"
                }
                break;
            case 'lastname':
                if(value.length<3){
                    formErrors.lastname="Minimum 3 characters are required"
                    document.getElementById(name).style.border="2px solid red"
                }else{
                    formErrors.lastname=""
                    document.getElementById(name).style.border="none"
                }
                break;
            case 'emailid':
                let emailPattern=/^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                formErrors.emailid=(emailPattern.test(value))?"":"Invalid email id format"
                break;
            case 'password':
                let passPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])(?=.{8,})/;
                if(!passPattern.test(value)){
                    formErrors.password="Password is too weak"
                    document.getElementById(name).style.border="2px solid red"
                }else{
                    formErrors.password=""
                    document.getElementById(name).style.border="none"
                }
                break;
            case 'confPass':
                if(this.state.password!==value){
                    formErrors.confPass="Passwords are not matching"
                    document.getElementById(name).style.border="2px solid red"
                }else{
                    formErrors.confPass=""
                    document.getElementById(name).style.border="none"
                }
            break;
            default:
                break;
        }

        this.setState({formErrors,[name]:value});
    }

    formSubmit=(e)=>{
        e.preventDefault();
        //validate if values are correct
        if(validateFields(this.state)){
            this.setState({
                message:"",
                textClass:"hide"
            })

            //validations are success, call signup API
            console.log('Submit data to API');
            this.props.registerUserProp({
                "firstname":this.state.firstname,
                "lastname":this.state.lastname,
                "emailid":this.state.emailid,
                "password":this.state.password
            })
        }else{
            this.setState({
                message:"Invalid Form data",
                textClass:"danger"
            })
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.user.userMessage==='User Created'){
            this.props.history.goBack();
        }
        return true;
    }

    render(){
        return (
            <React.Fragment>
                <div className="panel col-md-5 signup">
                    <div style={{textAlign:"center",color:"green",fontSize:"20px"}} >
                        Sign Up
                    </div>

                    <div className="panel-body signup">
                        <form onSubmit={this.formSubmit}>
                            <div className="form-group">
                                <label style={{color:"white"}}>First Name</label>
                                <input type="text" id="firstname" className="float-right inputsignup" 
                                       name="firstname" value={this.state.firstname}
                                       onChange={this.getInput} required />
                                
                                <div hidden={this.state.formErrors.firstname===""} 
                                     className="text text-danger float-right" 
                                     style={{position:"relative",top:"-3px",fontSize:"15px",height:"14px"}}>
                                    {this.state.formErrors.firstname}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{color:"white"}}>Last Name</label>
                                <input type="text" id="lastname" className="float-right inputsignup" 
                                       name="lastname" value={this.state.lastname}
                                       onChange={this.getInput} required />
                                
                                <div hidden={this.state.formErrors.lastname===""} 
                                     className="text text-danger float-right" 
                                     style={{position:"relative",top:"-3px",fontSize:"15px",height:"14px"}}>
                                    {this.state.formErrors.lastname}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{color:"white"}}>Email Id</label>
                                <input type="email" id="emailid" className="float-right inputsignup" 
                                       name="emailid" value={this.state.emailid}
                                       onChange={this.getInput} required />
                                
                                <div hidden={this.state.formErrors.emailid===""} 
                                     className="text text-danger float-right" 
                                     style={{position:"relative",top:"-3px",fontSize:"15px",height:"14px"}}>
                                    {this.state.formErrors.emailid}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{color:"white"}}>Password</label>
                                <input type="password" id="password" className="float-right inputsignup" 
                                       name="password" value={this.state.password}
                                       onChange={this.getInput} required />
                                
                                <div hidden={this.state.formErrors.password===""} 
                                     className="text text-danger float-right" 
                                     style={{position:"relative",top:"-3px",fontSize:"15px",height:"14px"}}>
                                    {this.state.formErrors.password}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{color:"white"}}>Confirm Password</label>
                                <input type="password" id="confPass" className="float-right inputsignup" 
                                       name="confPass" value={this.state.confPass}
                                       onChange={this.getInput} required />
                                
                                <div hidden={this.state.formErrors.confPass===""} 
                                     className="text text-danger float-right" 
                                     style={{position:"relative",top:"-3px",fontSize:"15px",height:"14px"}}>
                                    {this.state.formErrors.confPass}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success">Register</button>

                            <div className={`text text-${this.state.textClass}`} 
                                 style={{position:"relative",top:"-5px"}}>
                                {this.state.message}
                            </div>

                            <div className="text text-success">{this.props.user.userMessage}</div>

                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=>({
    user:state.user
})

const mapActionsToProps={
    registerUserProp:signUpUser
}

export default connect(mapStateToProps,mapActionsToProps)(Signup)