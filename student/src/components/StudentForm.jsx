// StudentForm.jsx
import React, { useState } from 'react';
import './StudentForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    rollNumber: '',
    department: '',
    subjectMarks: {
      English: '',
      Math: '',
      Science: '',
      History: '',
      Art: '',
    },
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (field, value) => {
    setStudentInfo({
      ...studentInfo,
      [field]: value,
    });
  };

  const handleSubjectMarksChange = (subject, marks) => {
    setStudentInfo({
      ...studentInfo,
      subjectMarks: {
        ...studentInfo.subjectMarks,
        [subject]: marks,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        axios.post('http://localhost:3000/auth/add_result', { studentInfo })
            .then(result => {
                result.data.Status ? navigate('/dashboard') : alert(result.data.Error);

            })
            .catch(err => console.log(err));
    // Perform any additional actions with the student information, such as saving to a database or displaying results.
    console.log('Student Info:', studentInfo);

    // Set success message
    setSubmitMessage('Data submitted successfully!');
  };

  return (
    <div className="student-form-container">
      {submitMessage && <div className="success-message">{submitMessage}</div>}

      <h2 className="form-heading">Add student Result</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="header">
        <label>
          Student Name:
          <input
            type="text"
            value={studentInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="input-field"
          />
        </label>

        <label>
          Roll Number:
          <input
            type="text"
            value={studentInfo.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
            className="input-field"
          />
        </label>
        <label>
           Department:
          <input
            type="text"
            value={studentInfo.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="input-field"
          />
        </label>
        </div>

        <h3 className="form-subheading">Subject Marks</h3>
        {Object.keys(studentInfo.subjectMarks).map((subject) => (
          <div key={subject} className="subject-mark-input">
            <label>{subject}:</label>
            <input
              type="number"
              value={studentInfo.subjectMarks[subject]}
              onChange={(e) => handleSubjectMarksChange(subject, e.target.value)}
              className="input-field"
            />
          </div>
        ))}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
