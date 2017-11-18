import React, {Component} from 'react';
import dropboxLogo from '../images/dropbox.png'
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import Profile from './Profile';
import ShowClosedIssues from './ShowClosedIssues';
import ShowOpenIssues from './ShowOpenIssues';
import ShowSkillsInDropDown from './ShowSkillsInDropdown';
class Issues extends Component {

    constructor(){
        super();
        this.state = {
            showRaiseIssueTab:false,
            skills:{},
            openIssues:[],
            closedIssues:[]
        };
    }

    issueData = {
        skillId:"",
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
                            openIssues.push(issue);
                        }
                        else{
                            closedIssues.push(issue);
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
                    this.setState({
                        ...this.state,
                        skills:data
                    })
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
        if(this.state.showRaiseIssueTab){
            return(
                <div>
                    Skills:
                    <select id="ddlSkills" className="dropdown" onChange={((event)=>{
                        // console.log(event.target.value);
                        // this.setState({
                        //     ...this.state.raiseIssue,
                        //     skillid : event.target.value
                        // });
                        this.issueData.skillId=event.target.value;
                    })
                    }>
                        <option>select</option>
                        {
                            this.state.skills.map((item)=>{
                                return(
                                    <ShowSkillsInDropDown
                                        key={item._id}
                                        item={item}
                                        // skillsSelectedToRaiseIssue = {this.skillsSelectedToRaiseIssue}
                                    />

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
                    <div>
                        <button onClick={(()=>{this.submitIssue()})}>
                            Submit Issue
                        </button>
                    </div>
                </div>
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
                        this.setState({
                            ...this.state,
                            showRaiseIssueTab:true
                        });
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
                                this.state.openIssues.map((issue)=>{
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
                                this.state.closedIssues.map((issue)=>{
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

export default Issues;