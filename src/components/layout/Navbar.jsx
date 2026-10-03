
import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

import { useGetBlogsQuery } from "../../api/apiSlice";
import logo from "../../assets/logo.jpg";
import hero from "../../assets/hero.webp";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useGetBlogsQuery();

  const filteredBlogs = useMemo(() => {
    const searchTerm = search.trim().toLocaleLowerCase();

    if (!searchTerm) return [];

    return blogs.filter((blog) =>
      blog.title?.toLocaleLowerCase().includes(searchTerm)
    );
  }, [blogs, search]);

  const showSearch = pathname === "/" && search.trim().length > 0;

  return (
    <header className="flex w-full flex-col">
      {/* نوار بالای سایت */}
      <div className="flex min-h-18 items-center justify-between border-b border-gray-300 bg-white px-[2vw]">
        <NavLink
          to="/users"
          className="text-gray-700 transition hover:text-blue-600"
        >
          مشاهده نویسندگان
        </NavLink>

        <Link to="/" aria-label="صفحه اصلی">
          <img
            src={logo}
            alt="لوگوی سایت"
            className="mx-2 h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* بنر اصلی */}
      <section className="relative h-70 w-full overflow-hidden">
        <img
          src={hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(176, 59, 0, 0) 100%)",
          }}
        />

        <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block" />

          <div className="flex flex-col items-end justify-center gap-4 px-5 text-right text-white md:px-10 lg:px-20">
            <div>
              <p className="text-2xl">ایده‌هایی برای خواندن،</p>
              <p className="text-2xl">یاد گرفتن و فکر کردن.</p>
            </div>

            <p className="text-sm md:text-base">
              داستان‌ها، آموزش‌ها و مطالب جذاب را اینجا پیدا کنید.
            </p>

            {pathname === "/" && (
              <div className="relative w-full max-w-md">
                <input
                  type="search"
                  aria-label="جست‌وجوی مطالب"
                  className="w-full rounded-lg bg-white py-2 pl-12 pr-4 text-black outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="جست‌وجوی مطالب ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <IoMdSearch
                  size={22}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                />

                {showSearch && (
                  <ul className="absolute top-11 z-20 flex max-h-64 w-full flex-col gap-1 overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 py-1 text-gray-800 shadow-lg">
                    {isLoading ? (
                      <li className="px-5 py-3 text-center">
                        در حال جست‌وجو...
                      </li>
                    ) : isError ? (
                      <li className="px-5 py-3 text-center text-red-500">
                        دریافت مطالب با خطا مواجه شد.
                      </li>
                    ) : filteredBlogs.length > 0 ? (
                      filteredBlogs.map((blog) => (
                        <li key={blog.id}>
                          <Link
                            to={`/blogs/${blog.id}`}
                            onClick={() => setSearch("")}
                            className="block px-5 py-2 transition hover:bg-white"
                          >
                            {blog.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-5 py-3 text-center">
                        مطلبی پیدا نشد.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Navbar;