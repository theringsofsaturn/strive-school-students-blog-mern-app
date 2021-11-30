// When we click LOGIN button, we will have three main processes. First, we will get the user's input from the form. Second, we will send the input to the server. Third, we will get the response from the server and display it on the screen.

// So, in terms of Context API (or Redux also):
// 1. LOGIN START:
// We will send our credentials (username and password). 
// 2. LOGIN SUCCESS:
// If it is successful, we will get the response from the server, which is our user information. After that we will update our state. The states will not be NULL anymore, but it will be username, email, etc etc...
// 3. LOGIN FAILURE:
// If it is not successful,(no username, wrong password, etc), we will get the error message from the server. So LOGIN will FAIL. After that our states will be NULL again, and the ERROR state will be TRUE.

export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});


export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
    // No need to pass payload, because we will get the error message from the server.
  });