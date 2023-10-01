"use client";
import React from "react";
import PostCard from "./postCard";
import {useEffect,useState} from "react";
import { useGetAllPostsQuery } from "store/services/mainApi";

function Posts(props:{data?:Array<Post>,loading?:boolean}) {

  const [posts,setPosts] = useState([])
const { data, isLoading, isError } = useGetAllPostsQuery();
  


  
console.log(data);
  return (
    <div className="grid grid-cols-3 w-full posts list grd gap-1 bg-white">
      {!isLoading
        ? data.map((data: Post, index: number) => (
            <div key={index}>
              <PostCard
                title={data.title}
                img={"./vercel.svg"}
                tag={data.tags[0]?.title?data.tags[0]?.title:'no tag'}
                author={data.author.name}
                content={data.content}
                date={data.created_at}
                id={data.id}
              />
            </div>
          ))
        : "Loading..."}
    </div>
  );
  /**/
}

export default Posts;
