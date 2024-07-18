import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"



export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        console.log(content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added '${content}'`, 5))
        event.target.content.value = ''
      }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='content'/></div>
            <button type='submit'>create</button>
        </form>
      </>
    )
}