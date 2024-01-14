import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [total, setTotal] = useState(0);
    const [failed, setFailed] = useState(0);
    const [passed, setPassed] = useState(0);
    const [students, setStudents] = useState([]);
    const [studentResult, setStudentResult] = useState([]);


    useEffect(() => {
        axios
            .get('http://localhost:3000/auth/results')
            .then((result) => {
                if (result.data.Status) {
                    setTotal(result.data.Result.length);
                    setStudents(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:3000/auth/students')
            .then((result) => {
                if (result.data.Status) {
                    setStudentResult(result.data.Result);
                    console.log(result.data.Result)
                    //   console.log(studentResult);
                    //   console.log(studentResult.name);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));

    }, []);

    useEffect(() => {
        const calculateFailed = () => {
            let failedCount = 0;
            students.forEach((student) => {
                const totalMarks =
                    student.Art + student.English + student.History + student.Math + student.Science;
                const percentage = (totalMarks / 5).toFixed(2);
                if (percentage <= 33) {
                    failedCount += 1;
                }
            });
            setFailed(failedCount);
            setPassed(total - failedCount);
        };

        // Only calculate if students have been loaded
        if (students.length > 0) {
            calculateFailed();
        }
    }, [students, total]);


    const handleDelete = (roll) => {
        axios
            .delete(`http://localhost:3000/auth/students/${roll}`)
            .then((result) => {
                if (result.data.Status) {
                    const updatedStudentResult = studentResult.filter(student => student.rollNumber !== roll);
                    setStudentResult(updatedStudentResult);
                    alert("Deleted successfully");
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className='container'>
                <div className='box' id='b1'>
                    <div className='inside_box'>
                        <i className="fa-solid fa-graduation-cap"></i>
                        <h2>Total Students </h2>
                        <p className='counter'>{total} </p>
                    </div>
                </div>
                <div className='box' id='b2'>
                    <div className='inside_box'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <h2>Failed students</h2>
                        <p className='counter'>{failed} </p>
                    </div>
                </div>
                <div className='box' id='b3'>
                    <div className='inside_box'>
                        <i className="fa-regular fa-calendar-check"></i>
                        <h2>Passed students </h2>
                        <p className='counter'>{passed} </p>
                    </div>
                </div>

            </div>

            {studentResult.map((std) => (
                <div className='student_details_1' key={std.id}>
                    <img src='' alt='img' />
                    <span>Name: {std.name}</span>
                    <span>Date of Birth: {std.dob}</span>
                    <span>Roll no: {std.rollNumber}</span>
                    <span>Email id: {std.email}</span>
                    <span>Course: {std.course}</span>
                    <span>Gender: {std.gender}</span>
                    <button onClick={() => handleDelete(std.rollNumber)}>Delete</button>
                    <button>View Result</button>
                    //modals
                </div>
            ))}


        </>
    );
};

export default Home;
