import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const windowLength = 10;
const timeout = 500;

const AverageCalculator = () => {
  
  const [state, setState] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchNum = async () => {
      try {
        const response = await axios.post(`http://20.244.56.144/test/prime`, { timeout });
        const newNums = response.data.numbers;

        setState(prevState => {
          const newState = [...new Set([...prevState, ...newNums])].slice(-windowLength);
          const avgg = newState.reduce((sum, num) => sum + num, 0) / newState.length;
          setAvg(parseFloat(avgg.toFixed(2)));
          return newState;
        });
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNum();
  },);

  const prevState = state.slice(0, -1); 

  return (
    <div>
      <p>Window previous State: {JSON.stringify(prevState)}</p>
      <p>Window current state: {JSON.stringify(state)}</p>
      <p>Average: {avg}</p>
    </div>
  );
};

export default AverageCalculator;
