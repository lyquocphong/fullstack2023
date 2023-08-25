import React, { useState } from 'react'

export const PersonForm = ({ handleAddPerson }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameInputChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberInputChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newName === '' || newNumber === '') {
            alert('Name and Number cannot be empty');
            return;
        }

        handleAddPerson({
            name: newName,
            number: newNumber
        });

        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input type='text' onChange={handleNameInputChange} value={newName} />
            </div>
            <div>
                number: <input type='text' onChange={handleNumberInputChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
} 