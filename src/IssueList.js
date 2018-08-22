import React, { Component } from "react";
import Issue from './Issue.js';

const IssueList = props => {
  return (
    <div className="git-issues ">
    {props.user.map((issue,i) => <Issue {...this.props} key={i} i={i} issue={issue}/>)}
       
    </div>
  )
};

export default IssueList;