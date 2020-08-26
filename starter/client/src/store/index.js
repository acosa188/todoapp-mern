import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import todosReducers from './todos';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer: {
        todos: todosReducers
    },
    middleware
});

export default store;