import { getAccessToken } from "./sign-in";

export const APPS_REQUEST = "APPS_REQUEST";
export const APPS_SUCCESS = "APPS_SUCCESS";
export const APPS_ERROR = "APPS_ERROR";

function appsRequesting() {
  return { type: APPS_REQUEST };
}

function appsSuccess(payload) {
  return { type: APPS_SUCCESS, payload };
}

function appsError() {
  return { type: APPS_ERROR };
}

export function fetchApps() {
  return async function(dispatch) {
    dispatch(appsRequesting());

    const response = await fetch(
      "https://guarded-thicket-22918.herokuapp.com/apps",
      {
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) return dispatch(appsError());

    const { apps } = await response.json();

    return dispatch(appsSuccess(apps));
  };
}
