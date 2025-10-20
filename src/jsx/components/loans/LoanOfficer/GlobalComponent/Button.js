import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Button = ({handleSubmit,btntext}) => {
  return (
    <>
      <button
        style={{
          fontSize: "15px",
          fontWeight: "600",
          borderRadius: "6px",
          color: "white",
        }}
        className="btn btn10  mt-0"
        onClick={handleSubmit}
      >
        {btntext} &nbsp;
        <AiOutlineArrowRight
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "white",
          }}
        />
        <div class="transition"></div>
      </button>
    </>
  );
};

export default Button;
