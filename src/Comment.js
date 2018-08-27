import React from "react";


class Comment extends React.Component {
  
  
  render() {
    return (
      <div>
   **** {this.props.comment.body}
   =================================
    <br/>
    <br/>
       
      </div>
    );
  }
}

export default Comment;
