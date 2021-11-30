// A reducer is a function that returns a new state. It takes the current state and an action as arguments. Depending on the action, it may return a new state.
const Reducer = (state, action) => {
  switch (action.type) {
    // If we have one of these cases (actions), return a new state. Otherwise, return the old state.

    case "LOGIN_START":
      return {
        user: null,
        isFetching: true, // Because we starting our proccess, fetching data.
        error: false, // In this case we don't have an error, because we are still fetching...
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // If the login is succesful, it will return us a user. User will not be NULL anymore, it will be action.payload (-- > payload: user)
        isFetching: false, // After the response is succesful, we will set isFetching to false.
        error: false, // Logically, the error is false.
      };
    case "LOGIN_FAILURE":
      return {
        user: null, // The user is NULL, because we failed to login and we have some kind of error.
        isFetching: false, // We are not fetching anymore. We finished this process again.
        error: true, // We have an error, so...
      };

    case "LOGOUT":
      return {
        user: null, // We are logging out, so we will set the user to null.
        isFetching: false, // We are not fetching of course
        error: false, // Basically, everything will turn to the initial state again.
      };
    // If we don't have any of these cases, do nothing, just return the old state. Nothing will be changed.
    default:
      return state;
  }
};

export default Reducer;
