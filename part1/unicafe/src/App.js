import React, { useState } from 'react'
import './App.css';

// a proper place to define a component
const Statistics = ({ feedbacks }) => {

  if (!feedbacks) {
    return <h2>No feedback given</h2>;
  }

  let total = 0;
  let score = 0;
  let positiveFeedbacks = 0;

  feedbacks.forEach(feedback => {

    if (feedback.value === 0) {
      return;
    }

    total += feedback.value;
    switch (feedback.text) {
      case 'good':
        score += feedback.value;
        positiveFeedbacks = feedback.value;
        break;
      case 'bad':
        score = score <= 0 ? feedback.value * -1 : score - (feedback.value);
        break;
      default:
        break;
    }
  });

  const average = score / total;
  const positive = positiveFeedbacks / total * 100;

  return (
    <table>
      <tbody>
        { feedbacks.map(feedback => <Statistic key={feedback.text} text={feedback.text} value={feedback.value} />) }
        <tr>
          <td>All:</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Average:</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>Positive:</td>
          <td>{positive} %</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ name, clickFn }) => {
  const style = {marginRight: '4px'};
  return <button style={style} name={name} onClick={clickFn}>{name}</button>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [hasFirstClick, setHasFirstClick] = useState(false);

  let feedbacks;
  if (hasFirstClick) {
    feedbacks = [
      {
        text: 'good',
        value: good
      },
      {
        text: 'neutral',
        value: neutral
      },
      {
        text: 'bad',
        value: bad
      },
    ];
  }

  const handleClick = (setStateFn) => {

    setStateFn(prevState => prevState + 1);

    if (!hasFirstClick) {
      setHasFirstClick(true);
    }
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        name="good"
        clickFn={() => {
          handleClick(setGood);
        }}
      />
      <Button
        name="neutral"
        clickFn={() => {
          handleClick(setNeutral);
        }}
      />
      <Button
        name="bad"
        clickFn={() => {
          handleClick(setBad);
        }}
      />

      <h1>Statistics</h1>
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App;
