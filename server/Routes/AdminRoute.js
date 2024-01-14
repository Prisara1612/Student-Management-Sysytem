import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin where email=? and password =?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "querry error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                {
                    role: "admin", email: email
                },
                "jwt_secret_key",
                {
                    expiresIn: "1d"
                }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });

        } else {
            return res.json({ loginStatus: false, Error: "! Wrong Email or Password" })
        }
    })
})
// Import necessary modules and configurations

router.get('/departments', (req, res) => {
    const sql = "SELECT * FROM departments";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.post('/add_department', (req, res) => {
    const { department_name, subjects } = req.body;
    const sql = "INSERT INTO departments (`department_name`, `subjects`) VALUES (?, ?)";
    con.query(sql, [department_name, subjects], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});

router.post('/add_result', (req, res) => {
    const { studentInfo} = req.body;
    const sql = "INSERT INTO results (`department`,`name`, `rollNumber`, `Art`,`English`, `History`,`Math`, `Science`) VALUES (?, ?, ?, ?,?,?,?,?)";
    con.query(sql, [studentInfo.department, studentInfo.name, studentInfo.rollNumber,studentInfo.subjectMarks.Art, studentInfo.subjectMarks.English, studentInfo.subjectMarks.History, studentInfo.subjectMarks.Math, studentInfo.subjectMarks.Science  ], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});

router.get('/results', (req, res) => {
    const sql = "SELECT * FROM results";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.post('/add_student', (req, res) => {
    const { rollNo, dob, name, contactNo, email, course, gender, admissionDate, address} = req.body;
    console.log(req.body);
    const sql = "INSERT INTO students (`rollNo`, `dob`, `name`, `contactNo`, `email`, `course`, `gender`, `admissionDate`, `address`) VALUES (?, ?, ?, ?,?,?,?,?, ?)";
    con.query(sql, [ rollNo, dob, name, contactNo, email, course.label, gender.label, admissionDate, address], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});

router.get('/students', (req, res) => {
    const sql = "SELECT students.*, results.* FROM students LEFT JOIN results ON students.rollNo = results.rollNumber";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});



router.delete('/students/:rollNumber', (req, res) => {
    const rollNumber = req.params.rollNumber;

    // Delete from 'students' table
    const deleteStudentSQL = "DELETE FROM students WHERE rollNo = ?";
    con.query(deleteStudentSQL, [rollNumber], (errStudent, resultStudent) => {
        if (errStudent) {
            console.log(errStudent);
            return res.json({ Status: false, Error: "Query Error (Deleting student)" });
        }

        // Delete from 'results' table
        const deleteResultSQL = "DELETE FROM results WHERE rollNumber = ?";
        con.query(deleteResultSQL, [rollNumber], (errResult, resultResult) => {
            if (errResult) {
                console.log(errResult);
                return res.json({ Status: false, Error: "Query Error (Deleting result)" });
            }

            return res.json({ Status: true, Result: "Student and result deleted successfully" });
        });
    });
});



router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})




export { router as adminRouter };
// import express from "express";
// import con from "../utils/db.js";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// router.post("/adminlogin", (req, res) => {
//   const sql = "SELECT * from admin Where email = ? and password = ?";
//   con.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if (err) return res.json({ loginStatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       const email = result[0].email;
//       const token = jwt.sign(
//         { role: "admin", email: email, id: result[0].id },
//         "jwt_secret_key",
//         { expiresIn: "1d" }
//       );
//       res.cookie('token', token)
//       return res.json({ loginStatus: true });
//     } else {
//         return res.json({ loginStatus: false, Error:"wrong email or password" });
//     }
//   });
// });

// router.get('/category', (req, res) => {
//     const sql = "SELECT * FROM category";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.post('/add_category', (req, res) => {
//     const sql = "INSERT INTO category (`name`) VALUES (?)"
//     con.query(sql, [req.body.category], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true})
//     })
// })

// // image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Public/Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage: storage
// })
// // end imag eupload

// router.post('/add_employee',upload.single('image'), (req, res) => {
//     const sql = `INSERT INTO employee
//     (name,email,password, address, salary,image, category_id)
//     VALUES (?)`;
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.address,
//             req.body.salary,
//             req.file.filename,
//             req.body.category_id
//         ]
//         con.query(sql, [values], (err, result) => {
//             if(err) return res.json({Status: false, Error: err})
//             return res.json({Status: true})
//         })
//     })
// })

// router.get('/employee', (req, res) => {
//     const sql = "SELECT * FROM employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee WHERE id = ?";
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.put('/edit_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE employee
//         set name = ?, email = ?, salary = ?, address = ?, category_id = ?
//         Where id = ?`
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.salary,
//         req.body.address,
//         req.body.category_id
//     ]
//     con.query(sql,[...values, id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.delete('/delete_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "delete from employee where id = ?"
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/admin_count', (req, res) => {
//     const sql = "select count(id) as admin from admin";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/employee_count', (req, res) => {
//     const sql = "select count(id) as employee from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/salary_count', (req, res) => {
//     const sql = "select sum(salary) as salaryOFEmp from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/admin_records', (req, res) => {
//     const sql = "select * from admin"
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({Status: true})
// })

// export { router as adminRouter };
