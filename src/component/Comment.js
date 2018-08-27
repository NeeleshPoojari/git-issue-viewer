import React from "react";


class Comment extends React.Component {
  
  
  render() {
 const {comment} = this.props;
    return (
   <tr className="comments">
          <td className="avatar"><img src={comment.user.avatar_url} alt={comment.user.login}/></td>
          <td className="creator-name">{comment.user.login}</td>
          <td className="comment-body">{comment.body}</td>
      </tr>
    );
  }
}

export default Comment;
