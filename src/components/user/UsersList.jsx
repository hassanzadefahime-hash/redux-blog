import { useDispatch, useSelector } from "react-redux";
// import { addasyncUser, AllUsers, deleteApiUser, selectAllUsers } from "../reducer/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { AllUsers, useAddNewUserMutation, useDeleteUserMutation} from "../../reducer/userSlice"
import { AiOutlineDelete } from "react-icons/ai";

const UsersList = () => {
  const [user, setUser] = useState("");

  const users = useSelector(AllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const [addUser , {isLoading}] = useAddNewUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const handleSubmit = async() => {
    if (user) {
      await addUser({
          id: nanoid(),
          fullname: user,
        }),
      setUser("");
    }
    
  };

  const deleteUsers = (userId) => {
    
      dispatch(deleteUser(userId));
      
  };

  return (
    
    <div className="flex flex-col justify-center items-center md:max-w-2xl max-w-md md:mx-auto mx-auto rounded-lg border-1 border-gray-300  p-4 mt-10">
      <form className="md:w-full w-full relative">
        <input value={user} onChange={handleUserChange} className="block w-full  bg-white  py-2 rounded-lg  border-1 border-gray-200 " ></input>
        <button type="button" onClick={handleSubmit} className="absolute end-0 bottom-0 md:px-3 px-2  py-2 text-md rounded-l-lg bg-green-400 border-1 border-gray-200 text-white">
          افزودن کاربر 
        </button>
      </form>
      {users.map((user) => (
        <div className="flex flex-row my-2 p-3 justify-between items-center w-full border-1 border-gray-300 rounded-lg bg-gray-100">
          <Link to={`/users/${user.id}`} key={user.id} >
            <h3>{user.fullname}</h3>
          </Link>
          <button className="bg-red-400 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => deleteUsers(user.id)}><AiOutlineDelete color="white" fontSize="large"/></button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
