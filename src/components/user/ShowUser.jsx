import { useSelector } from "react-redux";
import { selectUserById } from "../../features/user/userSlice";

const ShowUser = ({ userId }) => {
  const user = useSelector((state) =>
    selectUserById(state, userId)
  );

  if (!user) {
    return <span className="text-gray-500">ناشناس</span>;
  }

  return (
    <span className="text-gray-500">
      این پست توسط {user.fullname}
    </span>
  );
};

export default ShowUser;