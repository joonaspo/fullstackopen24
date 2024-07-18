import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const { id, votes } = action.payload
      const votedAnecdote = state.find(e => e.id === id)
      if (votedAnecdote) {
        votedAnecdote.votes = votes
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(addVote(votedAnecdote))
  }
}

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer