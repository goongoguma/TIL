import { createSlice } from "@reduxjs/toolkit";

let todoId = 1;
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const { task } = action.payload;
      state.push({ id: todoId++, task, completed: false });
    },
    del: (state, action) => {
      const { task } = action.payload;
      return state.filter(item => item.task !== task);   
    },
    toggle: (state, action) => {
      const { id } = action.payload;
       state.map(item => {
        if (id === item.id) {
          return item.completed = !item.completed
        }
      })
    }
  }
});

export const { add, del, toggle } = todoSlice.actions;

export default todoSlice.reducer;