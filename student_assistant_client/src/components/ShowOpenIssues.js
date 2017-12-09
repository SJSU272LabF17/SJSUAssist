import React, {Component} from 'react';

class ShowOpenIssues extends Component{

    constructor(){
        super();
        this.state = {
            hover: false,
        };
    }

    render(){

        const {issue} = this.props;

        return(
            <tbody>
            <tr>
                <td>Topic: </td>
                <td>{issue.skillId} </td>
            </tr>
            <tr>
                <td>Content: </td>
                <td>{issue.issueContent}</td>
            </tr>
            <tr>
                <button className="btn btn-primary" onClick={(()=>{this.props.resolveIssue(issue)})}>Resolved</button>
            </tr>
            </tbody>
        );
    }
}


export default ShowOpenIssues;