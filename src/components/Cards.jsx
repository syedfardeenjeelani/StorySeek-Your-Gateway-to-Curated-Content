import React, { useState } from "react";
import { useContext } from "react";
import { dataContext } from "../utils/Context";

const Cards = () => {
  const [cards, setCards] = useContext(dataContext);
  console.log(cards , "cards in cards")

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const cardss = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (<div className="flex flex-col justify-between  mt-[1rem] h-[100vh] gap-20">
     <div className="flex justify-center items-center gap-6 h-[55vh] flex-wrap w-full">
      {cards?.length > 0 ? (
        cardss.map((article, ii) => (
          <div key={ii}>
            <div className="w-[300px] rounded-2xl hover:bg-blue-50 shadow-lg transform border-[2px] py-[2rem] px-[2rem] transition duration-500 hover:scale-105 bg-white">
                <img src={article.image.length == 4  ? "data:image/png;base64,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" : article.image} alt="" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {article?.title
                    ? article.title.slice(0, 38) + "..."
                    : article.title}
                </div>
                <p className="text-gray-700 text-base">
                  {article?.description
                    ? article.description.slice(0, 30) + "..."
                    : "Description not found!! Description..."}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 hover:text-black hover:border-2 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                >
                  Read More
                </a>
              </div>
              <div className="px-6 pt-4 pb-2">
                <p className="text-gray-600 text-sm">Language :<span className="text-black text-lg">{article.language}</span></p>
                
                <p className="text-gray-600 text-sm">
                  authour: <span className="text-black text-lg">{article.author.slice(0,5) + "..."}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-grey-500 rounded-full animate-spin border-b-transparent"></div>
        </div>
      )}
       <div 
            className="mb-[5vh] w-full flex justify-center   rounded-md shadow-sm -space-x-px"
           
          >
            {Array.from(
              { length: Math.ceil(cards.length / cardsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={` inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 ${
                    currentPage === i + 1 ? "bg-gray-200" : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
    </div>
   
  </div>
  );
};

export default Cards;
