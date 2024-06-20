import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import App from "../App";

export const dataContext = createContext();

const Context = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); 
  const [category, setCategory] = useState("general")

  useEffect(() => {
    const API_KEY = "AObXykcrj-ZJpFy2_rKtFj1i2uGwvHRbocfS4K8CUz48H7u6";
    const URL = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${API_KEY}`;
    const getData = async () => {
      try {
        const rawData = await axios.get(URL);
        console.log(rawData)
        const articles = rawData.data.news;
        setData(articles);
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };
    getData();
  }, []); 


  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-grey-500 rounded-full animate-spin border-b-transparent"></div>
  </div>;
  }

  return (
    <dataContext.Provider value={[data, setData]}>
      {props.children}
    </dataContext.Provider>
  );
};

export default Context;
