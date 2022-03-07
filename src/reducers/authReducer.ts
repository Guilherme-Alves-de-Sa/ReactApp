import { login_login_user } from '../api/graphQLModel';
import getLocalInfo from './local'
export const AUTH_SETTOKEN = 'AUTH_SETTOKEN';
export const AUTH_SETUSER = 'AUTH_SETUSER';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const token = getLocalInfo().auth.access_token
// neste caso, como user é declarado como type login_login_user, é necessário o cast
// nota: quando se insere o objeto "user" na localStorage, guarda-se a informação em formato JSON
const user: login_login_user | null = getLocalInfo().auth.user ? (getLocalInfo().auth.user as login_login_user) : ({} as login_login_user)

export type authStateType = {
    isAuthenticated: boolean;
    access_token: string | null;
    user: login_login_user | null;
}

export const authInitialState: authStateType = {
    isAuthenticated: token ? true : false,
    access_token: token ? token : null,
    user: user,
};

export type authActionType =
    | { type: typeof AUTH_SETTOKEN; access_token: string }
    | { type: typeof AUTH_SETUSER; user: login_login_user}
    | { type: typeof AUTH_LOGOUT; }

export const authReducer = (state: authStateType, action: authActionType) => {
    // console.log(action);
    switch(action.type){
        case AUTH_SETTOKEN:
             // Local Storage
              localStorage.setItem("AUTH_SETTOKEN", action.access_token)
            return { 
                ...state,
                isAuthenticated: true, 
                user: null, 
                access_token: action.access_token 
            }
        case AUTH_SETUSER:
                // localStorage guarda strings, guardar objeto em formato JSON
              localStorage.setItem("AUTH_SETUSER", JSON.stringify(action.user)) 
            return { 
                ...state,
                isAuthenticated: true, 
                user: action.user, 
                access_token: state.access_token 
            }
        case AUTH_LOGOUT:
                localStorage.removeItem("AUTH_SETUSER")
                localStorage.removeItem("AUTH_SETTOKEN")
            return { 
                ...state,
                isAuthenticated: false, 
                user: null, 
                access_token: null 
            };
        default:
            return state;
    }
}