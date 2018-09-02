import React, { Component } from "react";
import { connect } from "react-redux";
import { thunk_action_creator_issues } from "../actions/fetchAction";
import Issue from "./Issue.js";

class IssueList extends Component {
  handleClick(state) {
    console.log(state);
    var user = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo, pageNum } = user;
    this.props.dispatch(
      thunk_action_creator_issues(name, repo, pageNum, state)
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
                  value={this.props.stateFilter}
                  onChange={e => {
                    this.handleClick(e.target.value);
                  }}
                >
                  <option value="all">All Open Closed</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
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
