import React,{useEffect} from 'react'
import axios from 'axios';
import "./update.css";
import { Link ,useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
function UpdateUser() {
    const users ={
        name:"",
        email:"",
        address:"",
    };
    const [user,setUser]=React.useState(users)
    const navigate=useNavigate();
    const {id}=useParams();
    const inputHandler=(e)=>{
        const{name,value}=e.target;
        console.log(name,value);
        setUser({...user,[name]:value});
    };
    useEffect(()=>{
        axios.get((`${process.env.REACT_APP_API_URL}/api/users=${id}`))
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error)=>{
            console.log("Error fetching user data:",error);});
        },[id]);
    
    const submitForm= async(e)=>{
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/api/update/user/${id}`,user)
        .then((response)=>{
           toast.success(response.data.message,{position: "top-right"});

            navigate("/");})
        .catch((error)=>{
            console.log("Error updating user:",error);
        });
    }
  return (
    <div className="AddUser">
        <       Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i>
        </Link>
        <h1>Update User</h1>
        <form className="addUserForm" onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name"
                value={user.name}
                onChange={inputHandler}
                 name="name" autoComplete="off" 
                placeholder="Enter name" required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email"
                value={user.email}
                onChange={inputHandler}
                 name="email" autoComplete="off" 
                placeholder="Enter email" required/>
            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address: </label>
                <input type="text" id="address"
                value={user.address}
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
export default UpdateUser;