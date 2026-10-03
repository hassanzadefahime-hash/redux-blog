
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  AllUsers,
  useGetUsersQuery,
} from "../../features/user/userSlice";

import {
  useAddNewBlogMutation,
  useGetGroupsQuery,
} from "../../api/apiSlice";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [group, setGroup] = useState("");

  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();

  const { data: groups = [] } = useGetGroupsQuery();

  // اجرای درخواست دریافت کاربران
  const {
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery();

  const navigate = useNavigate();

  const users = useSelector((state) => AllUsers(state));

  const canSave =
    [title, content, userId, group].every(Boolean) &&
    !isLoading &&
    !isUsersLoading;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    try {
      await addNewBlog({
        id: nanoid(),
        date: new Date().toISOString(),
        title,
        content,
        user: userId,
        group,
        reactions: {
          thumbsUp: "0",
          hooray: "0",
          heart: "0",
          rocket: "0",
          eyes: "0",
        },
      }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      setGroup("");

      navigate("/");
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:max-w-2xl max-w-md md:mx-auto mx-auto rounded-lg border border-gray-300 bg-white mt-[6vh] p-4">
      <h2 className="text-2xl mb-8">افزودن پست</h2>

      <form onSubmit={onSubmitForm} className="md:w-3/4 w-5/6">
        <div className="flex flex-col w-full items-center gap-6">

          {/* عنوان */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title">عنوان پست:</label>

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

          {/* نویسنده */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="user">انتخاب نویسنده:</label>

            <select
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={isUsersLoading}
              className="block md:w-1/2 w-full bg-white px-3 py-1 border border-gray-300"
            >
              <option value="" disabled>
                {isUsersLoading
                  ? "در حال دریافت نویسندگان..."
                  : "انتخاب نویسنده"}
              </option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullname}
                </option>
              ))}
            </select>

            {isUsersError && (
              <p className="text-red-500 text-sm">
                دریافت نویسندگان با خطا مواجه شد.
              </p>
            )}
          </div>

          {/* گروه */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="group">انتخاب گروه:</label>

            <select
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="block md:w-1/2 w-full bg-white px-3 py-1 border border-gray-300"
            >
              <option value="" disabled>
                انتخاب گروه
              </option>

              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* متن */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="content">متن پست:</label>

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
            {isLoading ? "در حال افزودن..." : "افزودن پست"}
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddBlog;

