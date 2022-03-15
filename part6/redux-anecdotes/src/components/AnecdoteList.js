import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      return state.anecdotes.filter((e) =>
        e.content.toLowerCase().includes(state.filter.txt.toLowerCase())
      );
    } else {
      return state.anecdotes;
    }
  });

  const voteAnecdote = (id) => {
    dispatch(vote(id));
    dispatch(showNotification({ message: "New votes", type: "warning" }));
    setTimeout(() => {
      dispatch(showNotification({ message: "", type: "null" }));
    }, 5000);
  };

  return (
    <>
      {[...anecdotes]
        ?.sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAnecdote(anecdote.id)}>Vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
