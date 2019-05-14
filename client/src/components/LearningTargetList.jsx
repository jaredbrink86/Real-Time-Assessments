import React from 'react';
import StudentList from './StudentList.jsx';
import LearningTargetListItem from './LearningTargetListItem.jsx';
import { Tabs, Tab } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// export default function LearningTargetList({ students, targets, elements }) {
//   return <div>hello</div>;
// }

export default function LearningTargetList({
  students,
  targets,
  elements,
  handleCompleted
}) {
  // Map through students to make student listitems
  // Map through learning targets to make target list, with each item having a student list
  // Map through elements to make element list
  const elementList = [];
  const targetsByElement = [];

  elements.forEach(element => {
    if (!elementList.includes(element)) {
      elementList.push(element);
    }
  });

  elementList.forEach(element => {
    const targetsArray = targets
      .filter(target => {
        return target.element_id === element.id;
      })
      .map(target => {
        return (
          <div className="container-targets-by-element">
            <div>
              <h3>
                <LearningTargetListItem target={target.description} />
              </h3>
              <StudentList
                targetId={target.id}
                students={students}
                handleCompleted={handleCompleted}
              />
            </div>
          </div>
        );
      });

    targetsByElement.push(
      <Tab
        className="tab"
        key={element.id}
        eventKey={element.element_name}
        title={element.element_name}
      >
        {targetsArray}
      </Tab>
    );
  });

  return (
    <Tabs
      className="tab-select"
      defaultActiveKey={elementList[0].element_name}
      id="uncontrolled-tab-example"
    >
      {targetsByElement}
    </Tabs>
  );
}
