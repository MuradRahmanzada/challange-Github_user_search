import React, { useState, useEffect } from "react";
import { BsSun, BsTwitter, BsBuilding, BsMoonFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [boxStatus, setBoxStatus] = useState("hidden");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(data.created_at).toLocaleDateString(options)


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${searchInput}`).then((res) =>
      res.json().then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
          setBoxStatus("block");
          console.log(data);
        }
      })
    );
  };

  return (
    <div className={`w-full h-screen bg-[#f2f4fa] dark:bg-[#141C2F]`}>
      <div className="container mx-auto">
        <div className="p-7 px-5 xl:py-36 xl:px-48">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white">
                devfinder
              </h1>
              <button
                className="flex items-center space-x-3 text-lg"
                onClick={handleThemeSwitch}
              >
                <span className="tracking-wider font-medium text-gray-800 dark:text-white">
                  {theme === "light" ? "DARK" : "LIGHT"}
                </span>
                {theme === "dark" ? (
                  <BsSun className="text-white" />
                ) : (
                  <BsMoonFill className="text-gray-800" />
                )}
              </button>
            </div>

            <div className="py-10">
              <form onSubmit={handleSubmit}>
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <BiSearch className="text-xl text-[#0078FF]" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block p-4 pl-10 w-full text-sm bg-white dark:bg-[#1F2A48] text-gray-800 dark:text-white outline-none"
                    placeholder="Search Github username"
                    required
                    onChange={handleSearch}
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {error ? (
              <h1 className="text-center">{error}</h1>
            ) : (
              <div
                className={`${boxStatus} bg-white dark:bg-[#1F2A48] p-7 xl:px-32  md:p-16 rounded-xl`}
              >
                <div className="flex items-center space-x-5">
                  <div>
                    <img
                      src={data.avatar_url}
                      alt=""
                      className="w-24 h-24 rounded-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div>
                      <h1 className="tracking-wider font-semibold text-gray-800 dark:text-white">
                        {data.name}
                      </h1>
                      <span className="text-[#0278FF]">@{data.login}</span>
                    </div>
                    <div className="flex">
                      <span className="tracking-wider text-sm text-gray-800 dark:text-gray-400">
                         Joined {date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="xl:px-[100px] 2xl:px-[120px] py-9">
                  <p className="text-gray-800 dark:text-white">{data.bio}</p>
                  <div className="flex items-center justify-between md:justify-evenly mt-5  text-center p-5 bg-slate-100 dark:bg-[#141C2F] rounded-xl">
                    <div className="flex flex-col space-y-2">
                      <h1 className="text-gray-500 dark:text-gray-400">
                        Repos
                      </h1>
                      <span className="font-semibold text-lg text-gray-800 dark:text-white">
                        {data.public_repos}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h1 className="text-gray-500 dark:text-gray-400">
                        Followers
                      </h1>
                      <span className="font-semibold text-lg text-gray-800 dark:text-white">
                        {data.followers}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <h1 className="text-gray-500 dark:text-gray-400">
                        Following
                      </h1>
                      <span className="font-semibold text-lg text-gray-800 dark:text-white">
                        {data.following}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between xl:px-4 py-5">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center">
                        <GoLocation className="w-7 h-7 text-gray-800 dark:text-white" />
                        <span className="mx-3 text-black dark:text-white text-base">
                          {data.location ? data.location : "Not Available"}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <AiOutlineLink className="w-7 h-7 text-gray-800 dark:text-white" />
                        <span className="mx-3 text-black dark:text-white text-base">
                          <a href={`https://${data.blog}`}>
                            {data.blog ? data.blog : "Not Available"}
                          </a>
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center">
                          <BsTwitter className="w-7 h-7 text-gray-800 dark:text-white" />
                          <a
                            href={`https://twitter.com/${data.twitter_username}`}
                          >
                            <span className="mx-3 text-black dark:text-white">
                              {data.twitter_username
                                ? data.twitter_username
                                : "Not Available"}
                            </span>
                          </a>
                        </div>

                        <div className="flex items-center">
                          <BsBuilding className="w-7 h-7 text-gray-800 dark:text-white" />
                          <span className="mx-3 text-black dark:text-white text-base">
                            <a href={data.html_url}>@github</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
