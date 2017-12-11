import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class Responsetoissues extends Component{

    render()
    {
        return(
        <div>
            <div class="table table-striped-jay">
                <h2>
                Response to the issue
                </h2>
                <br/>
                <br/>

                <h4>
                Issue id#
                </h4>
                {this.props.resolveissue.issues._id}
                <br/>
                <h4>
                    Issue Topic:
                </h4>
                {this.props.resolveissue.issues.topic}
                <br/>
                <h4>
                    Issue Content:
                </h4>
                {this.props.resolveissue.issues.issuecontent}

            </div>
            <button type="button"
                    class="btn btn-primary btn-lg"
                    onClick = {() => {
                        API.resolveissue(this.props.resolveissue.issues).
                        then((response)=>{

                            console.log(response);

                        });
                        //
                        this.props.history.push("/")
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