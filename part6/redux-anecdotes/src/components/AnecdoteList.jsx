import { useDispatch, useSelector } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const searchValue =  useSelector(state => state.filter)

    const anecdoteData = anecdotes.filter(item => item.content.toLowerCase().includes(searchValue.toLowerCase()))
    const anecdotesToList = anecdoteData.sort((a,b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(castVote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
      }

    return (
        <>
        {anecdotesToList.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </>
    )
}