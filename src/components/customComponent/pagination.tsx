import type { SetStateAction } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

type PaginationProp = {
    limit: number, 
    setLimit: SetStateAction<number>,
    
}

const Pagination = () => {
  return (
    <div className="flex justify-between items-center">
      {/* Left Side */}
      <div className="flex justify-between space-x-2 items-center">
        <p>Result</p>
        <select>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
      {/* Right Side */}
      <div className="flex justify-between space-x-2 items-center">
        <MdKeyboardDoubleArrowLeft />
        <MdKeyboardArrowLeft />
        page
        <MdKeyboardArrowRight />
        <MdKeyboardDoubleArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
