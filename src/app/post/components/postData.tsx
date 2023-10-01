"use client";
import { useGetAllPostsQuery, useGetSinglePostQuery } from "store/services/mainApi";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { PostContext } from "@/app/providers/postContext";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

function PostData(props: { postId?: number ,data?:any,loading?:boolean}) {
  const { postId, setPostId } = useContext(PostContext);
   
 
 const id = useSelector((state: any) => state.user.postId);
 const { data, isLoading, isSuccess } = useGetSinglePostQuery(id);

 


  const awaitPost = async()=>{
    return await data
  }

  const post:any = awaitPost()

  useEffect(() => {
    return () => {};
  }, []);
  const parseHtml = (html: string) => {
    const parsedHtml = new DOMParser().parseFromString(html, "text/html");

    return parsedHtml.body.textContent;
  };

 



  if (isLoading) return <div>Loading...</div>;
 const img = fetch(`http://localhost:5000/api/posts/img/${data?.Image?.split('\\')[1]}`);
 console.log(data)
  return (
    <div>
      <section>
        <div className="relative w-[100%] h-72 m-5 rounded bg-blue-5">
          <Image
            src={
              `http://localhost:5000/api/posts/img/${
                data?.Image?.split("\\")[1]
              }` || "./vercel.svg"
            }
            alt="cover image"
            fill
            className="w-full"
            style={{ objectFit: "cover",objectPosition:'center' }}
          ></Image>
        </div>

        <div className="flex items-center mt-10 gap-4">
          <div className="relative rounded-full border border-black  h-20 w-20">
            <Image
             src={"/vercel.svg"}
              alt="cover image"
              fill
              className="p- rounded-full h-20 w-20"
              style={{ objectFit: "contain" }}
            ></Image>
          </div>
          <div className="flex flex-col justify-items-center capitalize justify-start align-baseline ">
            <h1>{data?.author?.name}</h1>
            <span>{moment(data?.created_at).format("MMMM Do YYYY")}</span>
          </div>
          <Link href={`/posts/tags/${data?.tags ? data?.tags.title : "no tag"}`}>
            <span className="bg-red-700 py-1 px-2 font-semibold text-lg text-center capitalize text-white rounded shadow-sm ">
              {data?.tags ? data?.tags[0]?.title : "no tag"}
            </span>
          </Link>
        </div>
        <div className="text-justify mt-10  ">
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.content),
            }}
            className="text-xl first-letter:capitalize leading-loose"
          ></p>
        </div>
      </section>
    </div>
  );
}

export default PostData;
