import { useSelector } from "react-redux"
import { selectUserById } from "../../reducer/userSlice"

const ShowUser =({userId})=>{
    const user = useSelector((state)=>selectUserById(state , userId))
    return(
        <p>
            {/* {user.fullname} */}

            {user ? (<p className="text-gray-500"> این پست توسط {user.fullname} </p>) : (<p>ناشناس</p>)}
        </p>
    )

}
export default ShowUser