import React from 'react';
import ReactDOM from 'react-dom';
import LearningTargetForm from './components/LearningTargetForm.jsx';
import MusicalElementsForm from './components/MusicalElementForm.jsx';
import StudentForm from './components/StudentForm.jsx';
import LearningTargetList from './components/LearningTargetList.jsx';
import { Row, Col, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      elements: [],
      targets: [],
      page: 0
    };
    this.getStudents = this.getStudents.bind(this);
    this.getLearningTargets = this.getLearningTargets.bind(this);
    this.getElements = this.getElements.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }

  componentDidMount() {
    this.getLearningTargets();
    this.getStudents();
    this.getElements();
  }

  getLearningTargets() {
    fetch('http://localhost:3000/targets')
      .then(res => res.json())
      .then(results => {
        this.setState({
          targets: results
        });
      })
      .catch(console.log);
  }

  getStudents() {
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(results => {
        this.setState({
          students: results
        });
      })
      .catch(console.log);
  }

  getElements() {
    fetch('http://localhost:3000/elements')
      .then(res => res.json())
      .then(results => {
        this.setState({
          elements: results
        });
      })
      .catch(console.log);
  }

  handleSubmit() {
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state.targets),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('http://localhost:3000/completed', options)
      .then(res => res.json())
      .then(results => {
        this.incrementPage();
      })
      .catch(console.log);
  }

  incrementPage() {
    const page = this.state.page + 1;
    this.setState({
      page
    });
  }

  handleCompleted(event) {
    console.log(event);
    // const data = {
    //   studentId: event.target.value,
    //   targetId: event.target.name
    // };
    // const options = {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
    // fetch('http://localhost:3000/completed', options)
    //   .then(res => res.json())
    //   .then(results => {
    //     console.log(results);
    //   })
    //   .catch(console.log);
  }

  render() {
    const banner = (
      <div className="banner">
        <h1>Real Time Assessments</h1>
      </div>
    );

    const elements = this.state.elements.map(element => {
      return <div className="element-list-item">{element.element_name}</div>;
    });
    const students = this.state.students.map(student => {
      return <div>{student.student_name}</div>;
    });

    const targets = this.state.targets.map(target => {
      return <div className="target-list-items">{target.description}</div>;
    });

    if (this.state.page === 0) {
      return (
        <div className="container-main">
          {banner}
          <div className="wrapper-form">
            <div className="container-form">
              <div>
                <h1>Welcome to Real Time Assessments!</h1>
                <p>
                  A modern tool for streamlining formative assessments in the
                  music classroom. Click next to get started!
                </p>
              </div>
              <div className="wrapper-btn">
                <Button onClick={this.incrementPage} variant="primary">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.page === 1) {
      return (
        <div className="container-main">
          {banner}
          <div className="wrapper-form">
            <div className="container-form">
              <MusicalElementsForm getElements={this.getElements} />
              <div className="container-element-list-items">{elements}</div>
              <div className="wrapper-btn">
                <Button onClick={this.incrementPage} variant="primary">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.page === 2) {
      return (
        <div className="container-main">
          {banner}
          <div className="wrapper-form">
            <div className="container-form">
              <LearningTargetForm
                elements={this.state.elements}
                getLearningTargets={this.getLearningTargets}
              />
              <div className="container-target-list-items">{targets}</div>
              <div className="wrapper-btn">
                <Button onClick={this.incrementPage} variant="primary">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.page === 3) {
      return (
        <div className="container-main">
          {banner}
          <div className="wrapper-form">
            <div className="container-form">
              <StudentForm getStudents={this.getStudents} />
              <div className="container-student-list-items">{students}</div>
              <div className="wrapper-btn">
                <Button onClick={this.handleSubmit} variant="primary">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.page === 4) {
      return (
        <div className="container-main">
          {banner}
          <div>
            {/* <TabSwitcher elements={this.state.elements} /> */}
            <LearningTargetList
              handleCompleted={this.handleCompleted}
              targets={this.state.targets}
              students={this.state.students}
              elements={this.state.elements}
            />
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
