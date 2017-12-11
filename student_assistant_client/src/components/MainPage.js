import React, {Component} from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import * as API from '../api/API';
import Login from './Login';
import User from './User';
import {setOpenIssues, setResolvedIssues} from "../action/userissues";
import {connect} from 'react-redux';
import Responsetoissues from './Responsetoissues'
import Comments from './Comments'
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../alertConfig";

class MainPage extends Component {

    state={
        isLoggedIn:false,
        username:"",
        message:""
    };

    handleSignUp=((userdata)=>{
        console.log(userdata);

        API.doSignUp(userdata)
            .then((status) => {

                console.log(status);

                if (status === 201) {
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: "You have successfully signed up. Please login here",
                        username: userdata.username
                    });
                    showAlert("Successfully signed up!","info",this);
                    this.handlePageChange("/home/login")
                } else if (status === 401) {
                    console.log("State");
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error while adding userdata"
                    });
                    // this.props.history.push("/signup")
                    showAlert("Please Enter Valid data","error",this);
                }
                else if(status === 301){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Email Id already exists. Try to sign up with another Email Id"
                    });
                    showAlert("Email Id already exist","error",this);
                    // this.props.history.push("/signup")
                }
                else
                {
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error while signing up."
                    });
                    showAlert("Something went wrong","error",this);
                }
            });
    });

    handleLogin=((loginData)=>{
        console.log(loginData);

        API.doLogin(loginData)
            .then((status) => {
                if(status===201){
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: ("Welcome to my App " + loginData.username),
                        username: loginData.username
                    });
                    showAlert("Login Successful","info",this);
                    sessionStorage.setItem('username',loginData.username);
                    this.handlePageChange("/user/home")
                }
                else if(status===301){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "username or password is invalid"
                    });
                    showAlert("Invalid Id or Password","error",this);
                    // this.props.history.push("/login")
                }
                else if(status===401){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error on server side while fetching data"
                    });
                    showAlert("Server is down, Please try after some time","error",this);
                    // this.props.history.push("/login")
                }
            });
    });

    handleLogout=(()=>{
        API.doLogout()
            .then((status) => {
                if(status===201){
                    sessionStorage.removeItem('username');
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "User Logged out"
                    });
                    showAlert("Logged out Successfully","info",this);
                    this.props.setOpenIssues([]);
                    this.props.setResolvedIssues([]);
                    this.handlePageChange("/");
                }
                else if(status===401){
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: "Error on server side while fetching data"
                    });
                    showAlert("Something went wrong","error",this);
                }
            });
    });

    handlePageChange=((page)=>{
        this.props.history.push(page);
    });

    doesSessionExist = (()=>{
        API.getSession().then((response) => {
           if(response.status === 201){
               response.json().then((data) => {
                    this.setState({
                        ...this.state,
                        isLoggedIn : true,
                        username : data.username
                    })
               });
               this.props.history.push("/user/home");
           }
           else if(response.status === 203) {
               this.setState({
                   ...this.state,
                   isLoggedIn : false,
                   username : ""
               });
               this.props.history.push("/home/signup");
           }
        });
    });

    render(){
        return(
            <div>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                <Switch>
                    <Route exact path="/" render={() =>(
                        <div>
                            {this.doesSessionExist()}
                        </div>
                    )}/>

                    <Route path="/home" render={() => (
                        <div>
                            <div className="container-fluid">
                                <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
                                    <div className="row">
                                        <div className= "col-lg-1 col-md-1 col-xs-1 col-sm-1" id="logo">
                                        
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7 col-xs-7 col-md-7 col-sm-7">
                                        </div>
                                        <div className="col-lg-5 col-xs-5 col-md-5 col-sm-5">
                                            <Switch>
                                                <Route path= "/home/signup" render={() => (
                                                    <div>
                                                        <SignUp
                                                            handleSignUp={this.handleSignUp}
                                                            handlePageChange={this.handlePageChange}
                                                        />
                                                    </div>
                                                )}/>
                                                <Route path="/home/login" render={() => (
                                                    <div>
                                                        <Login
                                                            handleLogin={this.handleLogin}
                                                            handlePageChange={this.handlePageChange}
                                                        />
                                                    </div>
                                                )}/>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}/>
                    <Route path="/user" render={() => (
                        <div>
                            <User
                                username={this.state.username}
                                handleLogout={this.handleLogout}
                                handlePageChange={this.handlePageChange}
                                doesSessionExist={this.doesSessionExist}
                            />
                        </div>
                    )}/>

                    <Route path="/responsetoissues" render={() => (
                        <div>
                            <Responsetoissues/>
                        </div>
                    )}/>

                    <Route path="/comments" render={() => (
                        <div>
                            <Comments/>
                        </div>
                    )}/>
                </Switch>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setOpenIssues : (data) => dispatch(setOpenIssues(data)),
        setResolvedIssues: (data) => dispatch(setResolvedIssues(data)),
    };
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));