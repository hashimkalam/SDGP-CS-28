import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToProfileOrDashboard = () => {
    currentUser.user.role === "architect"
      ? navigate("/dashboard")
      : navigate("/Workspace");
  };


  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };


  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
    } catch (error) {}
    navigate("/login");
  };

  let Links = [

    {name:"HOME", link:"/"},
    {name:"HOW IT WORKS", link:"/"},
    {name:"PRICING", link:"/"},
  ];

  let [open,setOpen]=useState(false);

  return (
    <div className='w-full fixed top-0 left-0 z-50'>

      <div className='md:flex shadow-md bg-white items-center justify-between py-4 md:px-8 px-7'>
        <a className='cursor-pointer' href=''><img src={Logo} className="h-14" alt="Logo"/></a>

        <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close':'menu'} className='text-white'></ion-icon>
        </div>

        <ul className={`md:flex md:bg-none bg-white md:items-center md:pb-0 pb-3 absolute md:static  md:z-auto z-[-1] 
        left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
          
            {
              Links.map((link)=>(

                <li key={link.name} className='md:ml-10 mr-8 md:text-xl text-lg font-semibold font-Inter-Regular md:my-0 my-6'>
                  <a href={link.link} className='text-[#1d2144] hover:text-[#004EC3] duration-500'>{link.name}</a>
                </li>
              ))
            }

          <div className='login md:ml-[120px] flex md:flex-row flex-col md:my-0 my-7'>

            <button className='bg-[#002865] text-white md:text-xl text-lg font-semibold py-2 px-6 rounded-full md:ml-8 md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500'
            onClick={navigateToLogin}>
              LOGIN
            </button>

            <button className='signup bg-[#002865] text-white md:text-xl text-lg font-semibold py-2 px-6 rounded-full md:ml-8 md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500 md:my-0 my-7'
            onClick={navigateToSignup}>
              REGISTER
            </button>

          </div>
          
        </ul>
      </div>


    </div>
  );
};

export default Navbar;
