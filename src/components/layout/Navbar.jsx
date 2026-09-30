import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.jpg";
import hero from "../assets/hero.webp";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { useGetBlogsQuery } from "../../api/apiSlice";
const Navbar = () => {
  const [search , setSearch] = useState("")
 
  const {data} = useGetBlogsQuery()
  const {pathname} = useLocation()
  let titleSearch ;
  titleSearch = data?.filter((data)=>data.title.includes(search))
  console.log(titleSearch)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row  min-h-18 flex flex-row justify-between items-center px-[2vw] border-b-1 border-gray-300 bg-white">
        <div className="">
          
          <NavLink to={"/users"}>مشاهده نویسندگان</NavLink>
        </div>
        <Link to="/" className="">  
          <img src={logo} className="h-14 w-auto mx-2" />
          
        </Link>
      </div>
      <div className="relative h-70 w-full">
        <div
          className="absolute inset-0 "
          style={{
            background:
              "linear-gradient(90deg,rgba(0, 0, 0, 0.5) 0%, rgba(176, 59, 0, 0) 100%)",
          }}
        ></div>
        <div className="grid grid-cols-2 w-full h-full absolute">
          <div className=""></div>
          <div className="text-white flex flex-col items-end justify-center px-20 gap-4">
            <div>
              <p className="text-2xl text-white">ایده‌هایی برای خواندن،</p>
              <p className="text-2xl">یاد گرفتن و فکر کردن.</p>
            </div>
            <p className="text-base">
              داستان‌ها، آموزش ها و مطالب جذاب را اینجا پیدا کنید.
            </p>
            {
              pathname==="/" ? (<div className="w-md relative">
              <input
                className="w-full bg-white text-black py-2 px-4 rounded-lg"
                placeholder="جستجو مطالب ..."
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
              />
              <IoMdSearch fontSize={20} className="absolute text-black top-1/2 left-4 -translate-y-1/2"/>
              {search.length > 0 ? (
                  <ul className="absolute bg-gray-100 border-1 border-gray-200 top-11 w-full overflow-hidden  flex flex-col gap-2 rounded-lg">
                    {search &&
                      titleSearch.length > 0 ? (titleSearch.map((blog) => (
                        <Link to={`/blogs/${blog.id}`}>
                          <li className="flex flex-row text-gray-800 px-5 py-2 items-center gap-4 hover:bg-white  transition delay-150 duration-300 ease-in-out">
                            
                            {blog.title}
                          </li>
                        </Link>
                      ))) :(<div className="text-lg text-center py-4 text-gray-800">موجود نیست</div>)}
                  </ul>
                  
                ) : (
                  ""
                )}
            </div>):(<div></div>)
            }
            
          </div>
        </div>
        <img src={hero} className="h-full w-full" />
      </div>
    </div>
  );
};
export default Navbar;
