const Admin = require('../model/AdminSchema');
const Student = require('../model/StudentSchema');
const Teacher = require('../model/TeacherSchema');
const bcrypt = require('bcrypt');

const addNewStudent = async (req, res) => {

    var { Name, RegNo, Position, Gender, Email, Password, PhoneNumber, Role, FypStatus, CommitteeRemarks, SupervisorRemarks, OnlineStatus } = req.body;
    if (!Name || !RegNo || !Password) return res.status(400).json({ 'message': 'Username, Reg No and password are required.' });

    // Check if user already exists
    const duplicate = await Student.findOne({ RegNo: RegNo }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        Password = await bcrypt.hash(Password, 10);
        
        const newStudent = await Student.create({ Name, RegNo, Position, Gender, Email, Password, PhoneNumber, Role, FypStatus, CommitteeRemarks, SupervisorRemarks, OnlineStatus });
        console.log(newStudent);

        
        res.status(201).json({ 'success': `New user ${newStudent} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

    

}

const addNewTeacher = async (req, res) => {
    
    var { Name, Email, Password, PhoneNumber, Gender, Role, Designation } = req.body;
    // Name = "Ali"
    // Email = "ali@yahoo.com"
    // Password = "1234",
    // PhoneNumber = "03001234567",
    // Gender = true,
    // Role = "Supervisor",
    // Designation = "Teacher";

    if (!Name || !Email || !Password) return res.status(400).json({ 'message': 'Name, Email and password are required.' });
  
    // Check if user already exists
    const duplicate = await Teacher.findOne({ Email: Email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        Password = await bcrypt.hash(Password, 10);
        
        const newTeacher = await Teacher.create({ Name, Email, Password, PhoneNumber, Gender, Role, Designation });
        console.log(newTeacher);

        
        res.status(201).json({ 'success': `New user ${newTeacher} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }


    
}

const updateStudent = async (req, res) => {

}

const updateTeacher = async (req, res) => {

}

const deleteStudent = async (req, res) => {

}

const deleteTeacher = async (req, res) => {

}

const getAllStudent = async (req, res) => {

}

const getAllTeacher = async (req, res) => {

}


module.exports = { addNewStudent, addNewTeacher };