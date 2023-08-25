export const Persons = ({ persons }) => {
    return persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)
}

export const Person = ({ name, number }) => {
    return (
        <div>
            <span>{name}</span>
            <span style={{ marginLeft: '2px' }}>{number}</span>
        </div>
    )
}