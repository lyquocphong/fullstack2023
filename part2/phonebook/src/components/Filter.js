export const Filter = ({filterCriteria, onFilterCriteriaChange}) => {

    const handleInputChange = (e) => {
        onFilterCriteriaChange(e.target.value);
    }
    
    return (
        <>
            <span>Filter show with</span>
            <input value={filterCriteria} onChange={handleInputChange}/>
        </>
    )
}