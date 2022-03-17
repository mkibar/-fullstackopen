import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
  //const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    //dispatch(filterChange(event.target.value));
    props.filterChange(event.target.value);
  };

  const style = {
    marginTop: 5,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
//export default Filter;
