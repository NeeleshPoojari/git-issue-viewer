import * as types from "../actions/actionTypes";

const initialState = {
  userData: {},
  issueCount: {},
  isFetching: false,
  isError: false
};

const issues = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true,
        userData: {},
        isError: false
      });
    case types.FETCHED_USER:
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });

    case types.FETCHED_COUNT:
      return Object.assign({}, state, {
        issueCount: action.data,
        isFetching: false,
        isError: false
      });

    case types.RECEIVE_ERROR:
      return Object.assign({}, state, {
        isError: true,
        isFetching: false
      });
    default:
      return state;
  }
};

export default issues;
