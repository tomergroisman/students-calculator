import React, { Component } from 'react';
import { debounce } from 'lodash';
import Footer from '../components/Footer';
import GradesWidget from '../components/GradesWidget';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Grades } from '../utils/types';

interface State {
  name: string,
  grades: Grades,
}

export default class LandingPage extends Component<{}, State> {
  state: State = {
    name: "",
    grades: []
  }
  nameInputRef?: HTMLInputElement;
  gradesInputRef?: HTMLInputElement;

  // Name change handler
  handleNameChange = (name: string) => {
    this.setState({ name });
  }

  // Name change handler
  resetName = () => {
    this.setState({ name: "" });
    this.nameInputRef?.focus();
  }

  // Grade add handler
  handleGradeAdd = (newGrades: string) => {
    const newGradeList = newGrades.split(',').map(n => parseFloat(n));
    this.setState({ grades: [ ...this.state.grades, ...newGradeList ]})
  }

  render() {
    return (
      <div className="container">
        <Header name={this.state.name}/>
        <div className="row">
          <div className="col-3">
            <TextInput.Delete
              label="Name"
              onChange={debounce(this.handleNameChange, 400)}
              onDeleteClick={this.resetName}
              inputRef={(ref: HTMLInputElement) => this.nameInputRef = ref} 
              nextInput={this.gradesInputRef} 
              clearTimeout
            />
            <TextInput.Add
              label="Grade(s)"
              onAddClick={this.handleGradeAdd}
              inputRef={(ref: HTMLInputElement) => this.gradesInputRef = ref} 
            />
          </div>
          <div className="col-9">
            <GradesWidget />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
