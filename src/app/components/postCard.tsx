"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import moment from "moment";
import { useContext } from "react";
import { PostContext } from "../providers/postContext";
import { useRouter } from "next/navigation";
import { setPostID } from "store/slices/userSlice";
import { useDispatch } from "react-redux";
export default function PostCard(props: {
  title: string;
  id: number;
  date: string;
  author?: string;
  content: string;
  img?: string;
  tag: string;
}) {
  const parseHtml = (html: string) => {
    const parsedHtml = new DOMParser().parseFromString(html, "text/html");

    return parsedHtml.body.textContent;
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const { postId, setPostId } = useContext(PostContext);

  const handleRouting = (e, link) => {
    e.preventDefault();
    setPostId(props.id);
    dispatch(setPostID(props.id));
    router.push(link);
  };

  return (
    <div className="w-full">
      <div className="px-auto mx-auto w-[80%] grid gap-4">
        <Link
          href={{
            pathname: `/post/${props.title}`,
          }}
        >
          <div
            onClick={(e) => handleRouting(e, `/post/${props.title}`)}
            className="relative  border opacity-90 hover:opacity-100 rounded-lg shadow-2xl bg-blue-100/50  md:h-72  "
          >
            <Image
              alt="Neeon"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
                padding: "0 20px",
              }}
              className="hover:scale-105 hover:transition-transform transition-all !duration-500 opacity-90 hover:opacity-100 ease-in-out"
              src={props.img ? props.img : "/vercel.svg"}
            />
          </div>
        </Link>
        <div>
          <Link href={`/posts/tags/${[props.tag]}`}>
            <span className="bg-red-700 py-1 px-2 font-semibold text-lg text-center capitalize text-white rounded shadow-sm ">
              {props.tag}
            </span>
          </Link>

          <h1 className="text-2xl font-bold capitalize py-2 ">{props.title}</h1>
          <p className="text-sm leading-tight text-justify font-light">
            {parseHtml(props.content)}
          </p>
          <div className="flex items-center my-2 ">
            {" "}
            By
            <span className="text-gray-500 text-sm whitespace-nowrap px-3 font-light capitalize">
              {" "}
              {props.author}
            </span>{" "}
            <span className="flex gap-2 items-center ml-auto pr-12 ">
              <BiCalendar /> {moment(props.date).format("MMMM Do YYYY")}
            </span>
          </div>
          <Link
            href={{
              pathname: `/post/${props.title}`,
            }}
          >
            {" "}
            <span
              onClick={(e) => handleRouting(e, `/post/${props.title}`)}
              className="font-bold text-base max-w-fit items-center rounded  ml-auto pr-8 ease-linear flex transition-colors duration-300"
            >
              <HiOutlineArrowUturnRight />
              Read More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
