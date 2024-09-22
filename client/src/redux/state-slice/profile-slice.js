import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {}, // Ensure initial state is an object
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;