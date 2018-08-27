import React from "react";

class Issue extends React.Component {
  render() {
   let { issue } = this.props;
    return (
      <tr>
        <td className="table-light">
        <span className="	fa fa-exclamation-circle issue-status-icon"></span>
          <a  className="issue-title" href={"/issue/" + issue.number}>
            {issue.title}
            <div className="activity">
              <span className="issue-no">#{issue.number}</span>&nbsp;
              <span className="issue-status">{issue.state}ed on</span>&nbsp;
              <span className="open-on">{issue.created_at} by </span>
              <span className="creator">{issue.user.login}</span>&nbsp;
              <span className="updated-on"> Updated on {issue.updated_at} </span>&nbsp;
              <span className="fa fa-comment-o comments" > &nbsp;{issue.comments}</span>
            </div>
          </a>
        </td>
      </tr>
    );
  }
}

export default Issue;
