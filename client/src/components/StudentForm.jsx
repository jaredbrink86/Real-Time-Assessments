import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('http://localhost:3000/students', options)
      .then(response => response.json())
      .then(response => console.log('Success', JSON.stringify(response)))
      .then(() => {
        this.props.getStudents();
        this.setState({
          student: ''
        });
      })
      .catch(error => console.log('Error', error));
  }

  render() {
    return (
      <div className="container-input">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Student Name: </Form.Label>
            <Form.Control
              name="student"
              value={this.state.student}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
