import React, {useState, useEffect} from 'react'
import "./user.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';    
const User = () => {
    const[users, setUsers]=useState([]);
    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
               const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
               console.log(response.data);
                setUsers(response.data)
            }
            catch(error)
            {
                console.log("Error fetching users:",error);
            }};
            fetchUsers()
    },[]);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/user/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };
  return (
    <div className = "userTable">
        <Link to="/add" type="button" class="btn btn-primary">Add User
        <i class="fa-solid fa-user-plus"></i>
        </Link>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope= "col"> S.No</th>
                    <th scope= "col"> Name</th>
                    <th scope= "col"> Email</th>
                    <th scope= "col"> Address</th>
                    <th scope= "col"> Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>{
                    return(
                         <tr >
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className="actionButtons">
                                <Link to={`/update/`+user._id} type="button" class="btn btn-info">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button 
                                onClick={()=>deleteUser(user._id)}
                                type="button" class="btn btn-danger">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}



export default User