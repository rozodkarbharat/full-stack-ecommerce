import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import pagination from "../css/pagination.module.css"

const Pagination = ({totalPage,page,setpage,arr}) => {
  const [pageno, setstate] = useState(page)
  return (
    <div className={pagination.box}>
      <button
        disabled={page === 1 ? true : false}
        onClick={() => setpage(page - 1)}
        className={pagination.button}
      >
        {"<"}
      </button>
      {arr &&
        arr.map((elem, index) => {
          return (
            <button
              className={pagination.button}
              key={index}
              onClick={() => setpage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      <button
        disabled={totalPage === page ? true : false}
        onClick={() => setpage(page + 1)}
        className={pagination.button}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
