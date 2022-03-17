import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = (props) => {
  const params = useParams();
  const anecdote = props.anecdotes.find((a) => a.id === Number(params.id));

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Author: {anecdote.author}</div>
      <div>
        Votes:
        <strong>{anecdote.votes}</strong>
        <button onClick={() => props.vote(anecdote.id)}>Vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
