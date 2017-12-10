import React, {Component} from 'react';

class ShowProfileData extends Component{

    constructor(){
        super();
        this.state = {
            hover: false,
        };
    }

/*
    showInterest = ((item) => {
        let interest="";
        if(item.reading){
            interest = interest + "Reading "
        }
        if(item.sports){
            interest = interest + "Sports "
        }
        if(item.music){
            interest = interest + "Music "
        }
        return (interest);
    });
*/
render(){

        const {item} = this.props;
        console.log(item);
        return(
            <form className="form-horizontal">

                <div className="form-group">
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                        <div className="form-group">
                            <label className="text-justify h3">User Profile:</label><hr/>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="form-horizontal form-control-static">Firstname:</label>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5 ">
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                value={item.firstname}
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
                                id="lastname"
                                value={item.lastname}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="form-horizontal form-control-static">Username:</label>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={item.username}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="form-horizontal form-control-static">Gender:</label>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gender"
                                    value={item.gender}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="form-horizontal form-control-static">Student ID:</label>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input
                                type="text"
                                className="form-control"
                                id="studentid"
                                value={item.studentid}
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
                                type="text"
                                className="form-control"
                                id="txtlifeevents"
                                value={item.dateofbirth}
                            />
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}


export default ShowProfileData;