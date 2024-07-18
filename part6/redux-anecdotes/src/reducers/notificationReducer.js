import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (message, timeDisplayed) => {
    return (dispatch) => {
        dispatch(setMessage(message))
        const timer = setTimeout(() => {
            dispatch(setMessage(null))
        }, timeDisplayed * 1000);  
        return () => clearTimeout(timer)
    }
}

export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer