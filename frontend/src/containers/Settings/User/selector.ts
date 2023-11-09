import { createSelector } from 'reselect'
import { User, UserState } from './types'

export const selectUserByEmail = createSelector(
    [
        ( state : UserState) => state.users,
        ( _ : UserState, email? : string) => email
    ],
    (users, email) => {
        return (users as User[]).find((user : User) => user.email === email)
    }
)