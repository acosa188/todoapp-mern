import React from 'react';
import { TodoItem } from './TodoItem'

export const TodoList  = props => { 
    const { items } = props
    return (
        <ul className="todolist">
        {items.map(item => (
            <TodoItem key={item._id} item={item} markAsCompleted={props.markAsCompleted}/>
        ))}</ul>
    );   
}
