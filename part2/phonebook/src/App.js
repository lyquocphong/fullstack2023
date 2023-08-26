import React, { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import personsService from './services/persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [message, setMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false)


  const handleAddPerson = (newPerson) => {
    const exist = persons.find(person => person.name === newPerson.name)

    if (exist) {
      if (window.confirm(`${newPerson.name} is already added to phonebookm replace old number with new number ?`)) {
        personsService.update(exist.id, newPerson).then(response => {
          showNotification(`Updated ${newPerson.name}`, false)
          getPersons();
        });
      }
      return;
    }

    personsService.create(newPerson).then(response => {
      showNotification(`Added ${newPerson.name}`, false)
      getPersons();
    })
  }

  const getPersons = () => {
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }

  const showNotification = (message, isErrorMessage) => {
    setMessage(message);
    setIsErrorMessage(isErrorMessage);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    getPersons()
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

  const handleDeletePerson = (person) => {
    personsService.deletePerson(person.id).then(response => {
      showNotification(`Deleted ${person.name}`, false)
      getPersons()
    }).catch(err => {
      showNotification(`Information of ${person.name} has been removed`, true)
    });
  }

  return (
    <div>
      {message && <Notification message={message} isErrorMessage={isErrorMessage} />}
      <h2>Phonebook</h2>

      <Filter onFilterCriteriaChange={handleFilterCriteriaChange} />

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}  handleOnDelete={handleDeletePerson}/>
    </div>
  )
}


export default App