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
            <button type="button"
                    class="btn btn-primary btn-lg"
                    onClick = {() => {
                        API.resolveissue(this.props.resolveissue.issues).
                        then((response)=>{

                            console.log(response);

                        });
                        //
                        //this.props.history.push("/responsetoissues")
                    }
                    }

            >Resolve!</button>
        </div>
        );
    }
}



function mapStateToProps(state) {
    const resolveissue = state.resolveissue;

    return {resolveissue};
}


export default withRouter(connect(mapStateToProps, null)(Responsetoissues)) ;