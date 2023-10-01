import { useSelector } from "react-redux";
import { useGetAllPostsQuery, useGetSinglePostQuery } from "store/services/mainApi";
import CommentSection from "../components/commentsSection";
import PostData from "../components/postData";

async function Post() {
    
  return (
    <main className="flex bg-white w-screen px-20 gap-10  mx-auto max-h-full !h-full overflow-scroll no-scroll  ">
      <section className="flex-[5] h-full mt-5">
        <PostData />
        <section>
          <CommentSection />
        </section>
      </section>

      {/* comment section */}

      <section className="flex-[2]  h-full mt-5 rounded flex-col flex  ">
        <h1 className="text-xl font-bold ">Other posts you may like</h1>
      </section>
    </main>
  );
}



// export async function generateStaticParams() {
//   async function GetPost() {
//     const { data, isLoading, isError } = useGetAllPostsQuery();

//     return data;
//   }
//   const postData: Promise<Post[]> = GetPost();

//   const post = await postData;
//   return post.map((post) => {
//     {
//       id: post.id.toString();
//     }
//   });
// }

export default Post;
