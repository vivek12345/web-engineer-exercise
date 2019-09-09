import { combineReducers } from 'redux';
import signIn from './sign-in';
import apps from './apps';
import users from './users';
import errors from './errors';

export default combineReducers({ signIn, apps, users, errors });
