import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class MusicalElementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: ''
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
    fetch('http://localhost:3000/elements', options)
      .then(response => response.json())
      .then(response => console.log('Success', JSON.stringify(response)))
      .then(() => {
        this.props.getElements();
        this.setState({
          element: ''
        });
      })
      .catch(error => console.log('Error', error));
  }

  render() {
    return (
      <div className="container-input">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Musical Elements: </Form.Label>
            <Form.Control
              name="element"
              value={this.state.element}
              type="text"
              placeholder="Rhythm, Melody..."
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Element
          </Button>
        </Form>
      </div>
    );
  }
}
