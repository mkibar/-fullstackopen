import anecdoteReducer from "./anecdoteReducer";
//import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("should return the initial state", () => {
    const newState = anecdoteReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  // test("should handle a todo being added to an empty list", () => {
  //   const state = [];
  //   deepFreeze(state);

  //   const action = {
  //     type: "anecdotes/createAnecdote",
  //     data: {
  //       content: "TEST3",
  //     },
  //   };
  //   const newState = anecdoteReducer(state, action);
  //   delete newState.id;

  //   console.log("NEWSTATE:", newState);

  //   expect(newState).toEqual([
  //     {
  //       content: "TEST3",
  //       votes: 0,
  //     },
  //   ]);
  // });
});

// import anecdoteReducer from './anecdoteReducer'
// import deepFreeze from 'deep-freeze'

// describe('anecdoteReducer', () => {
//   test('returns new state with action NEW anecdote', () => {
//     const state = []
//     const action = {
//       type: 'NEW',
//       data: {
//         content: 'the app state is in redux store',
//         id: 1,
//         votes: 0,
//       }
//     }

//     deepFreeze(state)
//     const newState = anecdoteReducer(state, action)

//     expect(newState).toHaveLength(1)
//     expect(newState).toContainEqual(action.data)
//   })

//   test('returns new state with action VOTE', () => {
//     const state = [
//       {
//         content: 'the app state is in redux store',
//         votes: 0,
//         id: 1
//       },
//       {
//         content: 'state changes are made with actions',
//         votes: 0,
//         id: 2
//       }]

//     const action = {
//       type: 'VOTE',
//       data: {
//         id: 2
//       }
//     }

//     deepFreeze(state)
//     const newState = anecdoteReducer(state, action)

//     expect(newState).toHaveLength(2)

//     expect(newState).toContainEqual(state[0])

//     expect(newState).toContainEqual({
//       content: 'state changes are made with actions',
//       votes: 1,
//       id: 2
//     })
//   })
// })
