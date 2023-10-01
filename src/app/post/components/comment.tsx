"use client";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Reply from "./reply";
import { Spinner } from "flowbite-react";
import {
  useRateCommentMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
} from "store/services/mainApi";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostContext } from "@/app/providers/postContext";
import getRandomColor from "./getRandomColour";
import { setUpVote, setDownVote } from "store/slices/userSlice";

function Comment(props: {
  userName: string;
  id: string;
  comment: string;
  replies?: Array<Object>;
  likes?: number;
  dislikes?: number;
  date?: string;
}) {
  const [rateComment, { isLoading, isSuccess }] = useRateCommentMutation();
  const [replyComment] = useReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [showReplyMenu, setShowReplyMenu] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showCommentSettings, setShowCommentSettings] = useState(false);
  const [reply, setReply] = useState("");
  const id = useSelector((state: any) => state.user.postId);
  const user = useSelector((state: any) => state.user.userData);
  const upvotes = useSelector((state: any) => state.user.upvotes);
  const downvotes = useSelector((state: any) => state.user.downvotes);
  const { postId, setPostId } = useContext(PostContext);
  const dispatch = useDispatch();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  //for like and dislike
  const handleRate = async (e: any, commentId: string, action: string) => {
    e.preventDefault();
    if (action === "like" && !isDownvoted && !isUpvoted) {
      dispatch(setUpVote({ id: props.id, userName: user.name }));
      setIsUpvoted(true);
    } else if (isDownvoted) {
      setIsUpvoted(true);
      setIsDownvoted(false);
    }
    if (action === "dislike" && !isDownvoted && !isUpvoted) {
      dispatch(setDownVote({ id: props.id, userName: user.name }));
      setIsDownvoted(true);
    } else if (isUpvoted) {
      setIsUpvoted(false);
      setIsDownvoted(true);
    }
    await rateComment({
      commentId,
      action,
    });
  };
  const replyRef: any = useRef();

  //for posting a comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    await replyComment({
      email: user.email,
      content: reply,
      commentId: props.id,
    }).unwrap();
    replyRef.current.value = "";
    setShowReplyMenu(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setReply(e.target.value);
  };
  const handleDelete= async(e)=>{
    e.preventDefault()
    await deleteComment({
      commentId:props.id
    })
    
  }
  const colorRef = useRef(getRandomColor());

  const hasVoted = (arr: Array<vote>, id: string, username: string) => {
    return arr.some(function (el) {
      return el.id === id;
    });
  };

  return (
    <div>
      <article className="p-6 mb-1 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between relative items-center mb-2">
          <div className="flex items-center">
            <p
              className={`inline-flex items-center mr-3 capitalize text-sm text-gray-900 dark:text-white`}
            >
              <span
                className={`w-8 h-8 mx-2 text-center  rounded-full  text-white text-2xl capitalize`}
                style={{ backgroundColor: colorRef.current }}
              >
                {props.userName.charAt(0)}
              </span>{" "}
              {props.userName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {moment(props.date).format("MMMM Do YYYY ")}
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowCommentSettings((prev) => !prev);
            }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdownComment1"
            className={`${
              showCommentSettings ? "block absolute top-8 right-0" : "hidden"
            } z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul
              className="py-1 text-sm text-gray-700 cursor-pointer dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <div
                  onClick={handleDelete}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Remove
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400 first-letter:capitalize">
          {props.comment}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowReplyMenu((prev) => !prev);
              setShowReply((prev) => !prev);
            }}
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Reply
          </button>
          <div className="text-gray-500 text-sm gap-3 flex ">
            <button
              disabled={hasVoted(upvotes, props.id, user.name)}
              // disabled={ ? true : false}
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => handleRate(e, props.id, "like")}
            >
              <span className="flex items-center gap-1 text-black cursor-pointer ">
                {/* <BsChevronUp className="text-black" size={20} />{" "} */}
                like
                {isLoading ? <Spinner /> : props.likes}
              </span>
            </button>
            {/* <button
              disabled={isDownvoted && hasVoted(upvotes, props.id, user.name)}
              // disabled={hasVoted(downvotes, props.id, user.name) ? true : false}
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => handleRate(e, props.id, "dislike")}
            >
              <span className="flex items-center gap-1 cursor-pointer ">
                <BsChevronDown className="text-black" size={20} />{" "}
                {isLoading ? <Spinner /> : props.dislikes}
              </span>
            </button> */}

            <span
              className="cursor-pointer text-grey-500 text-underline"
              onClick={(e) => {
                e.preventDefault();
                setShowReply((prev) => !prev);
              }}
            >
              {showReply ? "hide replies" : " show replies"}
            </span>
          </div>
        </div>
      </article>
      {/* reply  */}
      <div>
        {showReplyMenu ? (
          <div className="w-[80%] ml-auto">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  ref={replyRef}
                  rows={6}
                  onChange={handleChange}
                  name="comment"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a reply..."
                  required
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                {!isLoading ? "Post reply" : "loading"}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
      {showReply ? (
        props.replies ? (
          props.replies.map((reply: any, index) => (
            <div
              key={index}
              className="transition-all  ease-linear duration-100 p-1 h-auto"
            >
              <Reply
                userName={reply.user.name}
                date={reply.created_at}
                reply={reply.content}
              />
            </div>
          ))
        ) : (
          <div>No replies</div>
        )
      ) : (
        <div className="h-auto"></div>
      )}
    </div>
  );
}

export default Comment;
