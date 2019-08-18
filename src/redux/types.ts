import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AllActions, rootReducer } from './reducers';

export type State = ReturnType<typeof rootReducer>;
export type Action = AllActions;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
export type ThunkResult<R> = ThunkAction<R, State, undefined, Action>;
// tslint:disable-next-line no-any
export type Thunk<T = void> = (...args: any[]) => (dispatch: Dispatch, getState: Store['getState']) => Promise<T>;
