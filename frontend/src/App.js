import React from 'react';
import './App.css';

import axios from 'axios'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      id:0,
      name:'',
      email:'',
      password:''
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8080/api')
    .then((res)=>{
      this.setState({
        users:res.data,
        id:0,
        name:'',
        email:'',
        password:''
      })
    })
  }
  nameChange=event=>{
    this.setState({
      name:event.target.value
    })
  }
  emailChange=event=>{
    this.setState({
      email:event.target.value
    })
  }
  passwordChange=event=>{
    this.setState({
      password:event.target.value
    })
  }
  submit= async(event,id)=>{
    event.preventDefault()
    if(id===0){
      await axios.post('http://localhost:8080/api',{name:this.state.name,email:this.state.email,password:this.state.password})
      .then(()=>{
        this.componentDidMount()
      })
    }else{
      await axios.put(`http://localhost:8080/api/${id}`,{name:this.state.name,email:this.state.email,password:this.state.password})
      .then(()=>{
        this.componentDidMount()
      })
    }
  }
  delete= (id)=>{
     axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
  edit=(id)=>{
     axios.get(`http://localhost:8080/api/${id}`)
    .then((res)=>{
      this.setState({
        id:res.data._id,
        name:res.data.name,
        email:res.data.email,
        password:res.data.password
      })
    })
  }
  render(){
  return (
    <div className="row">
      <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.id)}>
          <div className="input-field col s12">
            <i className="material-icons prefix">person</i>
            <input value={this.state.name} onChange={(e)=>this.nameChange(e)} type="text"  className="autocomplete" />
            <label htmlFor="autocomplete-input">name</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">mail</i>
            <input value={this.state.email} onChange={(e)=>this.emailChange(e)} type="email" className="autocomplete" />
            <label htmlFor="autocomplete-input">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">vpn_key</i>
            <input value={this.state.password?this.state.password:''} onChange={(e)=>this.passwordChange(e)} type="password"  className="autocomplete" />
            <label htmlFor="autocomplete-input">Password</label>
          </div>
          <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
          </button>

        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.state.users.map((user)=>{
            return (
            <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>
              <button onClick={(e)=>this.edit(user._id)} className="btn waves-effect waves-light" type="submit" name="action">
                 <i className="material-icons ">edit</i>
               </button>       
            </td>
            <td>
              <button onClick={(e)=>this.delete(user._id)} className="btn waves-effect waves-light" type="submit" name="action">
                 <i className="material-icons ">delete</i>
               </button>       
            </td>
          </tr>)
          })}
          
        </tbody>
      </table>
      </div>

    </div>
  )
  }
}

export default App;
