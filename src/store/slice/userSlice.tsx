import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { setUser } = UserSlice.actions
export default UserSlice.reducer