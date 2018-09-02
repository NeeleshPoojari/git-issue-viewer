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

  handleSubmit(e) {
    e.preventDefault();
    console.log("Comment stored in local storage");

    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    const { userData } = this.props.issue;

    var newComment = {
      issueId: userData.number,
      author,
      comment
    };
    localStorage.setItem(
      `newComment${userData.number + Math.random()}`,
      JSON.stringify(newComment)
    );

    this.refs.commentForm.reset();
  }

  render() {
    const { userData } = this.props.issue;
    return (
      <div className="Single-issue-description">
        <h1 className="issue-title">
          {userData.title} <span className="issue-no">#{userData.number}</span>
          &nbsp;
        </h1>
        <div className="activity">
          <span className="issue-status">{userData.state} on</span>
          &nbsp;
          <span className="open-on">{userData.created_at} </span>
          <span className="creator">{}</span>
          &nbsp;
        </div>
        <div className="description alert-success ">
          {this.props.issue.userData.body}
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>comments</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.comments.comments).length > 0
              ? Object.keys(this.props.comments.comments).map((key, i) => (
                  <Comment
                    {...this.props}
                    key={i}
                    i={i}
                    comment={this.props.comments.comments[key]}
                  />
                ))
              : null}
          </tbody>
        </table>

        <div className="comments">
          <form
            ref="commentForm"
            className="comment-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <input type="text" ref="author" placeholder="author" />
            <input type="text" ref="comment" placeholder="comment" />
            <input type="submit" hidden />
          </form>
        </div>
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
