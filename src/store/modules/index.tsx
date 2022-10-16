import { combineReducers } from 'redux';
import { UserState, userReducer } from './user';

export interface StoreState {
  userReducer: UserState;
}

export default combineReducers<StoreState>({
  userReducer,
});
