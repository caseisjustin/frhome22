import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const existingUser = state.users.find(user => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
