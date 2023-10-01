"use client";
import { useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import "./navbar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const currentPage = usePathname()

  return (
    <header className={currentPage.includes('admin') ? "hidden" : "block"}>
      <div className="px-4 py-2  text-white flex  justify-between bg-blue-900">
        <div className="w-1/12">
          <a className="header-image-wrapper self-center py-auto " href="/">
            <Image alt="Neeon" height={60} width={175} src="/logo.png" />
          </a>
        </div>
        <div
          className={
            showMenu
              ? " md:pt-0 pt-10 w-full md:w-auto"
              : "hidden md:flex justify-start w-8/12 pl-9"
          }
          id="menu"
        >
          <ul>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              Home
            </li>
            <li className="dropdown md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 relative">
              <a>Products</a>
            </li>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              AboutUs
            </li>
            <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">
              ContactUs
            </li>
          </ul>
        </div>
        <div className="cursor-pointer md:hidden">
          <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
            htmlFor="menu-btn"
          >
            <span
              onClick={(e) => {
                e.preventDefault();
                handleToggle();
              }}
              className="navicon bg-white-darkest flex items-center relative"
            />
          </label>
        </div>

        <Link href="/register">Register</Link>

        <div className="relative flex items-center z-50  w-2/12">
          <div
            className={
              showSearch
                ? " z-5  flex items-center  bg-blue-900 h-full top-0 marker:text-black"
                : " md:hidde "
            }
          >
            <form action="">
              <input
                type="search"
                name=""
                id="search"
                placeholder="search"
                className=""
                spellCheck
              />
            </form>
          </div>
          <div
            className=" bg-blue-100/50 py-3 px-2 cursor-pointer self-end placeholder:text-yellow-500"
            onClick={(e) => {
              e.preventDefault();
              //setShowSearch((prev) => !prev);
            }}
          >
            <BsSearch size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};
