import React, {Component} from 'react';
import '../public/scooter.css';
import {connect} from 'react-redux';
import {useractivity} from '../action/index'
import * as API from '../api/api';
import {activity} from '../action/index'

class Useractivity extends Component{

    state =
        {
            Email:'',
            fname:'',
            lname:'',
            work:'',
            education:'',
            contact:'',
            Music:'',
            Show:'',
            Sports:''
        }

    componentDidMount(){
        var temp1;
        API.useractivity()
            .then(
                (response) =>{
                    //this.props.filedisplay(response.display)
                    temp1 = response.display;

                    this.setState({
                        Email: temp1[0].userid,
                        fname:temp1[0].fname,
                        lname:temp1[0].lname,
                        work:temp1[0].work,
                        education:temp1[0].education,
                        contact:temp1[0].contact,
                        Music:temp1[0].Music,
                        Show:temp1[0].shows,
                        Sports:temp1[0].sports
                    });
                }
            );

        API.activity()
            .then((response) =>{
                this.props.activity(response.display);
            });
    }

    activity(){
        return this.props.itemArr.map((todo,index) =>{
            return(
                <tr>
                    <td>
                        {todo.items.activity}
                    </td>
                    <td>
                        {todo.items.filename}
                    </td>
                    <td>
                        {todo.items.date}
                    </td>
                </tr>
            );
        })
    }
    render()
    {
        return(

            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">
                    <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" >
                        <div class="c-banner" id="logoheight">

                            <svg class="maestro-nav__logo" aria-label="Home" role="img" width="32px" height="32px" viewBox="0 0 32 32" data-reactid="12">
                                <g fill="#007ee5">
                                    <path d="M9.416 1l6.59 5.476-9.495 5.838L0 7.122 9.416 1zM0 17.505l6.51-5.191 9.495 5.837-6.589 5.476L0 17.505zm16.005.646l9.495-5.837 6.511 5.191-9.416 6.122-6.59-5.476zM32.011 7.122l-6.51 5.192-9.496-5.838L22.595 1l9.416 6.122zM16.005 19.571L22.685 25l2.857-1.828v2.049l-9.537 5.603L6.47 25.22v-2.05L9.327 25l6.678-5.43z" fill-rule="evenodd" data-reactid="13">

                                    </path>
                                </g>
                            </svg> <br/>


                        </div>
                    </div>
                    <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10">
                        <div className="col-sm-4 col-lg-4 col-md-4 col-xs-4">
                            <p className="f2">User Info</p>
                            <form>
                                <label class="c-label">
                                    Email address
                                    <input class="c-input"
                                           placeholder="drew@dropbox.com"
                                           type="text"
                                           value = {this.state.Email}
                                           onChange={(event) => {
                                               this.setState({
                                                   Email: event.target.value
                                               });
                                           }}/>
                                </label>
                                <div class="o-grid">

                                    <div class="o-grid__col o-grid__col--1-of-2">
                                        <label class="c-label">
                                            First Name
                                            <input class="c-input"
                                                   placeholder="Firstname."
                                                   type="text"
                                                   value = {this.state.fname}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           fname: event.target.value
                                                       });
                                                   }}
                                            />
                                        </label>
                                    </div>

                                    <div class="o-grid__col o-grid__col--1-of-2">
                                        <label class="c-label">
                                            Last name
                                            <input class="c-input"
                                                   placeholder="Lastname"
                                                   type="text"
                                                   value = {this.state.lname}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           lname: event.target.value
                                                       });
                                                   }}/>
                                        </label>
                                    </div>
                                </div>
                                <label class="c-label">
                                Work
                                <input class="c-input"
                                       placeholder="Work"
                                       type="text"
                                       value = {this.state.work}
                                       onChange={(event) => {
                                           this.setState({
                                               work: event.target.value
                                           });
                                       }}/>
                                </label>
                                <label class="c-label">
                                    Education
                                    <input class="c-input"
                                           placeholder="Education"
                                           type="text"
                                           value = {this.state.education}
                                           onChange={(event) => {
                                               this.setState({
                                                   education: event.target.value
                                               });
                                           }}/>
                                </label>
                                <label class="c-label">
                                    Contact Info
                                    <input class="c-input"
                                           placeholder="Contact"
                                           type="text"
                                           value = {this.state.contact}
                                           onChange={(event) => {
                                               this.setState({
                                                   contact: event.target.value
                                               });
                                           }}/>
                                </label>
                                <label class="c-label">
                                    Music
                                    <input class="c-input"
                                           placeholder="Music"
                                           type="text"
                                           value = {this.state.Music}
                                           onChange={(event) => {
                                               this.setState({
                                                   Music: event.target.value
                                               });
                                           }}/>
                                </label>
                                <label class="c-label">
                                    Show
                                    <input class="c-input"
                                           placeholder="Show"
                                           type="text"
                                           value = {this.state.Show}
                                           onChange={(event) => {
                                               this.setState({
                                                   Show: event.target.value
                                               });
                                           }}/>
                                </label>
                                <label class="c-label">
                                    Sports
                                    <input class="c-input"
                                           placeholder="Sports"
                                           type="text"
                                           value = {this.state.Sports}
                                           onChange={(event) => {
                                               this.setState({
                                                   Sports: event.target.value
                                               });
                                           }}/>
                                </label>


                                    <button type="button"
                                            class="c-btn c-btn--primary "
                                            onClick = {() => API.updateuseractivity(this.state)
                                                .then((status) => {
                                                    if (status === 200){
                                                        console.log("success");
                                                    }
                                                })
                                            }

                                    >Update
                                    </button>

                            </form>

                        </div>
                        <div className="col-sm-8 col-lg-8 col-md-8 col-xs-8">
                            <p className="f2">User Activity</p>
                            <table className="c-table">
                                <thead>
                                <th width="100"> Activity</th>
                                <th width="100"> File Name</th>
                                <th width="100"> Date</th>
                                </thead>
                                <tbody>

                                {this.activity()}
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        useractivity : (data) => dispatch(useractivity(data)),
        activity : (data) => dispatch(activity(data))
    };
}

function mapStateToProps(state) {
    const itemArr = Object.keys(state.useractivity).map((items) => (
        {
            'items' : state.useractivity[items]


        }
    ));
    return {itemArr};
}

export default connect(mapStateToProps, mapDispatchToProps)(Useractivity);
