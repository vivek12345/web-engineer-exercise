export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

const TOKEN_NAME = "__MONZO_WEB_EXERCISE_TOKEN__";

function authenticationRequesting() {
  return { type: AUTHENTICATION_REQUEST };
}

function authenticationSuccess() {
  return { type: AUTHENTICATION_SUCCESS };
}

function authenticationError() {
  return { type: AUTHENTICATION_ERROR };
}

export function setAccessToken(accessToken) {
  window.localStorage.setItem(TOKEN_NAME, accessToken);
}

export function getAccessToken() {
  return window.localStorage.getItem(TOKEN_NAME);
}

export async function isValidToken() {
  const token = getAccessToken();

  if (!token) return false;

  const validTokenRequest = await fetch(
    "https://guarded-thicket-22918.herokuapp.com/",
    {
      headers: { Authorization: token }
    }
  );
  const { error } = await response.json();

  return !error;
}

export function authenticate(email, password) {
  return async function(dispatch) {
    dispatch(authenticationRequesting());
    const response = await fetch(
      "https://guarded-thicket-22918.herokuapp.com/login",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }
    );

    if (!response.ok) return dispatch(authenticationError());

    const { accessToken } = await response.json();

    setAccessToken(accessToken);

    return dispatch(authenticationSuccess());
  };
}
