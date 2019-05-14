import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import LearningTargetListItem from './LearningTargetListItem.jsx';

class TabSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0
    };
  }

  render() {
    const tabs = this.props.elements.map((element, i) => {
      return (
        <Tab
          key={i}
          eventKey={i}
          title={element.element_name}
          onSelect={this.handleSelect}
        >
          {element.element_name}
        </Tab>
      );
    });
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        {tabs}
      </Tabs>
    );
  }
}

export default TabSwitcher;
