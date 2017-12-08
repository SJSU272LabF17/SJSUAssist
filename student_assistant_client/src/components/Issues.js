import React, {Component} from 'react';
import dropboxLogo from '../images/dropbox.png'
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import Profile from './Profile';
import ShowClosedIssues from './ShowClosedIssues';
import ShowOpenIssues from './ShowOpenIssues';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Dropdown
} from 'reactstrap';
import {connect} from 'react-redux';
import {setOpenIssues, setResolvedIssues} from '../action/userissues';
import {setSkills} from '../action/setskills';

class Issues extends Component {

    constructor(){
        super();
        this.state = {
            modal:false,
            skills:{},
            openIssues:[],
            closedIssues:[]
        };
    }

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    issueData = {
        skillname:"",
        issueContent:""
    };

    componentWillMount(){
        console.log(this.state);
        API.getSession().then((response)=>{
            if(response.status===201){
                console.log("session active");
                this.getOpenIssues();
                this.getSkillSets();
            }
            else if(response.status===203){
                this.props.handlePageChange("/");
            }
            else{
                console.log("Error");
            }
        });
    }

    getOpenIssues = (()=>{
        API.getOpenIssues().then((response)=>{
            console.log(response.status);
            if(response.status===201){
                response.json().then((data)=>{
                    let openIssues = [];
                    let closedIssues = [];
                    data.map((issue)=>{
                        if(issue.isopen){
                            this.props.setOpenIssues(issue);
                        }
                        else{
                            this.props.setResolvedIssues(issue);
                        }
                        return issue;
                    });
                    console.log(openIssues);
                    console.log(closedIssues);
                    console.log(data);

                    this.setState({
                        ...this.state,
                        openIssues : openIssues,
                        closedIssues : closedIssues
                    })
                });
            }
        });
    });

    getSkillSets = (()=>{
        API.getSkillSets().then((response)=>{
            if(response.status===201){
                response.json().then((data)=>{
                    this.props.setSkills(data);
                    /*this.setState({
                        ...this.state,
                        skills:data
                    })*/
                })
            }
            else if(response.status===204) {
                this.setState({
                    ...this.state,
                    skills:{}
                })
            }
            else {
                this.setState({
                    ...this.state,
                    message:"Error while fetching skills"
                })
            }
        });
    });

    submitIssue = (()=>{
        console.log(this.issueData);
        API.addIssue(this.issueData).then((response)=>{
            console.log(response.status);
            if(response.status===201){
                this.setState({
                    ...this.state,
                    showRaiseIssueTab : false
                });
                this.getOpenIssues();
                this.getSkillSets();
            }
        });
    });

    showRaiseIssueTabOnWindow = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className || "admin-modal"}>
                    <ModalHeader toggle={this.toggle}>Add Issue</ModalHeader>
                    <ModalBody>
                        Skills:
                        <select id="ddlSkills" className="dropdown" onChange={((event)=>{
                            // console.log(event.target.value);
                            // this.setState({
                            //     ...this.state.raiseIssue,
                            //     skillid : event.target.value
                            // });
                            this.issueData.skillname=event.target.value;
                        })
                        }>
                            <option>select</option>
                            {
                                this.props.state.skillset.map((item)=>{
                                    return(
                                        <option value={item.skillname}>
                                            {item.skillname}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <div>
                            <input type="text" id="txtIssueContent" placeholder="Enter Issue Content" onChange={((event)=>{
                                this.issueData.issueContent=event.target.value;
                                // this.setState({
                                //     ...this.state.raiseIssue,
                                //     issuecontent : event.target.value
                                // });
                            })}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <button onClick={(()=>{this.submitIssue()})}>
                                Submit Issue
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return(
                <span></span>
            )
        }
    });

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

        return (
            <div className="container-fluid">
                <div>
                    <button className="btn btn-primary" value="Raise Issue" onClick={(()=>{
                        this.toggle()
                    })}>
                        Raise Issue
                    </button>

                    {this.showRaiseIssueTabOnWindow()}

                    <hr/>
                    <div className="row">
                        <div className="row">
                            <h4 > My Open Issues </h4>
                            <hr/>
                            {
                                this.props.state.userIssues.openIssues.map((issue)=>{
                                    return(
                                        <ShowOpenIssues
                                            key={issue._id}
                                            issue={issue}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            <h4> Previously Resolved Issues </h4>
                            <hr/>
                            {
                                this.props.state.userIssues.resolvedIssues.map((issue)=>{
                                    return(
                                        <ShowClosedIssues
                                            key={issue._id}
                                            issue={issue}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        setOpenIssues : (data) => dispatch(setOpenIssues(data)),
        setResolvedIssues: (data) => dispatch(setResolvedIssues(data)),
        setSkills: (data) => dispatch(setSkills(data))
    };
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Issues));
