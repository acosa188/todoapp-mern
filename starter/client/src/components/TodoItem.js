import React from 'react';

export const TodoItem  = props => {  
    const { item, markAsCompleted } = props
    const { _id, isCompleted, text } = item
    return(isCompleted ?
        <li key={_id} onClick={() => markAsCompleted(_id)}><strike>{text}</strike></li> :
        <li key={_id} onClick={() => markAsCompleted(_id)}>{text}</li> 
    )
}
