import React from "react";


class Issue extends React.Component {
  
  
  render() {
    return (
      <div>
        <a href={'/issue/' + this.props.issue.number}>
            <strong>{this.props.i + 1}.</strong>
          {this.props.issue.title}

        <h2>  comment     {this.props.issue.comments}</h2>
        </a>
        <br/> <br/>
       
      </div>
    );
  }
}

export default Issue;
