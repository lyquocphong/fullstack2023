import React, { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterCriteria, setFilterCriteria] = useState('');

  const handleAddPerson = (newPerson) => {
    const exist = persons.find(person => person.name === newPerson.name)

    if (exist) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ ...newPerson }));
  }

  useEffect(() => {
    if (filterCriteria.length === 0) {
      setFilteredPersons(persons);
      return;
    }

    const filterPattern = new RegExp(filterCriteria, 'i');
    setFilteredPersons(persons.filter(person => person.name.match(filterPattern)));
  }, [filterCriteria, persons])

  const handleFilterCriteriaChange = (filterInput) => {
    setFilterCriteria(filterInput);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onFilterCriteriaChange={handleFilterCriteriaChange} />

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}


export default App