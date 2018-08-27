import React from "react";
import { connect } from "react-redux";
import {thunk_action_creator_specific_issue, thunk_action_creator_comment } from "../actions/fetchAction";
import Comment from './Comment';

class SingleIssue extends React.Component {
  componentDidMount(){
    var user = JSON.parse(localStorage.getItem('userInfo'));
     let  { name, repo } = user;
     let { IssueId } =this.props.match.params;
    console.log(user,this.props.match.params.IssueId);
    this.props.dispatch(thunk_action_creator_specific_issue(name,repo,IssueId));
    this.props.dispatch(thunk_action_creator_comment(name,repo,IssueId));

  }
 
  render() {
  return (
    
  <div>
    <h2>issue title</h2>
    {this.props.issue.userData.title}
          
         <h2>issue description</h2>
         {this.props.issue.userData.body}
         <h2>comments</h2>
      {Object.keys(this.props.comments.comments).map((key,i) => <Comment {...this.props}  key={i} i={i} comment={this.props.comments.comments[key]}/>)}
  </div>

);
  }
}
const mapStateToProps = state => {
 console.log("singleissue"+state.issues);
  return {
    comments: state.comments,
    issue:state.issues

  };
};
export default connect(mapStateToProps)(SingleIssue);

