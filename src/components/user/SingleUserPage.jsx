import { useSelector } from "react-redux"
import { selectUserById } from "../../reducer/userSlice"
import { useParams } from "react-router-dom"
import { selectAllBlogs, selectUserBlog } from "../../reducer/blogSlice"
import { useId, useMemo } from "react"
import { createSelector } from "@reduxjs/toolkit"
import { useGetBlogsQuery } from "../../api/apiSlice"

const SingleUserPage =()=>{

     const {userId} = useParams()

     const user = useSelector(state => selectUserById (state,userId))
    //  const blogs = useSelector((state)=>selectUserBlog(state , userId))

     
    const selectUserBlogs = useMemo(()=>{
        const emptyArray = []

        return createSelector(
            (res)=>res.data ,
            (res , userId) => userId,
            (data , userId) => data?.filter(blog=> blog.user === userId )?? emptyArray
        )
    },[])
    const {userBlogs} = useGetBlogsQuery(undefined ,({
        selectFromResult: result => ({
            ...result , 
            userBlogs : selectUserBlogs(result , userId)
        })
    }))
     
    return(
        <>
        <h4>{user.fullname}</h4>
        اثرات
        {userBlogs.map((blog)=>
        (
            <h5 key={blog.id}>
                {blog.title}
            </h5>
        )
        )}
        
        </>
    )
}

export default SingleUserPage