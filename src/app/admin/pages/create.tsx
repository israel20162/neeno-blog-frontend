"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FcAddImage } from "react-icons/fc";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import {
  useGetAllTagsQuery,
  useCreateTagMutation,
  useCreatePostMutation,
} from "store/services/mainApi";
import Select from "react-select";
import { useSelector } from "react-redux";


function Create() {
  const user = useSelector((state: any) => state.user.userData);
  const token = useSelector((state: any) => state.user.token);


  const tagRef: React.MutableRefObject<any> = useRef();
  const imageRef = useRef();
  const [tags, setTags] = useState([]);
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState(null);
  const [file, setFile] = useState<File>();
  const [refresh, setRefresh] = useState(false);
  const [newTag, setNewTag] = useState(null);
  const [createTag, { isLoading }] = useCreateTagMutation();

  const CreateTag = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const tag = tagRef?.current?.value;

    if (tag !== "") {
      try {
        await createTag({ tag });
      } catch (error) {
        // alert(error);
      }
    } else {
      alert("Tag title is missing");
    }
    tagRef.current.value = "";
  };

  const { data, error } = useGetAllTagsQuery();
  const loading = useGetAllTagsQuery().isLoading;

  useEffect(() => {
    const getTags = async () => {
      const tagData = await data?.data?.map((data: any) => {
          return { value: data.title, label: data.title };
        })
          setTags(tagData);

    };
    getTags();
  }, [data]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const [createPost] = useCreatePostMutation();

  const errors = useCreatePostMutation().isError;
  const postSuccess = useCreatePostMutation().isSuccess;

  const CreatePost = async () => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("title", postTitle);
    formData.append("content", postContent);
    formData.append("tag", newTag.value);
    formData.append("userType", user.userType);
    formData.append("file", file);
    formData.append("published", "false");


    try {
      await createPost({ data: formData, token })
      if (postSuccess) console.log("post created successfully");
      errors ? alert("error") : "";
    } catch (error) {}
  };

  if (user?.userType === "ADMIN") {
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    };
   
    const publish = () => {};

    console.log(data);
    return (
      <>
        <main className="flex w-screen mt-12 items-center gap-8 justify-center mx-7 h-[65vh]">
          <div className="w-7/12 text h-full rounded-b  border-b border-solid">
            <input
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              className="py-2 w-full px-1  focus:outline-blue-500 outline-1 ring-1 border border-solid mb-2 rounded placeholder:pl-2 "
            />
            <ReactQuill
              theme="snow"
              className="!border-none bg-[#fefcfc] max-h-full h-full overflow-scroll no-scroll"
              value={postContent}
              modules={modules}
              placeholder={"create a new post"}
              onChange={setContent}
            />
          </div>
          <div className="w-3/12 flex h-full  py-2 justify-between  flex-col ">
            <div className="rounded w-full h-1/2 flex-1 border border-solid  px-2 py-4 capitalize  flex flex-col gap-2.5">
              <h2 className="text-lg font-bold">Publish</h2>
              <div>
                status :<span className="text-green"> draft</span>
              </div>
              <div>
                Visibility :<span className=""> draft</span>
              </div>
              <div className="">
                <label
                  htmlFor="file"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="file"
                    accept="*"
                    className="hidden"
                    ref={imageRef}
                    onChange={handleFileChange}
                    style={{ visibility: "hidden" }}
                    id="file"
                    //onClick={(e) => {}}
                  />
                  <FcAddImage size={25} /> Upload cover image
                </label>
              </div>
              <div className="w-full  flex justify-between items-center">
                <Link href={"/adim/drafts"}>
                  {" "}
                  <button className="bg-white text-red-400 border-red-400 border text-sm p-1 rounded hover:bg-red-400 hover:text-white">
                    Save as draft
                  </button>
                </Link>

                <button
                  onClick={CreatePost}
                  className="bg-green-500 text-white capitalize border text-sm p-1 px-2 rounded"
                >
                  publish
                </button>
              </div>
            </div>
            <div className="rounded w-full  flex- !h-[50vh] border border-solid  p-2 flex flex-col gap-2.5">
              <h2 className="text-lg font-bold">Category</h2>
              <div className="flex flex-1 flex-col relative">
                <div className=" overflow-scroll h-full no-scroll">
                  <div className="flex flex-1 justify-center flex-col   text-base capitalize">
                    {!loading ? (
                      <Select
                        defaultValue={newTag}
                        onChange={setNewTag}
                        options={data?.data.map((data: any) => {
                          return { value: data.title, label: data.title };
                        })}
                      />
                    ) : (
                      "loading..."
                    )}
                  </div>
                </div>
                <div>
                  <form
                    action=""
                    onSubmit={(e) => {
                      CreateTag(e);
                    }}
                    className="absolute bottom-0 w-full  flex justify-center items-center"
                  >
                    <input
                      type="text"
                      className=" w-10/12 border outline-none p-1  border-black rounded"
                      name="newTag"
                      ref={tagRef}
                      placeholder="add new category"
                      id=""
                    />
                    <button
                      type="submit"
                      className="w1/4 bg-blue-500 rounded p-1 text-white ml-1"
                    >
                      {isLoading ? "loading" : <BiCheck />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Create;
