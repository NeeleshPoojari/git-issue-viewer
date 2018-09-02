import React, { Component } from "react";
import Issue from "./Issue.js";

const IssueList = props => {
  return (
    <div className="git-issues col-lg-12 col-sm-12 ">
      {/* <h3>issues {props.user.length}</h3> */}
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Open issues {props.count.open_issues}</th>
          </tr>
        </thead>
        <tbody>
          {props.user.map((issue, i) => (
            <Issue {...this.props} key={i} i={i} issue={issue} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;
