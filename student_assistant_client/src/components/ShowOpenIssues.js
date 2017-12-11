import React, {Component} from 'react';
import resolve from '../images/resolved.svg'
import more from '../images/more.svg';

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
                <td align="center" style={{tabSize:"20%"}}>{issue.skillId} </td>
                <td align="right" style={{marginLeft:'70%'}}>
                    <button  className="btn btn-sm" onClick={(()=>{this.props.resolveIssue(issue)})}>
                        <img
                            src={resolve}  width="50" height="30" alt="Resolve"
                        />
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
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


export default ShowOpenIssues;