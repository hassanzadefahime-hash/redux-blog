import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useDeleteBlogMutation,
  useGetBlogQuery,
} from "../../api/apiSlice";

import ShowTime from "../common/ShowTime";
import Spinner from "../common/Spinner";
import ShowUser from "../user/ShowUser";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // دریافت پست
  const {
    data: blog,
    isLoading,
    isError,
  } = useGetBlogQuery(blogId);

  // حذف پست
  const [deleteBlog, { isLoading: isDeleting }] =
    useDeleteBlogMutation();

  const handleDelete = async () => {
    if (!blog || isDeleting) return;

    try {
      await deleteBlog(blogId).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // در حال بارگذاری
  if (isLoading) {
    return <Spinner text="در حال بارگذاری..." />;
  }

  // خطا در دریافت پست
  if (isError) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-500">
          دریافت پست با خطا مواجه شد.
        </p>
      </div>
    );
  }

  // پست پیدا نشد
  if (!blog) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-gray-500">
          همچین پستی وجود ندارد ...
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg md:w-3/4 w-full mx-auto mt-[6vh] p-8 bg-white flex flex-col gap-y-5 border border-gray-300"
      style={{ textAlign: "start" }}
    >
      {/* عنوان */}
      <h3 className="text-2xl">
        موضوع: {blog.title}
      </h3>

      {/* متن */}
      <p className="text-justify leading-8">
        {blog.content}
      </p>

      {/* نویسنده و تاریخ */}
      <div className="flex gap-1">
        <ShowUser userId={blog.user} />

        <ShowTime timestamp={blog.date} />
      </div>

      {/* دکمه‌ها */}
      <div className="flex md:flex-row gap-2 justify-between flex-col">

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 disabled:bg-gray-300 px-4 py-2 rounded-lg text-white"
        >
          {isDeleting ? "در حال حذف..." : "حذف پست"}
        </button>

        <Link
          to={`/blogs/editblog/${blog.id}`}
          className="bg-green-400 px-4 py-2 rounded-lg text-white text-center"
        >
          ویرایش پست
        </Link>

      </div>
    </div>
  );
};

export default SingleBlogPage;