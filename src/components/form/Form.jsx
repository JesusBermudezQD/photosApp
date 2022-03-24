import React from "react";
import "./Form.css";

const Form = ({handleInput,handleSearch}) => {
  return (
    <form className="form" onSubmit={handleSearch}>
      <input type="text" className="" onChange={handleInput}/>
      <button className="">Buscar</button>
    </form>
  );
};

export default Form;
