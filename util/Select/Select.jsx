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


const MySelect = ({ list, onChange, defaultTitle, placeholder = 'Select...' }) => {
    console.log(list)
    return (
        <Select
            styles={customStyles}
            options={list}
            defaultInputValue={defaultTitle}
            onChange={onChange}
            placeholder={placeholder} />
    )
}

export default MySelect;