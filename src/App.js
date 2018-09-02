import React, { Component } from "react";
import { connect } from "react-redux";
import IssueList from "./component/IssueList";
import NoIssue from "./component/NoIssue";


import { thunk_action_creator_issues, thunk_action_creator_issue_count } from "./actions/fetchAction";

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = this.getUsername.value;
    const repo = this.getRepo.value;
    let userInfo = {
      name: username,
      repo: repo,
      pageNum: 1
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.props.dispatch(thunk_action_creator_issues(username, repo));
    this.props.dispatch(thunk_action_creator_issue_count(username, repo));
    this.getUsername.value = "";
    this.getRepo.value = "";
  };
  changePage(e) {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    let { name, repo, pageNum } = user;
    e.currentTarget.id === "next"
      ? ++pageNum
      : pageNum > 1
        ? --pageNum
        : pageNum;

    user.pageNum = pageNum;
    localStorage.setItem("userInfo", JSON.stringify(user));

    console.log(pageNum);

    console.log("Changing page");
    this.props.dispatch(thunk_action_creator_issues(name, repo, pageNum));
    console.log("Changed page");
  }
  render() {
    console.log(this.props.data);
    return (
      <div className="container">
       {Object.keys(this.props.data.issues.userData).length > 0 ?  null : this.props.data.issues.isFetching ? null : (
        <form onSubmit={this.handleSubmit} className="form">
          <h2 className="title">GITHUB ISSUES VIEWER</h2>
          <input
            type="text"
            placeholder="Enter Github Username"
            required
            ref={input => (this.getUsername = input)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Github Repo name"
            required
            ref={input => (this.getRepo = input)}
          />
          <button className="button">Submit</button>
       </form> )}
        {this.props.data.issues.isFetching ? <h3>Loading...</h3> : null}
        {this.props.data.issues.isError ? (
          <h3 className="error">No such User or Repo exists.</h3>
        ) : null}
        {Object.keys(this.props.data.issues.userData).length > 0 ? (
          <IssueList user={this.props.data.issues.userData} count={this.props.data.issues.issueCount} />
        ) : this.props.data.issues.isFetching ? null : (
          <NoIssue />
        )}
        {Object.keys(this.props.data.issues.userData).length > 0 && Object.keys(this.props.data.issues.userData).length == 30 ? (
            <div className="pagination">
              <button className="btn btn-success" onClick={this.changePage.bind(this)} id="prev">
                &laquo;
              </button>
              <button className="btn btn-primary" onClick={this.changePage.bind(this)} id="next">
                &raquo;
              </button>
          </div>
        ) : (Object.keys(this.props.data.issues.userData).length < 30 && Object.keys(this.props.data.issues.userData).length > 0) ? (
          <div className="pagination">
            <button className="btn btn-success" onClick={this.changePage.bind(this)} id="prev">
              &laquo;
            </button>
            <button className="btn btn-primary" onClick={this.changePage.bind(this)} id="next" disabled>
              &raquo;
            </button>
        </div>
      ): null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};
export default connect(mapStateToProps)(App);
