import React, { Component } from 'react'
import Footer from '../components/Footer'
import GradesWidget from '../components/GradesWidget'
import Header from '../components/Header'
import TextInput from '../components/TextInput'

export default class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <TextInput />
        <TextInput />
        <GradesWidget />
        <Footer />
      </div>
    )
  }
}
