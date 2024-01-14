import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [subjects, setSubjects] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_department', { department_name: departmentName, subjects })
            .then(result => {
                result.data.Status ? navigate('/dashboard/departments') : alert(result.data.Error);

            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-50 border'>
                <h2>Add Department</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="departmentName"><strong>Department Name:</strong></label>
                        <input
                            type="text"
                            name='departmentName'
                            placeholder='Enter Department Name'
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="subjects"><strong>Subjects:</strong></label>
                        <input
                            type="text"
                            name='subjects'
                            placeholder='Enter Subjects (comma-separated)'
                            onChange={(e) => setSubjects(e.target.value)}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Department</button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
