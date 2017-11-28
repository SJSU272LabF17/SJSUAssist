import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Switch} from 'react-router-dom';
import ShowProfileData from './ShowProfileData';

class Profile extends Component{

    constructor(){
        super();
        this.state = {
            profiledata : {
                username: "",
                firstname: "",
                lastname: "",
                gender: "",
                skillset: ""
            },
            recprofiledata:[]
        };
    }

    componentWillMount(){
        API.getprofile().then((response)=>{
            if(response.status===201){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        ...this.state.recprofiledata,
                        recprofiledata : data
                    });
                    this.props.handlePageChange("/user/profile");
                });
            }
            else  if(response.status===203){
                this.props.handlePageChange("/home/login");
            }
            else  if(response.status===301){
                console.log("Error while fetching profile data")
            }
        });
    }

    render(){

        return(
            <div className="container-fluid">
                <Switch>
                    <Route path="/user/profile" render={() => (
                        <div>

                            <div>
                                {
                                    this.state.recprofiledata.map((item, index)=>{
                                        return(<ShowProfileData
                                            key={index}
                                            item={item}
                                        />)
                                    })
                                }
                                <div className="col-lg-offset-8 col-md-offset-8 col-sm-offset-8 col-sm-1 col-md-1 col-lg-1">
                                    <input type="button" id="btnoverviewedit" value="Edit" className="btn btn-primary"
                                           onClick={(()=>{
                                               this.props.history.push("/user/editprofile");
                                           })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}/>

                </Switch>

                {/*<label>Interest</label><hr/>*/}
                {/*<div className="form-group">*/}
                {/*<input type="checkbox" name="interest" value="Music" />Music*/}
                {/*<input type="checkbox" value="Sports" name="interest"/>Sports*/}
                {/*<input type="checkbox" value="Reading" name="interest"/>Reading*/}
                {/*</div><br/>*/}
            </div>
        );
    }
}


export default withRouter(Profile);