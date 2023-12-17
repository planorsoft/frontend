export const userTypes = {
    GET_MY_USER_REQUEST: 'GET_MY_USER_REQUEST',
    GET_MY_USER_SUCCESS: 'GET_MY_USER_SUCCESS',
    GET_MY_USER_FAILURE: 'GET_MY_USER_FAILURE',

    UPDATE_MY_USER_REQUEST: 'UPDATE_MY_USER_REQUEST',
    UPDATE_MY_USER_SUCCESS: 'UPDATE_MY_USER_SUCCESS',
    UPDATE_MY_USER_FAILURE: 'UPDATE_MY_USER_FAILURE',

    UPDATE_AVATAR_REQUEST: 'UPDATE_AVATAR_REQUEST',
    UPDATE_AVATAR_SUCCESS: 'UPDATE_AVATAR_SUCCESS',
    UPDATE_AVATAR_FAILURE: 'UPDATE_AVATAR_FAILURE',

    DELETE_AVATAR_REQUEST: 'DELETE_AVATAR_REQUEST',
    DELETE_AVATAR_SUCCESS: 'DELETE_AVATAR_SUCCESS',
    DELETE_AVATAR_FAILURE: 'DELETE_AVATAR_FAILURE',

    GET_TEAM_REQUEST: 'GET_TEAM_REQUEST',
    GET_TEAM_SUCCESS: 'GET_TEAM_SUCCESS',
    GET_TEAM_FAILURE: 'GET_TEAM_FAILURE',
}


export interface User {
    name: string;
    email: string;
    avatarUri: string | null;
}

export interface UpdateUserCommand {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
}

export interface UserState {
    users: User[];
    user: User;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface UserAction {
    type: string;
    payload: User | string;
}

export interface UserPayload {
    name: string;
    email: string;
    imageUri?: string;
}