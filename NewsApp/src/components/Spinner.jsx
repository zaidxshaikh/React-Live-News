import React from "react";
import Loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={Loading} alt="Loading" />
    </div>
  );
};

export default Spinner;
