import Contents from "./components/Contents";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts } from "./type";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Contents parts={courseParts} />
      <br />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
