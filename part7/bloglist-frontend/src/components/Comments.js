import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import commentService from "../services/commentService";

const Comments = () => {
  const blogId = useParams().id;
  console.log("Comments>blogId", blogId);
  const [comments, setComments] = React.useState([]);
  useEffect(() => {
    commentService.getAllComments(blogId).then((comments) => {
      setComments(comments);
      console.log("Comments>comments", comments);
    });
  }, []);

  const onSubmitHandle = (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    const obj = { comment };
    commentService.addComment(blogId, obj).then((comment) => {
      setComments((comments) => [...comments, comment]);
    });
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="comment" />
        <button type="submit">Add comment</button>
      </form>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.comment}</li>
      ))}
    </div>
  );
};

export default Comments;
