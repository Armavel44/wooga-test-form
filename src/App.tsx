import React from 'react';
import './App.css';
import {Form} from './components/Form';

const formFields = [
    {
        label: 'Name',
        name: 'name',
        validate: (value: string) => {
            const validationPattern = /^wooga\.name.*/;
            return !validationPattern.test(value);
        },
        validationMessage: `Name input value doesn't follow the pattern wooga.name`
    },
    {
        label: 'Email',
        name: 'email',
        validate: (value: string) => {
            const validationPattern = /^wooga\.email.*/;
            return !validationPattern.test(value);
        },
        validationMessage: `Email input value doesn't follow the pattern wooga.email`
    },
    {
        label: 'Game',
        name: 'game'
    }
]

function App() {
  return (
    <div className="App">
      <Form fields={formFields} width={300} />
    </div>
  );
}

export default App;
