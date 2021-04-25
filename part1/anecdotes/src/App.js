import React, { useState } from 'react'

import './App.css';

const App = (props) => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleNext = () => {

    let newIndex = selected;

    while(newIndex === selected) {
        newIndex = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(newIndex);
  }

  const handleVote = selectedIndex => {

    let newVotes;
    if (!votes[selectedIndex]) {
        newVotes = { ...votes, [selectedIndex]: 1 };
    }
    else {
        newVotes = { ...votes, [selectedIndex]: votes[selectedIndex] + 1 };
    }

    setVotes(newVotes);
  }

  const getMostVoteAnecdote = () => {
    console.log(Object.values(votes));

    let index = 0;
    let max = 0;
    for (const [key, value] of Object.entries(votes)) {
        if (value > max) {
            index = key;
            max = value;
        }
    }

    return anecdotes[index];
  };

  let mostVoteAnecdote;
  if (Object.keys(votes).length > 0) {
    mostVoteAnecdote = getMostVoteAnecdote();
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>

    {anecdotes[selected]}

    <p>has { !votes[selected] ? 0 : votes[selected] } votes</p>

    <div>
        <button style={{marginRight: '5px'}} onClick={() => handleVote(selected)} >Vote</button>
        <button onClick={handleNext} >Next anecdotes</button>
    </div>

    {
        mostVoteAnecdote &&
        (
            <>
                <h1>Anecdote with most votes</h1>
                { mostVoteAnecdote }
            </>
        )
    }

    </div>
  )
}

export default App;
