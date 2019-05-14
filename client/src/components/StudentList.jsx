import React from 'react';
import StudentListItem from './StudentListItem.jsx';

const StudentList = ({ students, handleCompleted, targetId }) => {
  const studentList = students.map(student => {
    return (
      <StudentListItem
        studentId={student.id}
        targetId={targetId}
        student={student.student_name}
        handleCompleted={handleCompleted}
      />
    );
  });
  return <div>{studentList}</div>;
};

export default StudentList;
