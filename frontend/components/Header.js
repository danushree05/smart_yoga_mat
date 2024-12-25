// import React, { useContext, useState } from 'react'
// import Logo from './Logo'
// import { GrSearch } from "react-icons/gr";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify'
// import { setUserDetails } from '../store/userSlice';
// import ROLE from '../common/role';
// import Context from '../context';
// import { IoMdHome } from "react-icons/io";
// import { FaGift } from "react-icons/fa6";

// const Header = () => {
//   const user = useSelector(state => state?.user?.user)
//   const dispatch = useDispatch()
//   const [menuDisplay,setMenuDisplay] = useState(false)
//   const context = useContext(Context)
//   const navigate = useNavigate()
//   const searchInput = useLocation()
//   const URLSearch = new URLSearchParams(searchInput?.search)
//   const searchQuery = URLSearch.getAll("q")
//   const [search,setSearch] = useState(searchQuery)

//   const handleLogout = async() => {
//     const fetchData = await fetch(SummaryApi.logout_user.url,{
//       method : SummaryApi.logout_user.method,
//       credentials : 'include'
//     })

//     const data = await fetchData.json()

//     if(data.success){
//       toast.success(data.message)
//       dispatch(setUserDetails(null))
//       navigate("/")
//     }

//     if(data.error){
//       toast.error(data.message)
//     }

//   }

//   const handleSearch = (e)=>{
//     const { value } = e.target
//     setSearch(value)

//     if(value){
//       navigate(`/search?q=${value}`)
//     }else{
//       navigate("/search")
//     }
//   }
//   return (
//     <header className="h-16 shadow-md bg-white fixed w-full z-40">
//       <div className=" h-full container mx-auto flex items-center px-4 justify-between">
//         <div className="flex gap-4 items-center">
//           <Link to={"/"}>
//             <IoMdHome className="text-4xl items-center" />
//           </Link>

//           <Link to={"/ewastepage"}>
//             <Logo />
//           </Link>
//         </div>

//         <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
//           <input
//             type="text"
//             placeholder="search product here..."
//             className="w-full outline-none"
//             onChange={handleSearch}
//             value={search}
//           />
//           <div className="text-lg min-w-[50px] h-8 bg-gray-600 flex items-center justify-center rounded-r-full text-white">
//             <GrSearch />
//           </div>
//         </div>

//         <div className="flex items-center gap-7">
//           <div className="relative flex justify-center">
//             {user?._id && (
//               <div
//                 className="text-3xl cursor-pointer relative flex justify-center"
//                 onClick={() => setMenuDisplay((preve) => !preve)}
//               >
//                 {user?.profilePic ? (
//                   <img
//                     src={user?.profilePic}
//                     className="w-10 h-10 rounded-full"
//                     alt={user?.name}
//                   />
//                 ) : (
//                   <FaRegCircleUser />
//                 )}
//               </div>
//             )}

//             {menuDisplay && (
//               <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
//                 <nav>
//                   {user?.role === ROLE.ADMIN && (
//                     <Link
//                       to={"/admin-panel/all-products"}
//                       className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
//                       onClick={() => setMenuDisplay((preve) => !preve)}
//                     >
//                       Admin Panel
//                     </Link>
//                   )}
//                 </nav>
//               </div>
//             )}
//           </div>
//           <div className='text-2xl'>
//             <FaGift />
//           </div>
//           {user?._id && (
//             <Link to={"/cart"} className="text-2xl relative">
//               <span>
//                 <FaShoppingCart />
//               </span>

//               <div className="bg-gray-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
//                 <p className="text-sm">{context?.cartProductCount}</p>
//               </div>
//             </Link>
//           )}

//           <div>
//             {user?._id ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 rounded-full text-white bg-gray-600 hover:bg-gray-700"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to={"/login"}
//                 className="px-3 py-1 rounded-full text-white bg-gray-600 hover:bg-gray-700"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header
import React, { useContext, useState, useEffect } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { IoMdHome } from "react-icons/io";
import { FaGift } from "react-icons/fa6";
import { HiFire } from "react-icons/hi";
import { GrYoga } from "react-icons/gr";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    if (user?.role === ROLE.TRADER && user?._id) {
      fetchAssignedTasks();
    }
  }, [user]);

  const fetchAssignedTasks = async () => {
    try {
      const response = await fetch(
        SummaryApi.getAssignedTasks.url.replace(":userId", user._id),
        {
          method: SummaryApi.getAssignedTasks.method,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        setAssignedTasks(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
            <IoMdHome className="text-4xl items-center" />
          </Link>

          <Link to={"/ewastepage"}>
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-gray-900 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <nav className="flex justify-between items-center px-8 py-4">
              {/* <h1 className="text-3xl font-bold">Smart Yoga Mat</h1> */}
              <div className="space-x-6">
                <a href="#about" className="text-lg hover:text-gray-400">
                  About
                </a>
                <a href="/plans" className="text-lg hover:text-gray-400">
                  Plans
                </a>
                <a href="/dashboard" className="text-lg hover:text-gray-400">
                 Dashboard
                </a>
                <a href="/detect" className="text-lg hover:text-gray-400">
                 Detect
                </a>

              </div>
            </nav>
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user?.role === ROLE.TRADER && (
                    <Link
                      to={"/assigned-tasks"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      My Tasks
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div className="text-2xl">
            <FaGift />
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-3xl relative">
              <span>
                <HiFire />
              </span>

              <div className="bg-gray-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-gray-900 hover:bg-gray-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-gray-900 hover:bg-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

