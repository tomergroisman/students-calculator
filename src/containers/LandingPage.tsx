import React, { PureComponent } from 'react';
import { debounce, cloneDeep } from 'lodash';
import Footer from '../components/Footer';
import GradesWidget from '../components/GradesWidget';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Grades, GradesHighlights } from '../utils/types';
import {gradesValidationRules} from '../utils/validation';
import './LandingPage.scss';

const FAILURE_GRADE = 60;

interface State {
  name: string,
  grades: Grades,
  gradesHighlights: GradesHighlights | null,
  gradesInputRef?: HTMLInputElement
}

export default class LandingPage extends PureComponent<{}, State> {
  state: State = {
    name: "",
    grades: [],
    gradesHighlights: null
  }
  nameInputRef?: HTMLInputElement;

  // Name change handler
  updateName = (name: string) => {
    this.setState({ name });
  }

  // Name change handler
  resetName = () => {
    this.setState({ name: "" });
    this.nameInputRef?.focus();
  }

  // Set the grade highlights relative to the current grade state
  updateMeasures = () => {
    if (this.state.grades.length === 0) {
      this.setState({ gradesHighlights: null });
      return;
    }
    
    let helper = {
      highest: -Infinity,
      lowest: Infinity,
      failure: 0,
      sum: 0
    }
    this.state.grades.forEach(grade => {
      helper.highest = Math.max(helper.highest, grade);
      helper.lowest = Math.min(helper.lowest, grade);
      grade < FAILURE_GRADE && helper.failure++;
      helper.sum += grade;
    });
    this.setState({
      gradesHighlights: {
        highest: helper.highest,
        lowest: helper.lowest,
        failures: helper.failure,
        avg: helper.sum / this.state.grades.length
      }
    })
  }

  // Grade update handlers
  updateGrades = {
    add: (newGrades: string) => {
      const newGradeList = newGrades.split(',').map(n => parseFloat(n));
      this.setState({
        grades: [ ...cloneDeep(this.state.grades), ...newGradeList ]
      })
    },
    delete: (idx: number) => {
      const newGradeList = cloneDeep(this.state.grades);
      newGradeList.splice(idx, 1);
      this.setState({ grades: newGradeList })
    }
  }

  // Return an extended grades highlights object
  getMeasuresObj() {
    return {
      name: this.state.name,
      ...this.state.gradesHighlights
    };
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    // Update highlights state if grades changed
    if (prevState.grades !== this.state.grades) {
      this.updateMeasures();
    }
  }

  render() {
    return (
      <div id="container" className="container">
        <Header name={this.state.name}/>
        <div id="content" className="row my-5">
          <div className="col-3">
            <TextInput.Delete
              label="Name"
              onChange={debounce(this.updateName, 400)}
              onDeleteClick={this.resetName}
              inputRef={(ref: HTMLInputElement) => this.nameInputRef = ref}
              nextInput={this.state.gradesInputRef}
              clearTimeout
            />
            <TextInput.Add
              label="Grade(s)"
              onAddClick={this.updateGrades.add}
              inputRef={(ref: HTMLInputElement) => this.setState({ gradesInputRef: ref })}
              validationRules={gradesValidationRules}
            />
          </div>
          <div className="col-9">
            <GradesWidget
              grades={this.state.grades}
              gradesHighlights={this.state.gradesHighlights}
              onDeleteGrade={this.updateGrades.delete}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
