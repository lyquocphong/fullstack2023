import React from 'react'
import Part from './Part'

export default ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part} key={part.id} />)}
      </div>
    );
}