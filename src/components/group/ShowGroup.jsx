import { useGetGroupQuery } from "../../api/apiSlice";

const ShowGroup = ({ groupId }) => {
  const {
    data: group,
    isLoading,
    isError,
  } = useGetGroupQuery(groupId, {
    skip: !groupId,
  });

  if (isLoading) {
    return (
      <span className="text-xs text-gray-400">
        در حال بارگذاری...
      </span>
    );
  }

  if (isError || !group) {
    return null;
  }

  return (
    <p
      className="flex w-fit items-center justify-center rounded-full px-4 py-1.5 font-bold"
      style={{
        color: group.color,
        backgroundColor: group.bg,
      }}
    >
      {group.name}
    </p>
  );
};

export default ShowGroup;