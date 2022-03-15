import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW anecdote', () => {
    const state = []
    const action = {
      type: 'NEW',
      data: {
        content: 'the app state is in redux store',
        id: 1,
        votes: 0,
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        votes: 0,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        votes: 0,
        id: 2
      }]
  
    const action = {
      type: 'VOTE',
      data: {
        id: 2
      }
    }
  
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
  
    expect(newState).toHaveLength(2)
  
    expect(newState).toContainEqual(state[0])
  
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      votes: 1,
      id: 2
    })
  })
})