import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { api } from './api.reducer';
import { apiStudent } from './api.reducerStudent';
import { apiAdmin } from './api.reducerAdmin';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  api,
  apiStudent,
  apiAdmin,
});

export default rootReducer;
