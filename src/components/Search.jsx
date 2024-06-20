import React, { useContext, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { dataContext } from "../utils/Context";

const Search = () => {
  const [data, setData] = useContext(dataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState(new Set());

  const initialDataSet = useRef(false);

  useEffect(() => {
    if (!initialDataSet.current && data?.length > 0) {
      setFilteredData(data);
      const categories = new Set(data.flatMap((item) => item.category).flat());
      setUniqueCategories(categories);
      initialDataSet.current = true;
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      const search = values.search.toLowerCase();
      if (search.length === 0) {
        setData(filteredData);
        setNoResults(false);
      } else {
        const result = filteredData.filter((item) =>
          item.title.toLowerCase().includes(search)
        );
        if (result.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setData(result);
      }
    },
  });

  const handleCategoryClick = (category) => {
    const filteredByCategory = filteredData.filter((item) =>
      Array.isArray(item.category)
        ? item.category.includes(category)
        : item.category === category
    );
    setData(filteredByCategory);
  };

  const handleReset = () => {
    setData(filteredData);
    setNoResults(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-6 text-gray-800 ">
        StorySeek: Your Gateway to Curated Content
      </h1>
      <div className="flex flex-col  items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="mt-10">
          <input
            onChange={formik.handleChange}
            value={formik.values.search}
            type="text"
            id="search"
            name="search"
            className="py-2 pl-10 pr-4 rounded-full w-96 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md text-black border-[3px] outline-none"
            placeholder="Search for news here..."
          />
        </form>
        <div className="flex flex-col gap-4 w-full items-center mt-5">
          <h1 className="text-xl font-semibold">All News Categories:</h1>

          <div className="flex flex-wrap justify-center gap-6">
            {Array.from(uniqueCategories).map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              >
                {category}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="px-2 py-2 rounded-md border border-red-300 w-[10%] bg-red-400 text-black text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
          >
            Reset Filters
          </button>
        </div>
        {noResults && <div>No Card Found</div>}
      </div>
    </>
  );
};

export default Search;

// {noResults ? <div>No Card Found</div>: ""}
