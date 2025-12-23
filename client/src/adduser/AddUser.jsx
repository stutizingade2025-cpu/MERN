import React from 'react'
import axios from 'axios';
import "./adduser.css";
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';
function AddUser() {
    const users ={
        name:"",
        email:"",
        address:"",
    };
    const [user,setUser]=React.useState(users)
    const navigate=useNavigate();
    const inputHandler=(e)=>{
        const{name,value}=e.target;
        console.log(name,value);
        setUser({...user,[name]:value});
    };
    const submitForm= async(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/user",user)
        .then((response)=>{
            toast.success(response.data.message,{position: "top-right"});
        
            navigate("/");})
        .catch((error)=>{
            console.log("Error adding user:",error);
        });
    }
  return (
    <div className="AddUser">
        <       Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i>
        </Link>
        <h1>Add New User</h1>
        <form className="addUserForm" onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name"
                onChange={inputHandler}
                 name="name" autoComplete="off" 
                placeholder="Enter name" required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email"
                onChange={inputHandler}
                 name="email" autoComplete="off" 
                placeholder="Enter email" required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address: </label>
                <input type="text" id="address"
                onChange={inputHandler}
                 name="address" autoComplete="off" 
                placeholder="Enter address" required/>
            </div>
            <div className="inputGroup">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}
export default AddUser;