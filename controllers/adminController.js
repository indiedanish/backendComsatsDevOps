const Admin = require('../model/AdminSchema');
const Student = require('../model/StudentSchema');
const Teacher = require('../model/TeacherSchema');
const Template = require('../model/TemplateSchema');
const Announcement = require('../model/AnnouncementSchema');


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


//------------------------------------------------------------------------

const deleteStudent = async (req, res) => {
    if (!req?.body?.RegNo) return res.status(400).json({ 'message': 'Student RegNo required.' });

    const student = await Student.findOne({ RegNo: req.body.RegNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No student matches RegNo ${req.body.RegNo}.` });
    }
    const result = await student.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const deleteTeacher = async (req, res) => {
    if (!req?.body?.Email) return res.status(400).json({ 'message': 'Teachers Email required.' });

    const teacher = await Teacher.findOne({ Email: req.body.Email }).exec();
    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches email ${req.body.Email}.` });
    }
    const result = await teacher.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

//------------------------------------------------------------------

const getStudent = async (req, res) => {
    if (!req?.body?.RegNo) return res.status(400).json({ 'message': 'Student RegNo required.' });

    const student = await Student.findOne({ RegNo: req.body.RegNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No student matches RegNo ${req.body.RegNo}.` });
    }
    res.json(student);
}

const getTeacher = async (req, res) => {
    if (!req?.body?.Email) return res.status(400).json({ 'message': 'Teacher email required.' });

    const teacher = await Teacher.findOne({ Email: req.body.Email }).exec();
    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches Email ${req.body.Email}.` });
    }
    res.json(teacher);
}


//--------------------------------------------------------------

const updateStudent = async (req, res) => {
    if (!req?.body?.RegNo) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const student = await Student.findOne({ RegNo: req.body.RegNo }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No Student matches RegNo ${req.body.RegNo}.` });
    }
    if (req.body?.Name) student.Name = req.body.Name;
    if (req.body?.RegNo) student.RegNo = req.body.RegNo;
    if (req.body?.Position) student.Position = req.body.Position;
    if (req.body?.Gender) student.Gender = req.body.Gender;
    if (req.body?.Email) student.Email = req.body.Email;
    if (req.body?.PhoneNumber) student.PhoneNumber = req.body.PhoneNumber;
    if (req.body?.Role) student.Role = req.body.Role;
    if (req.body?.FypStatus) student.FypStatus = req.body.FypStatus;
    if (req.body?.CommitteeRemarks) student.CommitteeRemarks = req.body.CommitteeRemarks;
    if (req.body?.SupervisorRemarks) student.SupervisorRemarks = req.body.SupervisorRemarks;
    if (req.body?.OnlineStatus) student.OnlineStatus = req.body.OnlineStatus;

    if (req.body?.Password) {
        student.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const result = await student.save();
    res.json(result);
}


const updateTeacher = async (req, res) => {
    if (!req?.body?.Email) {
        return res.status(400).json({ 'message': 'Email parameter is required.' });
    }

    const teacher = await Teacher.findOne({ Email: req.body.Email }).exec();

    if (!teacher) {
        return res.status(204).json({ "message": `No teacher matches  ${req.body.Email}.` });
    }
    if (req.body?.Name) teacher.Name = req.body.Name;
    if (req.body?.Email) teacher.Email = req.body.Email;
    if (req.body?.PhoneNumber) teacher.PhoneNumber = req.body.PhoneNumber;
    if (req.body?.Gender) teacher.Gender = req.body.Gender;
    if (req.body?.Role) teacher.Role = req.body.Role;
    if (req.body?.Designation) teacher.Designation = req.body.Designation;

    if (req.body?.Password) {
        teacher.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const result = await teacher.save();
    res.json(result);

}





//--------------------------------------------------------------


const getAllStudent = async (req, res) => {
    const students = await Student.find();
    if (!students) return res.status(204).json({ 'message': 'No Students found.' });
    try {
        res.json(students);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const getAllTeacher = async (req, res) => {

    const teachers = await Teacher.find();
    if (!teachers) return res.status(204).json({ 'message': 'No Teachers found.' });

    res.json(teachers);

}


//--------------------------------------------------------------



const addTemplate = async (req, res) => {

    var { Title, DateModified, Deadline, File } = req.body;
    if (!Title || !Deadline) return res.status(400).json({ 'message': 'Title and Deadline are required.' });

    const duplicate = await Template.findOne({ Title: Title }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newTemplate = await Template.create({ Title, DateModified, Deadline, File });
        console.log(newTemplate);

        res.status(201).json({ 'success': `New ${newTemplate} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const deleteTemplate = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const template = await Template.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No such template exists` });
    }
    const result = await template.deleteOne();
    res.json(result);
}


const updateTemplate = async (req, res) => {
    if (!req?.body?.Title) {
        return res.status(400).json({ 'message': 'Title is required.' });
    }
    const template = await Template.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No Template matches Title` });
    }
    if (req.body?.Title) template.Title = req.body.Title;
    if (req.body?.DateModified) template.DateModified = req.body.DateModified;
    if (req.body?.Deadline) template.Deadline = req.body.Deadline;
    if (req.body?.File) template.File = req.body.File;


    const result = await template.save();
    res.json(result);
}


const getAllTemplate = async (req, res) => {
    const templates = await Template.find();
    if (!templates) return res.status(204).json({ 'message': 'No Templates found.' });
    try {
        res.json(templates);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const getTemplate = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const template = await Template.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No template matches Title` });
    }
    res.json(template);
}




//--------------------------------------------------------------



const addAnnouncement = async (req, res) => {

    var { Title, Description} = req.body;
    if (!Title) return res.status(400).json({ 'message': 'Title is required.' });

    const duplicate = await Announcement.findOne({ Title: Title }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newAnnouncement = await Announcement.create({ Title, Description });
        console.log(newAnnouncement);

        res.status(201).json({ 'success': `New ${newAnnouncement} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const deleteAnnouncement = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const template = await Announcement.findOne({ Title: req.body.Title }).exec();
    if (!template) {
        return res.status(204).json({ "message": `No such announcements exists` });
    }
    const result = await template.deleteOne();
    res.json(result);
}


const updateAnnouncement = async (req, res) => {
    if (!req?.body?.Title) {
        return res.status(400).json({ 'message': 'Title is required.' });
    }
    const announcement = await Announcement.findOne({ Title: req.body.Title }).exec();
    if (!announcement) {
        return res.status(204).json({ "message": `No Announcement matches Title` });
    }
    if (req.body?.Title) announcement.Title = req.body.Title;
    if (req.body?.Description) announcement.Description = req.body.Description;


    const result = await announcement.save();
    res.json(result);
}


const getAllAnnouncement = async (req, res) => {
    const announcements = await Announcement.find();
    if (!announcements) return res.status(204).json({ 'message': 'No Announcements found.' });
    try {
        res.json(announcements);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const getAnnouncement = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const announcement = await Announcement.findOne({ Title: req.body.Title }).exec();
    if (!announcement) {
        return res.status(204).json({ "message": `No announcement matches Title` });
    }
    res.json(announcement);
}



module.exports = {
    addNewStudent, addNewTeacher, getAllStudent, getAllTeacher,
    getStudent, getTeacher, deleteStudent, deleteTeacher, updateStudent, updateTeacher,
    addTemplate, getTemplate, getAllTemplate, updateTemplate, deleteTemplate,
    addAnnouncement, getAnnouncement, getAllAnnouncement, updateAnnouncement, deleteAnnouncement
}
