import React from 'react';
import { TodoList } from '../components/TodoList';
import { connect } from 'react-redux';
import { getTodosThunk, addTodoThunk, updateTodoThunk, deleteTodoThunk } from '../store/todos';
import './App.css';

const Empty = () => {
  return (<div className="container">
    <div className="row">
      <p className="lightgray">No Items in the list</p>
    </div>
  </div>)
}
const Header = props => {
  const { handleChange, handleAdd, items, text } = props
  return (<div>
    <h3 className="apptitle">MY TO DO LIST</h3>
    <form className="row">
      <div className="col-md-3">
        <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={text} />
      </div>
      <div className="col-md-3">
        <button className="btn btn-primary" onClick={(e) => handleAdd(e)} disabled={!text}>{"Add #" + (items.length + 1)}</button>
      </div>
    </form>
    <br />
  </div>
  )
}
const Body = props => {
  const { items } = props
  const isEmpty = !items.length
  if (isEmpty) {
    return (<Empty />)
  } else {
    return (<div className="row">
      <div className="col-md-3">
        <TodoList {...props} />
      </div>
    </div>)
  }
}
const Footer = props => {
  const { items, handleDelete } = props
  const isCompleted = items.filter(item => { return item.isCompleted })
  return (
    <div className="row">
      <button className="btn btn-danger btn-sm float-right" onClick={() => handleDelete()} hidden={!isCompleted.length}>delete completed</button>
    </div>)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      items: this.props.todos.items
    }
  }

  async componentDidMount() {
    await this.fetchDB(); 
  }
  async fetchDB(){
    try{
      await this.props.getTodosThunk();
      this.setState({items:this.props.todos.items})
    }catch(err){
      console.log(err);
    } 
  }
  handleChange = e => {
    this.setState({ text: e.target.value });
  }
  handleAdd = async (e) => {
    e.preventDefault();
    if (!this.state.text) { return false }
    const item = { text: this.state.text, isCompleted: false }
    
    try{
      await this.props.addTodoThunk(item);
      this.setState((state) => ({ text: "" }));
      await this.fetchDB();
    }catch(err){
      console.log(err);
    }
    
    

  }
  markAsCompleted = async (id) => {
    try{
      await this.props.updateTodoThunk(id)
      await this.fetchDB();
    }catch(err){
      console.log(err)
    }

    let filtered = this.state.items.map(item => {
      if (item.id == id) { item.isCompleted = !item.isCompleted }
      return item
    })
    this.setState({ items: filtered })
  }
  handleDelete = async () => {
    let toBeDeleted = this.state.items.filter(item => { return item.isCompleted })
    toBeDeleted.map(async (item) => {
      try{
        let res = await this.props.deleteTodoThunk(item._id);
        console.log(res);   
         await this.fetchDB();  
      }catch(err){
        console.log(err);
      }
    });
    
    
  }
  render() {
    return (
      <div className="container">
        <div className="col-md-12 offset-2">
          <Header {...this.state} handleChange={this.handleChange} handleAdd={this.handleAdd} />
          <Body   {...this.props.todos} markAsCompleted={this.markAsCompleted} />
          <Footer {...this.props.todos} handleDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    todos: state.todos
  }
}

const mapDispatchToProps = () =>{
  return{
    getTodosThunk,
    addTodoThunk,
    updateTodoThunk, 
    deleteTodoThunk
  }
}
export default connect(mapStateToProps, mapDispatchToProps())(App);
