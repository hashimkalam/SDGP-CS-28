import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: false,
  loading: false,
  planList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedOption: null,
    floorPlans: [],
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setFloorPlans: (state, action) => {
      state.floorPlans = action.payload;
    },
    updateUserDetails(state, action) {
      state.currentUser.user.name = action.payload.name;
    },
  },
});

export const { setSelectedOption, setFloorPlans } = userSlice.actions;

export const selectSelectedOption = (state) => state.user.selectedOption;
export const selectFloorPlans = (state) => state.user.floorPlans;

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
