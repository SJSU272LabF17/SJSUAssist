import React, {Component} from 'react';
import favourite_empty from "../images/favourite_empty.png"
import favourite_filled from "../images/favourite_filled.png";
import Delete from "../images/Delete.png";
import directoryIcon from "../images/directory.png";
import fileIcon from "../images/file.png";
import share from "../images/share.png"
import more from '../images/more.svg';

class ShowClosedIssues extends Component{

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
                    <button  className="btn btn-sm" onClick={(()=>{this.props.viewIssue(issue)})}>
                        <img
                            src={more}  width="50" height="30" alt="More"
                        />
                    </button>
                </td>
            </tr>
            <tr>
                <td>Content: </td>
                <td>{issue.issueContent}</td>
            </tr>
            </tbody>
        );
    }
}


export default ShowClosedIssues;