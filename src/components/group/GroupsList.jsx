import { useState } from "react";
import { useGetGroupsQuery } from "../../api/apiSlice";

const GroupsList = () => {
  const { data: groups = [], isLoading, isError } = useGetGroupsQuery();
  const [selectedGroup, setSelectedGroup] = useState(null);

  if (isLoading) {
    return <p className="text-gray-500">در حال دریافت گروه‌ها...</p>;
  }

  if (isError) {
    return <p className="text-red-500">دریافت گروه‌ها با خطا مواجه شد.</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {groups.map((group) => (
        <button
          key={group.id}
          type="button"
          onClick={() => setSelectedGroup(group.id)}
          className={`rounded-lg border p-3 transition ${
            selectedGroup === group.id
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300 bg-white"
          }`}
        >
          <p className="mb-2">{group.name}</p>

          <img
            src={group.img}
            alt={group.name}
            className="w-20 h-20 object-cover rounded-md"
          />
        </button>
      ))}
    </div>
  );
};

export default GroupsList;