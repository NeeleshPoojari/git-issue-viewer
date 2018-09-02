import React from "react";
import moment from 'moment';

class Issue extends React.Component {
  render() {
    let { issue } = this.props;
    return (
      <tr>
        <td className="table-light">
          <span className="	fa fa-exclamation-circle issue-status-icon" />
          <a className="issue-title" href={"/issue/" + issue.number}>
            {issue.title}
            <div className="activity">
              <span className="issue-no">#{issue.number}</span>
              &nbsp;
              <span className="issue-status">
                {issue.state ==='open' ? "opened":issue.state}{" "}
              </span>
              <span className="open-on">{moment(issue.created_at).fromNow()} by </span>
              <span className="creator">{issue.user.login}</span>
              &nbsp;
              <span className="updated-on">
                {" "}
                Updated {moment(issue.updated_at).fromNow()}{" "}
              </span>
              &nbsp;
              <span className="fa fa-comment-o comments">
                {" "}
                &nbsp;
                {issue.comments}
              </span>
            </div>
          </a>
        </td>
      </tr>
    );
  }
}

export default Issue;
