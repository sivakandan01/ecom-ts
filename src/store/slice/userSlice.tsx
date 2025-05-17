import { createSlice } from "@reduxjs/toolkit";

type UserDataProp = {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  companyName?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

type UserSlice = {
  userData: UserDataProp;
};

const initialState: UserSlice = {
  userData: {
    id: "",
    userName: "",
    email: "",
    password: "",
    role: "",
    companyName: "",
    createdAt: "",
    updatedAt: "",
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData =  action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
