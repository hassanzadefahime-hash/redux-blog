
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

import { selectUserById } from "../../features/user/userSlice";
import { useGetBlogsQuery } from "../../api/apiSlice";

const SingleUserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) =>
    selectUserById(state, userId)
  );

  const selectUserBlogs = useMemo(
    () =>
      createSelector(
        [
          (result) => result.data ?? [],
          (_result, id) => id,
        ],
        (blogs, id) =>
          blogs.filter((blog) => blog.user === id)
      ),
    []
  );

  const {
    userBlogs = [],
    isLoading,
    isError,
  } = useGetBlogsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      userBlogs: selectUserBlogs(result, userId),
    }),
  });

  if (!user) {
    return (
      <div className="mx-auto mt-10 text-center text-gray-500">
        کاربر موردنظر پیدا نشد.
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 w-full rounded-lg border border-gray-200 bg-white p-6 md:w-3/4">
      <h2 className="mb-6 text-2xl font-bold">
        {user.fullname}
      </h2>

      <h3 className="mb-4 text-lg font-semibold">
        پست‌های نویسنده
      </h3>

      {isLoading ? (
        <p className="text-gray-500">
          در حال دریافت پست‌ها...
        </p>
      ) : isError ? (
        <p className="text-red-500">
          دریافت پست‌ها با خطا مواجه شد.
        </p>
      ) : userBlogs.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {userBlogs.map((blog) => (
            <li
              key={blog.id}
              className="rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          این نویسنده هنوز پستی منتشر نکرده است.
        </p>
      )}
    </section>
  );
};

export default SingleUserPage;