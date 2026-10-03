import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { AiOutlineDelete } from "react-icons/ai";

import {
useGetUsersQuery,
useAddNewUserMutation,
useDeleteUserMutation,
} from "../../features/user/userSlice";

const UsersList = () => {
const [user, setUser] = useState("");

const {
data: usersState,
isLoading,
isError,
} = useGetUsersQuery();

const [addUser, { isLoading: isAdding }] =
useAddNewUserMutation();

const [deleteUser, { isLoading: isDeleting }] =
useDeleteUserMutation();

const users = usersState?.entities
? Object.values(usersState.entities)
: [];

const handleSubmit = async (event) => {
event.preventDefault();

```
const fullname = user.trim();

if (!fullname || isAdding) {
  return;
}

try {
  await addUser({
    id: nanoid(),
    fullname,
  }).unwrap();

  setUser("");
} catch (error) {
  console.error("خطا در افزودن کاربر:", error);
}
```

};

const handleDelete = async (userId) => {
if (isDeleting) {
return;
}

```
try {
  await deleteUser(userId).unwrap();
} catch (error) {
  console.error("خطا در حذف کاربر:", error);
}
```

};

if (isLoading) {
return ( <p className="py-10 text-center text-gray-500">
در حال دریافت نویسندگان... </p>
);
}

if (isError) {
return ( <p className="py-10 text-center text-red-500">
دریافت نویسندگان با خطا مواجه شد. </p>
);
}

return ( <section className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center rounded-lg border border-gray-300 bg-white p-4"> <form
     onSubmit={handleSubmit}
     className="relative mb-4 w-full"
   >
<input
type="text"
value={user}
onChange={(event) => setUser(event.target.value)}
placeholder="نام کاربر..."
className="block w-full rounded-lg border border-gray-200 bg-white py-2 pe-32 ps-4 outline-none focus:border-blue-400"
/>


    <button
      type="submit"
      disabled={isAdding}
      className="absolute bottom-0 end-0 rounded-l-lg border border-gray-200 bg-green-400 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {isAdding ? "در حال افزودن..." : "افزودن کاربر"}
    </button>
  </form>

  <div className="flex w-full flex-col gap-2">
    {users.length > 0 ? (
      users.map((user) => (
        <div
          key={user.id}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-3"
        >
          <Link
            to={`/users/${user.id}`}
            className="transition hover:text-blue-600"
          >
            <h3>{user.fullname}</h3>
          </Link>

          <button
            type="button"
            disabled={isDeleting}
            onClick={() => handleDelete(user.id)}
            aria-label={`حذف ${user.fullname}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-400 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <AiOutlineDelete
              color="white"
              size={22}
            />
          </button>
        </div>
      ))
    ) : (
      <p className="py-4 text-center text-gray-500">
        هنوز کاربری وجود ندارد.
      </p>
    )}
  </div>
</section>


);
};

export default UsersList;
