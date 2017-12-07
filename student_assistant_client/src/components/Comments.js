import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Switch} from 'react-router-dom';
import ShowProfileData from './ShowProfileData';
import {connect} from 'react-redux';

class Comments extends Component{

    state ={
        comments:[]
    };

    componentWillMount(){
        API.comments(this.props.resolveissue.issues)
        .then((response)=>{

            console.log(response);
            this.setState({
                comments:response.response
            });

        });

    }

    display()
    {
        var array=this.state.comments;
        console.log(array);
        return array.map((comments,index) =>{

                return (
                    <div>
                        {comments.content}
                    </div>
                )

        })
    }

    render()
    {
        return(
            <div>
                <h2 class="table table-striped-jay">
                    {this.props.resolveissue.issues._id}
                    Comments
                    {this.display()}
                </h2>

            </div>
        );
    }
}



function mapStateToProps(state) {
    const resolveissue = state.comment;

    return {resolveissue};
}


export default withRouter(connect(mapStateToProps, null)(Comments)) ;