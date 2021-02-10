import React, { Component } from 'react';

import classes from './App.module.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: '0', name: 'Ken', age: 23 },
      { id: '1', name: 'Bob', age: 25 },
      { id: '2', name: 'Becca', age: 21 }
    ],
    otherSate: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      );

      btnClass = classes.red;
    }


    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a react app</h1>
        <p className={assignedClasses}>This is really working</p>
        <button 
          className={btnClass} 
          onClick={this.togglePersonsHandler}>Toggle People
        </button>
        {persons}
      </div>
    );
  }
}

export default App;