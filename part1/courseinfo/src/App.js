import React from 'react'

import './App.css';

const Header = ({ course }) => {
  return (
    <div>
      <p>{ course }</p>
    </div>
  )
}

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    parts.map(item => <Part part={item.name} exercise={item.exercises} />)
  );
}

const Total = ({ parts }) => {

  let total = 0;
  parts.forEach(part => total += part.exercises);

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
