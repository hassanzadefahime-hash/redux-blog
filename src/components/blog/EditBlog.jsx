import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useEditBlogMutation,
  useGetBlogQuery,
} from "../../api/apiSlice";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // دریافت پست
  const {
    data: blog,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useGetBlogQuery(blogId);

  // ویرایش پست
  const [updateBlog, { isLoading: isUpdating }] =
    useEditBlogMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // قرار دادن اطلاعات پست داخل فرم
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
    }
  }, [blog]);

  const canSave =
    title.trim() !== "" &&
    content.trim() !== "" &&
    !isUpdating;

  const submitForm = async (e) => {
    e.preventDefault();

    if (!canSave || !blog) return;

    try {
      await updateBlog({
        id: blogId,
        date: blog.date,
        title: title.trim(),
        content: content.trim(),
        user: blog.user,
        group: blog.group,
        reactions: blog.reactions,
      }).unwrap();

      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  // در حال دریافت پست
  if (isBlogLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p>در حال دریافت اطلاعات پست...</p>
      </div>
    );
  }

  // خطا در دریافت پست
  if (isBlogError || !blog) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-red-500">
          دریافت اطلاعات پست با خطا مواجه شد.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center md:max-w-2xl max-w-md md:mx-auto mx-auto rounded-lg border border-gray-300 bg-white mt-[6vh] p-4">

      <h2 className="text-2xl mb-8">
        ویرایش پست
      </h2>

      <form
        onSubmit={submitForm}
        className="md:w-3/4 w-5/6"
      >
        <div className="flex flex-col w-full items-center gap-6">

          {/* عنوان */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title">
              عنوان پست:
            </label>

            <input
              name="title"
              id="title"
              type="text"
              placeholder="عنوان پست..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white p-1 rounded-lg border border-gray-200 w-full"
            />
          </div>

          {/* متن */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="content">
              متن پست:
            </label>

            <textarea
              name="content"
              id="content"
              rows={4}
              placeholder="متن را وارد کنید"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-white p-1 rounded-lg border border-gray-200 w-full"
            />
          </div>

          {/* دکمه */}
          <button
            type="submit"
            disabled={!canSave}
            className="bg-green-400 disabled:bg-gray-300 px-4 py-2 rounded-lg text-white"
          >
            {isUpdating
              ? "در حال ویرایش..."
              : "ویرایش پست"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditBlog;