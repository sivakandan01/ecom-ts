import type { SetStateAction, Dispatch } from "react";
import { MdSearch } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";

type SearchBarProp = {
    searchValue : string,
    setSearchValue: Dispatch<SetStateAction<string>>,
}

const SearchBar = ({searchValue, setSearchValue }: SearchBarProp) => {
  return (
    <div className="w-[240px] h-[32px] border border-gray-300 flex flex-row items-center justify-between rounded-md px-1 text-gray-500">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="focus:outline-none focus:ring-0 px-1"
      />
      <div className="">
        {searchValue.trim().length < 1 ? (
          <MdSearch className="text-gray-500 text-[20px]" />
        ) : (
          <MdOutlineClear className="text-gray-500 text-[20px]" onClick={() => setSearchValue("")}/>
        )}
      </div>
    </div>
  );
};

export { SearchBar }
