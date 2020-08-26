import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, deleteTodo, updateTodo, getTodos } from '../api/todoApi';

// Thunks
export const getTodosThunk = createAsyncThunk(
    'todos/getTodosThunkStatus',
    async () => {
        const res = await getTodos();
        return res;
    }
);

export const addTodoThunk = createAsyncThunk(
    'todos/addTodoThunkStatus',
    async(item) => {
        let res = await addTodo(item);
        return res;
    }
);

export const updateTodoThunk = createAsyncThunk(
    'todos/updateTodoThunkStatus',
    async(id) => {
        let res = await updateTodo(id);
        return res;
    }
)

export const deleteTodoThunk = createAsyncThunk(
    'todos/deleteTodoThunkStatus',
    async(id) => {
        let res = await deleteTodo(id);
        return res;
    }
)

// Slice
const slice = createSlice({
    name: "todos",
    initialState: {
        text:'',
        items: [],
        isLoading: false
    },
    reducers: {
        resetText: (state) =>{
            state.text='';
        }
    },
    extraReducers: {
        [getTodosThunk.fulfilled]: (state, action) => {     
            state.items = action.payload;
        },
        [addTodoThunk.fulfilled]: (state, action)=>{
            state.isLoading = false;
        },
        [updateTodoThunk.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [deleteTodoThunk.fulfilled]: (state) => {
            state.isLoading = false;
        }
    }
})

export default slice.reducer;
