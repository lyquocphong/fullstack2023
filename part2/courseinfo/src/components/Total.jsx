import React from 'react'

export default ({ course }) => {
    let sum = 0;
    course.parts.forEach(part => { sum += part.exercises });

    return(
      <p>Total of exercises {sum}</p>
    )
  }