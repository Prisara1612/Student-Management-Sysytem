import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';


const StudentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
  }

  strong {
    margin-right: 10px;
  }
`;

const SerialNumber = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c9302c;
  }
`;
const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  li strong {
    margin-right: 10px;
  }

  img {
    margin-right: 10px;
  }

  button {
    background-color: #ff5c35;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e6492d;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:nth-child(2) {
    margin-top: 34px;

    @media (max-width: 767px) {
      margin-top: 20px;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
`;

const PreviewImage = styled(motion.img)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const DemoImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-image: url('https://res.cloudinary.com/demo/image/upload/ar_1.0,c_thumb,g_face,w_0.6,z_0.7/r_max/co_black,e_outline/co_grey,e_shadow,x_40,y_55/actor.png');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const PlusSign = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #ff5c35;
  border-radius: 50%;
  cursor: pointer;
`;

const UploadButton = styled(motion.label)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff5c35;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #ff5c35;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// State initialization and options
const initialState = {
  photo: null,
  rollNo: '',
  dob: null,
  name: '',
  contactNo: '',
  email: '',
  course: null,
  gender: null,
  admissionDate: '',
  address: '',
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  // Add more gender options as needed
];

const courses = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'eng', label: 'Engineering' },
  // Add more courses as needed
];

const ProfilePage = () => {
  const [studentInfo, setStudentInfo] = useState(initialState);
  const [studentInfoList, setStudentInfoList] = useState([]);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files && e.target.files[0];
    if (selectedPhoto && selectedPhoto.type.startsWith('image/')) {
      setStudentInfo({
        ...studentInfo,
        photo: selectedPhoto,
      });
    }
  };
  const handleCreateProfile = () => {
    if (Object.values(studentInfo).every((value) => value !== '' && value !== null)) {
      setStudentInfoList([...studentInfoList, { ...studentInfo }]);
      setStudentInfo(initialState);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleDeleteInfo = (index) => {
    const updatedInfoList = [...studentInfoList];
    updatedInfoList.splice(index, 1);
    setStudentInfoList(updatedInfoList);
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <Container>
      <Title>Add Student Details</Title>
      <FormContainer>
        <FormGroup>
          <Label htmlFor="fileInput">Upload Photo:</Label>
          <PreviewContainer>
            {studentInfo.photo ? (
              <PreviewImage
                src={URL.createObjectURL(studentInfo.photo)}
                alt="Preview"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <DemoImage onClick={handleUploadClick}>
                <PlusSign>+</PlusSign>
              </DemoImage>
            )}
            <UploadButton
              htmlFor="fileInput"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={handleUploadClick}
            >
              Upload Image
            </UploadButton>
            <FileInput
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </PreviewContainer>
        </FormGroup>
        <FormGroup>
          <Label>Roll No:</Label>
          <Input
            type="text"
            value={studentInfo.rollNo}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, rollNo: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Date of Birth:</Label>
          <DatePicker
            selected={studentInfo.dob}
            onChange={(date) =>
              setStudentInfo({ ...studentInfo, dob: date })
            }
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            maxDate={new Date()} // Restrict future dates
            placeholderText="Select Date of Birth"
          />
        </FormGroup>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            value={studentInfo.name}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, name: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Contact No:</Label>
          <Input
            type="text"
            value={studentInfo.contactNo}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, contactNo: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Email ID:</Label>
          <Input
            type="text"
            value={studentInfo.email}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, email: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Select Course:</Label>
          <Select
            defaultValue={studentInfo.course}
            onChange={(option) =>
              setStudentInfo({ ...studentInfo, course: option })
            }
            options={courses}
          />
        </FormGroup>
        <FormGroup>
          <Label>Gender:</Label>
          <Select
            defaultValue={studentInfo.gender}
            onChange={(option) =>
              setStudentInfo({ ...studentInfo, gender: option })
            }
            options={genderOptions}
          />
        </FormGroup>
        <FormGroup>
          <Label>Admission Date:</Label>
          <Input
            type="date"
            value={studentInfo.admissionDate}
            onChange={(e) =>
              setStudentInfo({
                ...studentInfo,
                admissionDate: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input
            type="text"
            value={studentInfo.address}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, address: e.target.value })
            }
          />
        </FormGroup>
      </FormContainer>
      <Button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={handleCreateProfile}
      >
        Add Student
      </Button>
      {/* Display entered student information */}
      {studentInfoList.length > 0 && (
        <StudentList>
          <Title>Student Information</Title>
          {studentInfoList.map((info, index) => (
            <StudentItem key={index}>
              <SerialNumber>{index + 1}.</SerialNumber>
              {/* <strong>Photo:</strong>{' '} */}
              {info.photo ? (
                <PreviewImage
                  src={URL.createObjectURL(info.photo)}
                  alt="Student Preview"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                'N/A'
              )}
              <strong>Roll No:</strong> {info.rollNo}{' '}
              <strong>Date of Birth:</strong>{' '}
              {info.dob?.toLocaleDateString()}{' '}
              <strong>Name:</strong> {info.name}{' '}
              {/* <strong>Contact No:</strong> {info.contactNo}{' '} */}
              <strong>Email ID:</strong> {info.email}{' '}
              <strong>Course:</strong> {info.course?.label}{' '}
              <strong>Gender:</strong> {info.gender?.label}{' '}
              {/* <strong>Admission Date:</strong> {info.admissionDate}{' '} */}
              {/* <strong>Address:</strong> {info.address}{' '} */}
              <DeleteButton onClick={() => handleDeleteInfo(index)}>
                Delete
              </DeleteButton>
            </StudentItem>
          ))}
        </StudentList>
      )}
    </Container>
  );
};

export default ProfilePage;