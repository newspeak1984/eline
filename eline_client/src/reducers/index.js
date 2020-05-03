import { combineReducers } from "redux";

import auth from './auth';
import queue_admin from './queue_admin';
import queue_customer from './queue_customer';

export default combineReducers({ auth, queue_admin, queue_customer });