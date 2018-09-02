import React, { Component } from "react";
import { connect } from "react-redux";
import { thunk_action_creator_issues } from "../actions/fetchAction";
import Issue from "./Issue.js";

class IssueList extends Component {
  handleClick(state) {
    console.log(state);
    var user = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo, pageNum } = user;
    user.state = state;
    localStorage.setItem("userInfo", JSON.stringify(user));
    this.props.dispatch(
      thunk_action_creator_issues(name, repo, pageNum, state)
    );
  }

  handleClickForSort(sort) {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo, pageNum, state } = user;
    this.props.dispatch(
      thunk_action_creator_issues(name, repo, pageNum, state, sort)
    );
  }
  render() {
    return (
      <div className="git-issues col-lg-12  ">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="OpenCount">
                <i className="fa fa-exclamation-circle issue-status-icon" />{" "}
                Open {this.props.count.open_issues}
                &nbsp;&nbsp;&nbsp;
                <select
                  id="issueState"
                  name="issueState"
                  onChange={e => {
                    this.handleClick(e.target.value);
                  }}
                >
                  <option value="all">All Open Closed</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  id="issueSort"
                  name="issueSort"
                  onChange={e => {
                    this.handleClickForSort(e.target.value);
                  }}
                >
                  {" "}
                  <option>Sort</option>
                  <option value="created-desc">Newest</option>
                  <option value="created-asc">Oldest</option>
                  <option value="comments-desc">Most Commented</option>
                  <option value="comments-asc">Least Commented</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.user.map((issue, i) => (
              <Issue {...this.props} key={i} i={i} issue={issue} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// export default IssueList;

const mapStateToProps = state => {
  return {
    data: state
  };
};
export default connect(mapStateToProps)(IssueList);
