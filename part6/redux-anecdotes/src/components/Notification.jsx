import { useSelector } from "react-redux"

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notification)

  const state = useSelector(state => state.notification)
  console.log('state now',state)

  if (!notification) {
    return null
  }

  return (
      <div style={style}>
      {notification}
    </div>

  )
}

export default Notification