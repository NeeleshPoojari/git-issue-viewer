const initialState = {
    comments: {},
    isFetching: false,
    isError: false
  };
  
  const comments = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_COMMENT":
        return Object.assign({}, state, {
          isFetching: true,
          comments: {},
          isError: false
        });
      case "FETCHED_COMMENT":
        return Object.assign({}, state, {
          comments: action.data,
          isFetching: false,
          isError: false
        });
      case "RECEIVE_ERROR":
        return Object.assign({}, state, {
          isError: true,
          isFetching: false
        });
      default:
        return state;
    }
  };
  
  export default comments;