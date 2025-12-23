import './App.css';
import User from './getUser/user.jsx';
import AddUser from './adduser/AddUser.jsx';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Update from './updateuser/Update.jsx';
function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<User/>,
    },
  
  {
    path:"/add",
    element:<AddUser/>,
  },
  {
    path:"/update/:id",
    element:<Update/>,
  }
  ]);
  return (
      <RouterProvider router={route}></RouterProvider>
  );
}
export default App;
