"use client";
import React, { useContext, useRef } from "react";
import Comment from './comment';
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "store/services/mainApi";
import { useState } from "react";
import { PostContext } from "@/app/providers/postContext";

function CommentSection() {
  const id = useSelector((state: any) => state.user.postId);
  const commentRef: any = useRef();
  const user = useSelector((state: any) => state.user.userData);
  const { postId, setPostId } = useContext(PostContext);
  const [comment, setComment] = useState(null);
  const [createComment, { isError, isLoading }] = useCreateCommentMutation();
  const { data, isSuccess } = useGetCommentsQuery(
    id ? Number(id) : Number(postId)
  );
  console.log(data);
  const IsLoadingComments = useGetCommentsQuery().isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
  const res=  await createComment({
      email: user.email,
      content: comment,
      postId: id,
    }).unwrap();
    commentRef.current.value=''
  };
  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  return (
    <section className="w-full mt-10">
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({!IsLoadingComments ? data?.length:'0'})
            </h2>
          </div>

          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                ref={commentRef}
                rows={6}
                onChange={handleChange}
                name="comment"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {!isLoading ? "Post comment" : "loading"}
            </button>
          </form>

          {IsLoadingComments
            ? "loading"
            : data?.length > 0
            ? data.map((comment:Comments) => (
                <div key={comment.id}>
                  <Comment userName={comment.user.name} id={comment.id} date={comment.created_at} comment={comment.content} replies={comment.replies} likes={comment.likes} dislikes={comment.dislikes}/>
                </div>
              ))
            : "NO COMMENTS FOR THIS POST"}
        </div>
      </section>
    </section>
  );
}

export default CommentSection;
