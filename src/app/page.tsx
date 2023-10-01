import Image from 'next/image'
import { BiCalendar } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight, BsLightningCharge } from 'react-icons/bs';
import UseCarousel from './components/carousel'
import Posts from './components/posts';



export default async function Home() {
  const headlines = [
    { title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore iste recusandae, officiis vel veniam consequatur a reprehenderit praesentium porro aliquam unde doloremque, quos ab fugiat ea accusantium ipsa nisi " },
    { title: "content 1" },
    { title: "content 3" },
    { title: "content 2" },
    { title: "content 3" },
    { title: "content 2" },
    { title: "content 3" },
  ];

  return (
    <div className="">
      <main className=" w-full px-12 mx-atuo my-7 ">
        <section className="w-full h-[75vh]    bg-white flex  space-x-1 py-4 rounded px-4">
          <div className="md:w-6/12 w-full rounded-sm  relative bg-blue-50 ">
            {" "}
            <Image
              alt="Neeon"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
                padding: "0 20px",
              }}
              className="hover:scale-105 hover:transition-transform transition-all !duration-500 opacity-90 hover:opacity-100 ease-in-out"
              src="/logo.png"
            />
          </div>
          <div className="w-0.5/12 bg-white"></div>
          <div className="md:w-5/12 w-full rounded-sm flex flex-col justify-around space-y-2 h-full px-12">
            <div className="w-full flex justify-between gap-3">
              <div className="relative bg-blue-100 h-36 rounded-md  w-2/4 mr-auto self-start">
                <Image
                  alt="Neeon"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "0 20px",
                  }}
                  className="hover:scale-105 hover:transition-transform transition-all !duration-500 opacity-90 hover:opacity-100 ease-in-out"
                  src="/vercel.svg"
                />
              </div>
              <div className="flex flex-col justify-around  items-start w-2/4 h-full">
                <span className="text-red-700 font-bold text-left ">r</span>
                <h3 className="font-bold capitalize text-lg text-ellipsis leading-snug w-full  overflow-clip">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </h3>
                <span className="flex gap-2 items-center text-sm text-slate-500  pr-12 ">
                  <BiCalendar /> date
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between gap-3">
              <div className="relative bg-blue-100 h-36 rounded-md  w-2/4 mr-auto self-start">
                <Image
                  alt="Neeon"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "0 20px",
                  }}
                  className="hover:scale-105 hover:transition-transform transition-all !duration-500 opacity-90 hover:opacity-100 ease-in-out"
                  src="/vercel.svg"
                />
              </div>
              <div className="flex flex-col justify-between items-start w-2/4 h-full">
                <span className="text-red-700 font-bold text-left ">r</span>
                <h3 className="font-bold capitalize text-lg text-ellipsis leading-snug w-full  overflow-clip">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </h3>
                <span className="flex gap-2 items-center text-sm text-slate-500  pr-12 ">
                  <BiCalendar /> date
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between gap-3">
              <div className="relative bg-blue-100 h-36 rounded-md  w-2/4 mr-auto self-start">
                <Image
                  alt="Neeon"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "0 20px",
                  }}
                  className="hover:scale-105 hover:transition-transform transition-all !duration-500 opacity-90 hover:opacity-100 ease-in-out"
                  src="/vercel.svg"
                />
              </div>
              <div className="flex flex-col justify-between items-start w-2/4 h-full">
                <span className="text-red-700 font-bold text-left capitalize ">
                  r
                </span>
                <h3 className="font-bold capitalize text-lg text-ellipsis leading-snug w-full  overflow-clip">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </h3>
                <span className="flex gap-2 items-center text-sm text-slate-500  pr-12 ">
                  <BiCalendar /> date
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* ad section */}
        <section className="h-auto w-full px-4"></section>
        {/* posts section */}
        <section className="flex w-full whitespace-nowrap py-2  bg-red-600 text-white text-bold mt-10 items-center">
          <div className="text-extrabold text-yellow-500 w-auto pl-3 flex items-center font-extrabold">
            <BsLightningCharge size={12} />
            latest posts
          </div>
          <UseCarousel items={headlines} interval={5} />
          <div className="flex px-2 gap-1">
            <div className="bg-black/5 p-0.5 h-fit rounded-full border border-black ">
              <BsChevronLeft />
            </div>
            <div className="bg-black/5 p-0.5 h-fit rounded-full border border-black">
              <BsChevronRight />
            </div>
          </div>
        </section>

        <section className="h-auto   bg-white flex  space-x-1 py-4 rounded px-4">
          <div className=" w-full posts list grd gap-1 bg-white">
            <Posts />

          
          </div>
        </section>
      </main>
    </div>
  );
}
