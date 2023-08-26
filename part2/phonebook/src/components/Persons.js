export const Persons = ({ persons, handleOnDelete }) => {
    return persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} onDeletePerson={handleOnDelete}/>)
}

export const Person = ({ name, number, id, onDeletePerson }) => {

    const handleOnDelete = () => {
        if (window.confirm(`Delete ${name} ?`)) {
            onDeletePerson({id, name, number});
        }
    }

    return (
        <div>
            <span>{name}</span>
            <span style={{ marginLeft: '2px' }}>{number}</span>
            <button type="button" onClick={handleOnDelete}>Delete</button>
        </div>
    )
}