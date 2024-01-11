// Home.jsx
// import React from 'react';
import { useParams,Outlet, useNavigate } from 'react-router-dom';
import NavigationBar from './navbarMenu/NavigationBar';


const Home = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  function logout(){
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div>
      <header>
      {/* <h1>Home Page🏠</h1> */}
        <NavigationBar id={id} logout={logout}/>
      </header>
      <Outlet />
    </div>
  );
};

export default Home;
