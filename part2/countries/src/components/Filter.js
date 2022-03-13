import React from "react";

const Filter = (props) => {
  const handleChange = (e) => {
    props.handleFilter(e.target.value);
  };

  return (
    <>
      <input type="text" value={props.searchInput} onChange={handleChange}></input>
    </>
  );
};

export default Filter;
