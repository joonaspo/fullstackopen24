import { Visibility } from "../types"

interface Props {
    setVisibility: (visibility: Visibility) => void
}

const VisibilityButtons: React.FC<Props> = ({setVisibility}) => {
    return (
        <>
        <label>Visibility: </label>
        <input
            type="radio"
            id="great"
            value={Visibility.Great} 
            onChange={({ target }) => setVisibility(target.value as Visibility)}
            name="visibility"
            >
        </input>
        <label>Great</label>
        <input
            type="radio"
            id="good"
            value={Visibility.Good} 
            onChange={({ target }) => setVisibility(target.value as Visibility)}
            name="visibility"
            >
        </input>
        <label>Good</label>
        <input
            type="radio"
            id="ok"
            value={Visibility.Ok} 
            onChange={({ target }) => setVisibility(target.value as Visibility)}
            name="visibility"            
            >
        </input>
        <label>Ok</label>
        <input
            type="radio"
            id="poor"
            value={Visibility.Poor} 
            onChange={({ target }) => setVisibility(target.value as Visibility)}
            name="visibility"            
            >
        </input>
        <label>Poor</label>
        </>
    )
}

export default VisibilityButtons