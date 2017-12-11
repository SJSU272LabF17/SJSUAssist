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
                <td>
                <button className="btn btn-primary btn-sm" onClick={(()=>{this.props.resolveIssue(issue)})}>Mark Resolved</button></td>
                <td>
                    <button className="btn btn-primary btn-sm" onClick={(()=>{this.props.viewIssue(issue)})}>View</button></td>
            </tr>
            <tr>
                <td>Content: </td>
                <td>{issue.issueContent}</td>

            </tr>
            <tr>

            </tr>
            <tr>

            </tr>
            </tbody>
        );
    }
}


export default ShowOpenIssues;