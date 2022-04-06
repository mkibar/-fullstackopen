const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
    //console.log(e.target.value, props.filter)
  };

  return (
    <>
      Filter shown with:{" "}
      <input
        type="text"
        id="filter-text"
        value={props.filter}
        onChange={handleChange}
      ></input>
    </>
  );
};
export default Filter;
