import store from "../store";
import * as types from "./actionTypes";
import * as constants from "../constant.js"

export const fetch_post = () => {
  return {
    type: types.FETCH_USER
  };
};

export const receive_post = post => {
  return {
    type: types.FETCHED_USER,
    data: post
  };
};

export const receive_issue_count = count => {
  return {
    type: types.FETCHED_COUNT,
    data: count
  };
};

export const fetch_comment = () => {
  return {
    type: types.FETCH_COMMENT
  };
};

export const receive_comment = comments => {
  return {
    type: types.FETCHED_COMMENT,
    data: comments
  };
};

export const thunk_action_creator_set_comment = comments => ({
  type: types.SET_ISSUE_COMMENT,
  payload: comments
});

export const receive_error = () => {
  return {
    type: types.RECEIVE_ERROR
  };
};

export const thunk_action_creator_issues = (
  username,
  repo,
  pageNumber = 1,
  state = "all",
  sort = "created-desc"
) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_post());
  return dispatch => {
    return fetch(
      `${constants.gitUrl}/${user}/${rep}/issues?page=${pageNumber}&state=${state}&sort=${sort}`
    )
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(receive_post(data));
      })
      .catch(err => dispatch(receive_error()));
  };
};
export const thunk_action_creator_specific_issue = (
  username,
  repo,
  issueId
) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_post());
  return dispatch => {
    return fetch(
      `${constants.gitUrl}/${user}/${rep}/issues/${issueId}`
    )
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(receive_post(data));
      })
      .catch(err => dispatch(receive_error()));
  };
};

export const thunk_action_creator_issue_count = (username, repo) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_post());
  return dispatch => {
    return fetch(`${constants.gitUrl}/${user}/${rep}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("Issue while fetching count");
        } else dispatch(receive_issue_count(data));
      })
      .catch(err => dispatch(receive_error()));
  };
};

export const thunk_action_creator_comment = (username, repo, issueId) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_comment());
  return dispatch => {
    return fetch(
      `${constants.gitUrl}/${user}/${rep}/issues/${issueId}/comments`
    )
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No comments");
        } else {
          const localComment = JSON.parse(
            localStorage.getItem(`/${username}/${repo}/issue/${issueId}`)
          );
          if (localComment && localComment.length) {
            data = [...data, ...localComment];
          }
          dispatch(receive_comment(data));
        }
      })
      .catch(err => dispatch(receive_error()));
  };
};
