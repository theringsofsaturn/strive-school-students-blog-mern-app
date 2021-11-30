import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  // We can use our state and dispatch to update our state. To do this, we will take it from our Reducers, using useReducer. So, we will indicate and pass into this useReducer our Reducer (that we imported at the top) and our initial state (the state we need to update).
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // To be able to save our user even after the page is refreshed, we will use this to save our user in localStorage.
  // ** This is not enough. First, we should fetch the user from the localStorage.
  // Make sure we have this on initial state:  user: JSON.parse(localStorage.getItem("user")) || null
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);  // Whenever the state and user changes, fire this useEffect.

  return (
    // We can use the 'Context' variable above as our provider. This will allow us to access the state and dispatch from anywhere in our application.
    // We will pass in these values as props to our children. This will allow us to access the state and dispatch from our children, updating our state.
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch, // We pass this dispatch, because lets say in our case, when we click on the LOGIN button, we will dispatch LOGIN_START, and according to our server, we will dispatch LOGIN_SUCCESS or LOGIN_FAILURE.
      }}
    >
        {/* Children will be what will be wrapped inside our provider. In this case we will wrapp App.js, so every component can access the state and dispatch. */}
      {children} 
    </Context.Provider>
  );
};
