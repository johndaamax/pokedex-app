import Select from 'react-select'

const customStyles = {
    container: (provided) => ({
        ...provided,
        marginLeft: '1rem',
        fontSize: '14px'
    }),
    valueContainer: (provided) => ({
        ...provided,
        width: '140px'
    })
}


const MySelect = ({ list, onChange, placeholder = 'Select...' }) => {
    return (
        <Select
            styles={customStyles}
            options={list}
            onChange={onChange}
            placeholder={placeholder} />
    )
}

export default MySelect;