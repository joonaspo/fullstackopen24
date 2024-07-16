interface Props {
    setDate: (date: string) => void
}

const SelectDate: React.FC<Props> = ({setDate}) => {
    return (
        <input type="date"
            onChange={({ target }) => setDate(target.value)}
        ></input>
    )
}

export default SelectDate