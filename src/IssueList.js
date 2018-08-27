import React, { Component } from "react";
import Issue from './Issue.js';

const IssueList = props => {
  return (
    <div className="git-issues ">
    {/* <h3>issues {props.user.length}</h3> */}
    {props.user.map((issue,i) => <Issue {...this.props} key={i} i={i} issue={issue}/>)}
       
    </div>
  )
};

export default IssueList;