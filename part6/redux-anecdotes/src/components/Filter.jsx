import { useDispatch } from "react-redux"
import { search } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      console.log(event.target.value)
      dispatch(search(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter