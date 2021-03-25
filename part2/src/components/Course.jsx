import React from 'react'

import Header from './Header';
import Content from './Content';

export default ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
      </>
    )
  }