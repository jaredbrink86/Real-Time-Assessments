import React from 'react';

const StudentListItem = ({ student, handleCompleted, targetId, studentId }) => {
  // const targetId = target.toString();
  // console.log(student);
  // // const studentId = student.id.toString();
  return (
    <div>
      <span
        name={targetId}
        value={studentId}
        onClick={handleCompleted}
        className="student-list-item"
      >
        {student}
      </span>
      <input type="checkbox" />
    </div>
  );
};

export default StudentListItem;
