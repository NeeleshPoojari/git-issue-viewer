import React from "react";
import { connect } from "react-redux";
import {
  thunk_action_creator_specific_issue,
  thunk_action_creator_comment
} from "../actions/fetchAction";
import Comment from "./Comment";

class SingleIssue extends React.Component {
  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo } = user;
    let { IssueId } = this.props.match.params;
    console.log(user, this.props.match.params.IssueId);
    this.props.dispatch(
      thunk_action_creator_specific_issue(name, repo, IssueId)
    );
    this.props.dispatch(thunk_action_creator_comment(name, repo, IssueId));
  }

  render() {
    const {userData} = this.props.issue;
    const {user} = this.props.issue.userData;
    return (
      <div class="Single-issue-description">
       <h1 class="issue-title">{userData.title} <span className="issue-no">#{userData.number}</span>&nbsp;</h1>
       <div className="activity">
              <span className="issue-status">{userData.state}ed on</span>&nbsp;
              <span className="open-on">{userData.created_at} by </span>
              <span className="creator">{}</span>&nbsp;
            </div>
        <h2>issue description</h2>
        {this.props.issue.userData.body}

        <table class="table table-hover">
          <thead>
            <tr>
              <th>comments</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.comments.comments).map((key, i) => (
              <Comment
                {...this.props}
                key={i}
                i={i}
                comment={this.props.comments.comments[key]}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("singleissue" + state.issues);
  return {
    comments: state.comments,
    issue: state.issues
  };
};
export default connect(mapStateToProps)(SingleIssue);
