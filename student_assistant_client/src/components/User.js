import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import Profile from './Profile';
import Activity from './Activity';
import Home from './Home';
import Issues from './Issues';
import home from '../images/homeee.svg'
import id from '../images/user2.svg'
import disc from '../images/id-card.svg'
import activity from '../images/notebook.svg'
import logout from '../images/logout.svg'



class User extends Component {

    constructor(){
        super();
        this.state = {
        };
    }



    componentWillMount(){
        console.log(this.state);
        API.getSession().then((response)=>{
            if(response.status===201){
                console.log("session active");
            }
            else if(response.status===203){
                this.props.handlePageChange("/");
            }
            else{
                console.log("Error");
            }
        });
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    componentWillUpdate(){
        // this.fetchDirectoryData(this.state.dirpath);
    }

    shouldComponentUpdate(){
        return true;
    }

    render() {

        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {

                let dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };

        return (
            <div className="container-fluid">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="row" height="50" align="right">
                            <div  align="left" style={{marginLeft:"70%"}}>
                                <a className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/user/profile")})}>
                                    <img src={id} width="50" height="60" alt="Home" align="right"/>
                                </a>
                                <a className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/user/activity")})}>
                                    <img src={activity} width="50" height="37" alt="Home" align="right"/>
                                </a>

                                <a className="btn btn-link" onClick={(()=>{this.props.handleLogout()})}>
                                    <img src={logout} width="50" height="37" alt="Home" align="right"/>
                                </a>

                            </div>
                        </div>
                        <br/>
                        <div className="row" >
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1" align="left">
                                <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                                    <ul class="nav nav-pills flex-column">
                                        <li class="nav-item">
                                            <button className="btn-link" onClick={(()=>{this.props.handlePageChange("/user/home")})}>
                                                <img src={home} width="50" height="50" alt="Home" align="left"/>
                                            </button>
                                        </li>
                                        <li class="nav-item">
                                            <button className="btn-link" onClick={(()=>{this.props.handlePageChange("/user/issues")})}>
                                                <img src={disc} width="50" height="50" alt="Issues" align="left"/>
                                                </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                <Switch>
                                    <Route path="/user/home" render={() => (
                                        <div>
                                            <Home
                                                username={this.props.username}
                                                handlePageChange={this.props.handlePageChange}
                                                redirectToFile = {this.redirectToFile}
                                                handleShare = {this.handleShare}
                                                handleFileDownload = {this.handleFileDownload}
                                            />
                                        </div>
                                    )}/>
                                    <Route path="/user/issues" render={() => (
                                        <div>
                                            <Issues
                                                handlePageChange={this.props.handlePageChange}
                                                handleShare = {this.handleShare}
                                                handleFileDownload = {this.handleFileDownload}
                                            />
                                        </div>
                                    )}/>
                                    <Route path="/user/profile" render={() => (
                                        <div>
                                            <Profile
                                                username={this.props.username}
                                                handlePageChange={this.props.handlePageChange}
                                            />
                                        </div>
                                    )}/>
                                    <Route path="/user/activity" render={() => (
                                        <div>
                                            <Activity
                                                username={this.props.username}
                                                handlePageChange={this.props.handlePageChange}
                                            />
                                        </div>
                                    )}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(User);