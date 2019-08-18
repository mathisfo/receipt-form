import { combineReducers } from 'redux';

import { Actions as FormActions, formReducer } from './formReducer';
import { Actions as InteractionsActions, interactionReducer } from './interactionReducer';
import { Actions as StatusActions, statusReducer } from './statusReducer';
import { Actions as UserActions, userReducer } from './userReducer';
import { Actions as ValidationActions, validationReducer } from './validationReducer';

export type AllActions =
  | FormActions
  | InteractionsActions
  | StatusActions
  | UserActions
  | ValidationActions;

export const rootReducer = combineReducers({
  form: formReducer,
  validation: validationReducer,
  interaction: interactionReducer,
  userData: userReducer,
  status: statusReducer,
});
