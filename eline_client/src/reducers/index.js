import { combineReducers } from "redux";

import auth_customer from './auth_customer';
import auth_admin from './auth_admin';
import queue_admin from './queue_admin';
import queue_customer from './queue_customer';

export default combineReducers({ auth_admin, auth_customer, queue_admin, queue_customer });