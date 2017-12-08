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
                comments:response.response[0].comments
            });

        });

    }

    display()
    {
        var styles = {
            'border-bottom': '1px solid lightblue'
        };
        var array=this.state.comments;
        console.log(array);
        return array.map((comments,index) =>{

                return (
                    <div>
                    <div style={styles} >
                        <div  className="row">
                            <div className="col-lg-7 col-md-7">
                                <h5>
                                UserID
                                </h5>
                            </div>
                            <div className="col-lg-2 col-md-2">

                            </div>
                            <div className="col-lg-3 col-md-3">
                            </div>

                        </div>
                        <div  className="row">
                        </div>
                        <div  className="row">
                        {comments.content}
                        </div>

                    </div>
                    </div>
                )

        })
    }

    render()
    {
        var styles = {
            background:'white'
        };

        return(
            <div>
            <div style={styles}>
                <h2>
                    Comments

                </h2>
                <h4>
                {this.display()}
                </h4>
            </div>
                <textarea class="span6" rows="3" placeholder="What's up?" required></textarea>


            </div>
        );
    }
}



function mapStateToProps(state) {
    const resolveissue = state.comment;

    return {resolveissue};
}


export default withRouter(connect(mapStateToProps, null)(Comments)) ;