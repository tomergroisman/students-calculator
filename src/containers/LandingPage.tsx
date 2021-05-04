import React, { Component } from 'react';
import Footer from '../components/Footer';
import GradesWidget from '../components/GradesWidget';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

interface State {
  name: string,
}

export default class LandingPage extends Component<{}, State> {
  state = {
    name: ""
  }

  render() {
    return (
      <div className="container">
        <Header name={this.state.name}/>
        <TextInput />
        <TextInput />
        <GradesWidget />
        <Footer />
      </div>
    )
  }
}
