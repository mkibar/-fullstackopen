import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: title.value,
      author: author.value,
      info: url.value,
      votes: 0,
    });
    props.setNotification(`A new anedote ${title.value} created!`);
    navigate("/anecdotes");
  };
  const reset = (e) => {
    e.preventDefault();
    title.reset();
    author.reset();
    url.reset();
  };
  const parseAttributeNames = (field) => {
    const { reset, ...items } = field;
    return items;
  };
  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...parseAttributeNames(title)} />
          {/* <input {...title} /> */}
        </div>
        <div>
          author
          <input {...parseAttributeNames(author)} />
        </div>
        <div>
          url for more info
          <input {...parseAttributeNames(url)} />
        </div>
        <button>Create</button>
        <button onClick={reset}>Reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
