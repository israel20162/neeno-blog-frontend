"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/slices/userSlice";
import Link from "next/link";
import { BsLock } from "react-icons/bs";

export default function Nav() {
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.accessToken);
  console.log(user);
  const dispatch = useDispatch()
  const checkIsAdmin = (user) => {
    const userRole = user.userType;
    if (user && userRole === "ADMIN") {
      return (
        <div
          className="flex space-x-1 gap-2"
          onClick={() => {
            dispatch(logout());
          }}
        >
          <BsLock size={20} className="font-extrabold" />
          Sign out
        </div>
      );
    } else {
     
    }
     return <Link href='/login'>Sign in</Link>;
  };
  // if(userRole !== 'ADMIN'){
  //   return(
  //     <div  className="w-screen  flex justify-center items-center h-screen mx-auto ">
  //       Sign in to create post
  //     </div>
  //   )
  // }

  return (
    <div className="w-screen flex  ">
      <nav className=" flex w-full flex-row h-16  py-4 px-4 bg-gray-200  items-center justify-between">
        <div className="w-2/4">
          <ul className="flex justify-evenly items-center w-6/12">
            <li>
              <Link
                href="/admin"
                className="bg-green-600 text-white px-2.5 py-1 rounded block"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                className="bg-green-600 text-white px-2.5 py-1 rounded block"
                href="/admin/drafts"
              >
                Drafts
              </Link>
            </li>
            <li>
              <Link
                className="bg-green-600 text-white px-2.5 py-1 rounded block"
                href="/admin/create"
              >
                Add Post
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <ul className="flex justify-evenly items-center w-6/12">
            <li>
              <div
                href="/admin"
                className="bg-green-600 cursor-pointer text-white px-2.5 py-1 whitespace-nowrap  rounded block"

              >
                {checkIsAdmin(user)}
              </div>
            </li>
            <li>
              <Link href="/admin/drafts"></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
