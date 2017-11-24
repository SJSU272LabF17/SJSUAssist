import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Switch} from 'react-router-dom';
import ShowProfileData from './ShowProfileData';
import {connect} from 'react-redux';

class Responsetoissues extends Component{

    render()
    {
        return(
        <div>
            <h2 class="table table-striped-jay">
                {this.props.resolveissue.issues._id}
                <br/>
                {this.props.resolveissue.issues.topic}
                <br/>
                {this.props.resolveissue.issues.issuecontent}
                <br/>
                {this.props.resolveissue.issues.isopen}
            </h2>
        </div>
        );
    }
}



function mapStateToProps(state) {
    const resolveissue = state.resolveissue;

    return {resolveissue};
}


export default withRouter(connect(mapStateToProps, null)(Responsetoissues)) ;