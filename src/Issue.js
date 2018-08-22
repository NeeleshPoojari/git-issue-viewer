import React from "react";

class Issue extends React.Component {
  render() {
  return (
  <div>
    
  <p><span><strong>{this.props.i+1}.</strong></span>&nbsp;&nbsp;&nbsp;{this.props.issue.body}</p>
  <br></br>
  </div>
);
  }
}

export default Issue;
