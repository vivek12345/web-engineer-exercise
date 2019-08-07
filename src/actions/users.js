import { getAccessToken } from "./sign-in";

export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_ERROR = "USERS_ERROR";

function usersRequesting() {
  return { type: USERS_REQUEST };
}

function usersSuccess(payload) {
  return { type: USERS_SUCCESS, payload };
}

function usersError() {
  return { type: USERS_ERROR };
}

export function fetchUsers(appId) {
  return async function(dispatch) {
    dispatch(usersRequesting());

    const response = await fetch(
      `https://guarded-thicket-22918.herokuapp.com/apps/${appId}/users`,
      {
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) return dispatch(usersError());

    const { users } = await response.json();

    return dispatch(usersSuccess(users));
  };
}
