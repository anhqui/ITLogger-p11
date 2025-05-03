import { useRef } from "react";
import { searchLogs } from "../../reducers/logReducer";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const inputRef = useRef("");
  const dispatch = useDispatch();

  const onChange = () => {
    const searchTerm = inputRef.current.value;
    dispatch(searchLogs(searchTerm));
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs..."
              ref={inputRef}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
