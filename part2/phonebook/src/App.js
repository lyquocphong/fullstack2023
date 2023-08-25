import React, { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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