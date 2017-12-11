import React, {Component} from 'react';
import * as API from '../api/API';
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
import {setSkills} from '../action/setskills';
import skillset from "../reducers/setskills_reducer";

class Profile extends Component{

    /*
    constructor(){
        super();
        this.state = {
            overview: "",
            work: "",
            education: "",
            contactinfo: "",
            lifeevent: "",
            music:false,
            reading:false,
            sports:false
        };
    }
    */
    constructor(){
        super();
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            gender: "",
            skillset: [],
            dateofbirth:"",
            studentid:"",
            modal : false
        };
    }

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !(this.state.modal)
        })
    });

    handleSubmitProfileChange = (()=> {
        console.log(this.state);
        API.changeProfile(this.state).then((response) => {
            if(response.status===201){
                console.log("Added successfully");
                this.props.handlePageChange("/user/profile");
            }
            else  if(response.status===203){
                this.props.handlePageChange("/home/login");
            }
            else  if(response.status===301){
                console.log("Error while adding profile data")
            }
        });
    });
    /* will add later */
    // Create one API CALL INSIDE COMPONENT WILL MOUNT
    // FROM THE RESPONSE SET THE STATE ACCORDING TO THE FETCHED VALUES
    // EXAMOLE THIS.STATE.skillseT
    // this.setState({
//     username: WHATEVER VALUES GET IN RESPONSE,
//     password:""
// });

    userdata = {

    };

    skillset = {
        skillId : ""
    };


    getUserSkillSet = (()=>{
        API.getSkillSets().then((response)=>{
            if(response.status===201){
                response.json().then((data)=>{
                    this.props.setSkills(data);
                });
            }
            else {
                console.log("Error");
            }
        });
    });

    getProfile = (()=>{
        API.getprofile().then((response)=>{
            if(response.status===201){
                this.getUserSkillSet();
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        username : data._id,
                        firstname : data.firstname,
                        lastname : data.lastname,
                        studentid : data.studentid,
                        gender : data.gender,
                        dateofbirth : data.dateofbirth,
                        skillset: data.skillset
                    });
                    // console.log("username:"+username);
                    console.log("username:"+this.state.username);
                    this.userdata = data;
                    console.log(this.userdata);
                });
            }
            else  if(response.status===203){
                this.props.handlePageChange("/home/login");
            }
            else  if(response.status===301){
                console.log("Error while fetching profile data")
            }
        });
    });

    componentWillMount(){
        this.getProfile();
    }


    showSkillSet = (()=>{
        return(
            <div className="form-group">
                <list class="list-inline">
                    <ul>
                        {
                            this.state.skillset.map((skill)=>{
                                return(

                                    <li>
                                        {skill._id}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </list>
            </div>
        )
    });

    showAddSkill = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className || "admin-modal"}>
                    <ModalHeader toggle={this.toggle}>Add Issue</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            Skills:
                            <select id="ddlSkills"  onChange={((event)=>{
                                this.skillset.skillId=event.target.value;
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
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <Button className="btn btn-info" onClick={(()=>{this.addSkill()})}>
                                Add
                            </Button>

                            <Button className="btn btn-info" onClick={(()=>{this.toggle()})}>
                                Cancel
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            )
        }
        else {

        }
    });

    addSkill = (()=>{
        console.log(this.skillset);
        API.addSkill(this.skillset).then((response)=>{
            console.log(response.status);
            if(response.status===201){
                this.getProfile();
                this.toggle();
            }
            else {
                console.log("Error");
            }
        });
    });

    render(){

        return(
            <div className="container-fluid">
                <div>
                    <Card className="col-sm-12 col-md-12 col-lg-12">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="form-group">
                                        <label className="text-justify h3">Profile</label><hr/>
                                    </div>

                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">Username:</label>
                                    </div>
                                    <div className="col-sm-5 col-md-5 col-lg-5 ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.username}
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">Firstname:</label>
                                    </div>
                                    <div className="col-sm-5 col-md-5 col-lg-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.firstname}
                                            onChange={(event) => {
                                                this.setState({
                                                    // ...this.state,
                                                    firstname: event.target.value
                                                });
                                                this.userdata.firstname = event.target.value;
                                                console.log(this.userdata.firstname);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">Lastname:</label>
                                    </div>
                                    <div className="col-sm-5 col-md-5 col-lg-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.lastname}
                                            onChange={(event) => {
                                                this.setState({
                                                    // ...this.state,
                                                    lastname: event.target.value
                                                });
                                                this.userdata.lastname = event.target.value;
                                                console.log(this.userdata.lastname);
                                            }}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">Gender:</label>
                                    </div>
                                    <div className="col-sm-5 col-md-5 col-lg-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.gender}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">DOB:</label>
                                    </div>
                                    <div className="col-sm-5 col-md-5 col-lg-5">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={this.state.dateofbirth}
                                            id="txtlifeevents"
                                            onChange={(event) => {
                                                this.setState({
                                                    // ...this.state,
                                                    dateofbirth: event.target.value
                                                });
                                                this.userdata.dateofbirth = event.target.value;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        <label className="form-horizontal form-control-static">Skill Sets:</label>
                                    </div>
                                </div>
                                <div className="col-sm-5 col-md-5 col-lg-5">
                                    {
                                        this.showSkillSet()
                                    }
                                </div>
                            </div>

                            {
                                this.showAddSkill()
                            }
                            <div className="form-group">
                                <input className="btn btn-primary" type="button" onClick={(()=>{this.toggle()})}  value="Add Skills"/>
                            </div>
                            <div className="form-group">
                                <input type="button" className="btn btn-primary" value="Save" onClick={(()=>{this.handleSubmitProfileChange()})}/>
                            </div>
                        </form>
                    </Card>
                </div>



                {/*<label>Interest</label><hr/>*/}
                {/*<div className="form-group">*/}
                {/*<input type="checkbox" name="interest" value="Music" />Music*/}
                {/*<input type="checkbox" value="Sports" name="interest"/>Sports*/}
                {/*<input type="checkbox" value="Reading" name="interest"/>Reading*/}
                {/*</div><br/>*/}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSkills: (data) => dispatch(setSkills(data)),
    };
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);