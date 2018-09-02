import store from "../store";

export const fetch_post = () => {
  return {
    type: "FETCH_USER"
  };
};

export const receive_post = post => {
  return {
    type: "FETCHED_USER",
    data: post
  };
};

export const receive_issue_count = count => {
  return {
    type: "FETCHED_COUNT",
    data: count
  };
};

export const fetch_comment = () => {
  return {
    type: "FETCH_COMMENT"
  };
};

export const receive_comment = post => {
  return {
    type: "FETCHED_COMMENT",
    data: post
  };
};

export const receive_error = () => {
  return {
    type: "RECEIVE_ERROR"
  };
};

export const thunk_action_creator_issues = (username, repo, pageNumber = 1) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_post());
  return function(dispatch, getState) {
    return fetch(
      `https://api.github.com/repos/${user}/${rep}/issues?page=${pageNumber}`
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
  return function(dispatch, getState) {
    return fetch(
      `https://api.github.com/repos/${user}/${rep}/issues/${issueId}`
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
  return function(dispatch, getState) {
    return fetch(`https://api.github.com/repos/${user}/${rep}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(receive_issue_count(data));
      })
      .catch(err => dispatch(receive_error()));
  };
};

export const thunk_action_creator_comment = (username, repo, issueId) => {
  const user = username.replace(/\s/g, "");
  const rep = repo.replace(/\s/g, "");
  store.dispatch(fetch_comment());
  return function(dispatch, getState) {
    return fetch(
      `https://api.github.com/repos/${user}/${rep}/issues/${issueId}/comments`
    )
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(receive_comment(data));
      })
      .catch(err => dispatch(receive_error()));
  };
};
