const User = require('../model/User');
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
    



    
}



module.exports = { addNewStudent, addNewTeacher };