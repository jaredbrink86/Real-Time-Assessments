import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class LearningTargetForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.elements[0].element_name);
    this.state = {
      target: '',
      element: this.props.elements[0].element_name
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
    fetch('http://localhost:3000/targets', options)
      .then(response => response.json())
      .then(response => console.log('Success', JSON.stringify(response)))
      .then(() => {
        this.props.getLearningTargets();
        this.setState({
          target: ''
        });
      })
      .catch(error => console.log('Error', error));
  }

  handleNext() {
    this.props.incrementPage();
  }

  render() {
    const elements = this.props.elements.map(element => {
      return <option>{element.element_name}</option>;
    });

    return (
      <div className="container-input">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              Enter description of learning target or objective:
            </Form.Label>
            <Form.Control
              name="target"
              value={this.state.target}
              type="text"
              placeholder="Student will be able to..."
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control
              name="element"
              value={this.state.element}
              onChange={this.handleChange}
              as="select"
            >
              {elements}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Learning Target
          </Button>
        </Form>
      </div>
    );
  }
}
