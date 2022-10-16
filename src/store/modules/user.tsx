// types
export interface UserState {
  email: string;
  account_id: string;
  sesstion_id: string;
}

export interface ActionState {
  type: string;
  payload: UserState;
}

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

interface LoginAction {
  type: typeof LOG_IN;
  payload: UserState;
}

interface LoginOutAction {
  type: typeof LOG_OUT;
}

export type UserActionTypes = LoginAction | LoginOutAction ;

// actions
function login(email: string, account_id: string, sesstion_id: string): ActionState {
  return {
    type: LOG_IN,
    payload: {
      email,
      account_id,
      sesstion_id,
    },
  };
}

function logout(): ActionState {
  return {
    type: LOG_OUT,
    payload: {
      email: '',
      account_id: '',
      sesstion_id: '',
    },
  };
}

export const actionCreators = {
  login,
  logout,
};

// reducers
const initialState: UserState = {
  email: '',
  account_id: '',
  sesstion_id: '',
};

export function userReducer(state: UserState = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case LOG_IN:
      return {
        email: action.payload.email,
        account_id: action.payload.account_id,
        sesstion_id: action.payload.sesstion_id,
      };
    case LOG_OUT:
      return {
        email: '',
        account_id: '',
        sesstion_id: '',
      };
    default:
      return state;
  }
}
