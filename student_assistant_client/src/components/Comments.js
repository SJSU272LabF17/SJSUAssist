import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {updatecomment} from '../action/UpdateComment'
import chat from '../images/chat.svg'


class Comments extends Component{

    state ={
        comments:[],
        newcomment:''
    };

    componentWillMount(){
        API.comments(this.props.resolveissue.issues)
        .then((response)=>{

            console.log(response);
            if(response.response.length ===0 )
            {
                var temp=[];
                this.setState({
                    comments:temp
                });
                this.props.updatecomment(temp);

            }
            else {
                this.setState({
                    comments:response.response[0].comments
                });

                this.props.updatecomment(response.response[0].comments);

            }


        });

    }

    display()
    {
        var styles = {
            'border-bottom': '1px solid lightblue',
            'background-color': '#f2f2f2'
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

                                    {comments.userid}
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
                            <div className="col-lg-4 col-md-4">
                            </div>
                            <div className="col-lg-5 col-md-5">
                                {comments.content}
                            </div>
                            <div className="col-lg-3 col-md-3">
                            </div>

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
                <div class="form-group">

                    <div className="col-lg-5 col-md-5">
                    </div>

                    <div className="col-lg-6 col-md-6">
                    <textarea class="form-control"
                              id="exampleFormControlTextarea1"
                              placeholder="Add a comment"
                              rows="3"
                              value={this.state.newcomment}
                              onChange={(event) => {
                                  this.setState({
                                      newcomment: event.target.value
                                  });
                              }}
                    >

                    </textarea>
                        <br/>
                        <div align="right">
                        <button type="button"
                                align="right"
                                onClick = {() => {
                                    var payload={};
                                    payload.id=this.props.resolveissue.issues._id;
                                    payload.newcomment=this.state.newcomment;
                                    API.addcomments(payload)
                                        .then((response)=>{
                                            console.log(response);
                                            this.setState({
                                                newcomment: ''
                                            });

                                        });

                                    API.comments(this.props.resolveissue.issues)
                                        .then((response)=>{

                                            console.log(response);
                                            if(response.response.length ===0 )
                                            {
                                                var temp=[];
                                                this.setState({
                                                    comments:temp
                                                });
                                                this.props.updatecomment(temp);

                                            }
                                            else {
                                                this.setState({
                                                    comments:response.response[0].comments
                                                });

                                                this.props.updatecomment(response.response[0].comments);

                                            }


                                        });
                                }
                                }

                        > <img src={chat} width="50" height="30" alt="Home" align="right"/></button>
                        </div>
                    </div>

                    <div className="col-lg-1 col-md-1">
                    </div>
                </div>


            </div>
        );
    }
}



function mapStateToProps(state) {
    const resolveissue = state.comment;

    return {resolveissue};
}

function mapDispatchToProps(dispatch) {
    return {
        updatecomment : (data) => dispatch(updatecomment(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments)) ;