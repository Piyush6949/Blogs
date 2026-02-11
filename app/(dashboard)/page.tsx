import BlogItem from "@/components/web/blogitem";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="basis-2/3 flex flex-col" >
          <h2 className=" p-4 m-4 text-3xl self-center">Popular Blogs</h2>
          <div className="p-4 mx:10 md:mx-20 flex-col justify-centre">
            <BlogItem></BlogItem>
            <BlogItem></BlogItem>
          </div>
        </div>

        <div className="basis-1/3 flex flex-col ">
          <h2 className=" p-4 m-4 text-3xl self-center">Your Picked</h2>
          <div className="p-4 mx:10 md:mx-10 flex-col justify-centre">
            <BlogItem></BlogItem>
            <BlogItem></BlogItem>
          </div>
        </div>
      </div>

    </>
  );
}
