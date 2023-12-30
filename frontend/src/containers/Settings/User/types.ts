export const currentUserTypes = {
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
}


export interface CurrentUser {
    name: string;
    email: string;
    avatarUri: string | null;
    roleName?: string;
}

export interface UpdateCurrentUserCommand {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
}

export interface CurrentUserState {
    user: CurrentUser;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface CurrentUserAction {
    type: string;
    payload: CurrentUser | string;
}

export interface CurrentUserPayload {
    name: string;
    email: string;
    imageUri?: string;
}