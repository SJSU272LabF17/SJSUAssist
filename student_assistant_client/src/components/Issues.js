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
import {setOpenIssues, setResolvedIssues, addOpenIssues, addResolvedIssues} from '../action/userissues';
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
        skillId:"",
        issueContent:""
    };

    componentWillMount(){
        console.log(this.state);
        API.getSession().then((response)=>{
            if(response.status===201){
                console.log("session active");
                this.getUserIssues();
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

    getUserIssues = (()=>{
        API.getUserIssues().then((response)=>{
            console.log(response.status);
            if(response.status===201){
                response.json().then((data)=>{

                    let openIssues = [];
                    let closedIssues = [];
                    this.props.setOpenIssues(data.openIssues);
                    this.props.setResolvedIssues(data.resolvedIssues);
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
                response.json().then((data)=>{
                    this.props.addOpenIssues(data);
                });
            }
            else {
                console.log("Error");
            }
            this.toggle();
        });
    });

    resolveIssue = ((issue)=>{
       API.resolveIssue().then((response)=>{
          console.log(response.status);
          if(response.status===201){
              this.props.addResolvedIssues(issue);
          }
          else {
              console.log("Error");
          }
       });
    });

    showRaiseIssueTabOnWindow = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className || "admin-modal"}>
                    <ModalHeader toggle={this.toggle}>Add Issue</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            Skills:
                            <select id="ddlSkills"  onChange={((event)=>{
                                this.issueData.skillId=event.target.value;
                            })}>
                                <option>select</option>
                                {
                                    this.props.state.skillset.map((item)=>{
                                        return(
                                            <option value={item._id}>
                                                {item._id}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <div>
                            <textarea className="form-control" id="txtIssueContent" placeholder="Enter Issue Content" onChange={((event)=>{
                                this.issueData.issueContent=event.target.value;
                                // this.setState({
                                //     ...this.state.raiseIssue,
                                //     issuecontent : event.target.value
                                // });
                            })}/>
                            </div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <Button className="btn btn-info" onClick={(()=>{this.submitIssue()})}>
                                Submit Issue
                            </Button>
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
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <Card >
                                <CardHeader>
                                    <h4 > My Open Issues </h4>
                                </CardHeader>
                                <CardBody>
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
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <Card>
                                <CardHeader>
                                    <h4> Previously Resolved Issues </h4>
                                </CardHeader>
                                <CardBody>
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
                                </CardBody>
                            </Card>
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
        setSkills: (data) => dispatch(setSkills(data)),
        addOpenIssues: (data) => dispatch(addOpenIssues(data)),
        addResolvedIssues: (data) => dispatch(addResolvedIssues(data))
    };
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Issues));
