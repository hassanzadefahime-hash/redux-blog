import { formatDistanceToNow, parseISO } from "date-fns-jalali";

const ShowTime = ({ timestamp }) => {
  if (!timestamp) {
    return null;
  }

  const date = parseISO(timestamp);
  const timeAgo = formatDistanceToNow(date);

  return (
    <p className="text-gray-500">
      {timeAgo} پیش منتشر شده است.
    </p>
  );
};

export default ShowTime;