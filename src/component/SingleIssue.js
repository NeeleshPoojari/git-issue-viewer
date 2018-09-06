import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  thunk_action_creator_specific_issue,
  thunk_action_creator_comment,
  thunk_action_creator_set_comment
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
    var userData = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo } = userData;
    const comment = this.refs.comment.value;
    let storedComments =
      JSON.parse(
        localStorage.getItem(`/${name}/${repo}${this.props.location.pathname}`)
      ) || [];
    let newComment = {
      user: {
        login: name,
        avatar_url: "https://avatars2.githubusercontent.com/u/28433939?v=4"
      },
      created_at: Date(),
      body: comment
    };
    storedComments.push(newComment);
    localStorage.setItem(
      `/${name}/${repo}${this.props.location.pathname}`,
      JSON.stringify(storedComments)
    );
    this.props.dispatch(thunk_action_creator_set_comment(newComment));
    this.refs.commentForm.reset();
  }

  render() {
    const { userData } = this.props.issue;
    return (
      <div className="Single-issue-description">
        <h2 className="issue-title">
          {userData.title} <span className="issue-no">#{userData.number}</span>
          &nbsp;
        </h2>
        <div className="activity">
          <span className="issue-status">
            {userData.state === "open" ? "opened" : userData.state}
          </span>
          &nbsp;
          <span className="open-on">
            {moment(userData.created_at).fromNow()}{" "}
          </span>
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
            {this.props.comments.length > 0
              ? this.props.comments.map((comment, i) => (
                  <Comment {...this.props} key={i} i={i} comment={comment} />
                ))
              : null}
          </tbody>
        </table>

        <div className="comments">
          <form
            ref="commentForm"
            className="comment-form "
            onSubmit={e => this.handleSubmit(e)}
          >
            <textarea type="text" ref="comment" class="form-control" rows="3" placeholder="comment" />
            <input className="btn btn-success  comment-btn" type="submit" value="Add comment" />
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
