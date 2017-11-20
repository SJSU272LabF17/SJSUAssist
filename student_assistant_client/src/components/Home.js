import React, {Component} from 'react';
import dropboxLogo from '../images/dropbox.png'
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import Profile from './Profile';
import Activity from './Activity';
import EditProfile from './EditProfile';
import {connect} from 'react-redux';
import {getIssue} from '../action/openissuelist';


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

    // Jay Desai Changes for fetching open issue list
    componentDidMount(){
        var payload;
        var results_for_reducer =[];
        API.currentissuelist(payload).
        then((response)=>{

            console.log(response);
            results_for_reducer = response.issue_raised_array_final;
            console.log(results_for_reducer);

            // Update the reducers
            this.props.getIssue(results_for_reducer);

            });
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

        return (
            <div className="container-fluid">

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIssue : (data) => dispatch(getIssue(data)),

    };
}

export default connect(null, mapDispatchToProps)(User);

//export default User;