import axios from 'axios';

export const getTodos = async () => {
    try{
        let res =  await axios.get("http://localhost:4000/todos");
        let { data } =  res;
        return data;
    }catch(e){
        console.log(e);
    }
   
}

export const addTodo = async (req) => {
    try{
        let res = await axios.post("http://localhost:4000/todos/add", req);
        let { data } = res;
        return data;
    }catch(e){
        console.log(e);
    }    
}

export const updateTodo = async (id)=>{
    try{
        let res = await axios.put(`http://localhost:4000/todos/${id}`);
        let { data } = res;
        return data;
    }catch(e){
        console.log(e);
    }
}

export const deleteTodo = async (id)=>{
    try{
        let res = await axios.delete(`http://localhost:4000/todos/${id}`);
        let { data } = res;
        return data;
    }catch(e){
        console.log(e);
    }
}

