import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

import {
  useGetBlogsQuery,
  useGetGroupsQuery,
} from "../../api/apiSlice";

import ShowTime from "../common/ShowTime";
import Spinner from "../common/Spinner";
import ShowUser from "../user/ShowUser";
import ShowGroup from "../group/ShowGroup";
import ReactionButtons from "./ReactionButtons";

import allPostsImage from "../../assets/five.png";

const BlogsList = () => {
  const [selectedGroup, setSelectedGroup] = useState("all");

  // دریافت مطالب
  const {
    data: blogs = [],
    isError,
    isLoading,
    error,
  } = useGetBlogsQuery();

  // دریافت گروه‌ها
  const { data: groups = [] } = useGetGroupsQuery();

  // مرتب‌سازی مطالب بر اساس تاریخ
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  }, [blogs]);

  // فیلتر کردن مطالب بر اساس گروه انتخاب‌شده
  const filteredBlogs = useMemo(() => {
    if (selectedGroup === "all") {
      return sortedBlogs;
    }

    return sortedBlogs.filter(
      (blog) => blog.group === selectedGroup
    );
  }, [sortedBlogs, selectedGroup]);

  // وضعیت بارگذاری
  if (isLoading) {
    return <Spinner text="در حال بارگذاری..." />;
  }

  // وضعیت خطا
  if (isError) {
    return (
      <div className="w-full flex justify-center items-center mt-10">
        <p className="text-red-500">
          خطا در دریافت مطالب
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center gap-6">

      {/* ================= دسته‌بندی‌ها ================= */}
      <div className="grid md:grid-cols-5 w-3/4 grid-cols-2 gap-4 mt-[4vh]">

        {/* همه پست‌ها */}
        <button
          type="button"
          onClick={() => setSelectedGroup("all")}
          className="p-4 rounded-lg flex items-center justify-center flex-col gap-2"
          style={{
            backgroundColor:
              selectedGroup === "all"
                ? "oklch(87.2% 0.01 258.338)"
                : "white",
          }}
        >
          <img
            src={allPostsImage}
            alt="همه پست‌ها"
            className="h-28"
          />

          <p>همه پست‌ها</p>
        </button>

        {/* گروه‌ها */}
        {groups.map((group) => (
          <button
            type="button"
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            className="p-4 rounded-lg flex items-center justify-center flex-col gap-2"
            style={{
              backgroundColor:
                selectedGroup === group.id
                  ? "oklch(87.2% 0.01 258.338)"
                  : "white",
            }}
          >
            
            <img
              src={group.img.replace("/images/", "/")}
              alt={group.name}
              className="h-28"
            />

            <p>{group.name}</p>
          </button>
        ))}
      </div>

      {/* ================= ایجاد پست ================= */}
      <div className="w-full md:w-3/4 flex">
        <Link
          to="/blogs/add-post"
          className="h-10 px-2.5 bg-green-400 md:mx-0 mx-auto rounded-lg text-white flex flex-row gap-1 items-center justify-center"
        >
          <GoPlus size={20} />

          <p>ایجاد پست جدید</p>
        </Link>
      </div>

      {/* ================= لیست مطالب ================= */}
      <div className="w-full flex flex-col gap-4">

        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">
            مطلبی در این گروه وجود ندارد.
          </p>
        ) : (
          filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-lg md:w-3/4 w-full p-8 flex flex-col mx-auto gap-y-5 border border-gray-300 bg-white"
              style={{ textAlign: "start" }}
            >

              {/* گروه */}
              <ShowGroup groupId={blog.group} />

              {/* عنوان */}
              <h1 className="text-3xl">
                {blog.title}
              </h1>

              {/* متن */}
              <p className="text-xl line-clamp-3 leading-10">
                {blog.content}
              </p>

              {/* نویسنده و تاریخ */}
              <div className="flex gap-1">
                <ShowUser userId={blog.user} />

                <ShowTime timestamp={blog.date} />
              </div>

              {/* واکنش و مشاهده پست */}
              <div className="flex md:flex-row justify-between flex-col gap-y-4">

                <ReactionButtons blog={blog} />

                <Link
                  to={`/blogs/${blog.id}`}
                  className="md:px-4 md:py-2 py-2 px-4 rounded-lg bg-gray-200 text-center flex flex-row items-center justify-center gap-2"
                >
                  <p>مشاهده پست</p>

                  <FaArrowLeft />
                </Link>

              </div>

            </article>
          ))
        )}

      </div>

    </div>
  );
};

export default BlogsList;