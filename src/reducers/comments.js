import * as types from "../actions/actionTypes";

const comments = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_COMMENT:
      return true;

    case types.FETCHED_COMMENT:
      return action.data;

    case types.SET_ISSUE_COMMENT:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default comments;
