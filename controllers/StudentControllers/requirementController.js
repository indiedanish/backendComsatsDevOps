const Requirement = require('../../model/RequirementSchema');
const TeacherDB = require('../../model/TeacherSchema');
const StudentDB = require('../../model/StudentSchema');


module.exports.addRequirement = async (req, res) => {

    var { Title, Description, AssignedTo, Type, Priority, Accepted, Comments,
        File = new Array(), SubmittedFile = new Array(), DateModified, Deadline } = req.body;
    if (!Title ) return res.status(400).json({ 'message': 'Title is required.'});

    const duplicate = await Requirement.findOne({ Title: Title }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        const newRequirement = await Requirement.create({
            Title, Description, AssignedTo, Type, Priority, Accepted, Comments,
            File, SubmittedFile, DateModified, Deadline
        });
        console.log(newRequirement);

        res.status(201).json({ 'success': `New ${newRequirement} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


// module.exports.deleteCommittee = async (req, res) => {
//     if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

//     const committee = await Committee.findOne({ Name: req.body.Name }).exec();
//     if (!committee) {
//         return res.status(204).json({ "message": `No such Committee exists` });
//     }
//     const result = await committee.deleteOne();
//     res.json(result);
// }


// module.exports.updateCommittee = async (req, res) => {
//     if (!req?.body?.Name) {
//         return res.status(400).json({ 'message': 'Name required.' });
//     }
//     const committee = await Committee.findOne({ Name: req.body.Name }).exec();
//     if (!committee) {
//         return res.status(204).json({ "message": `No Committee matches Name` });
//     }
//     if (req.body?.Name) committee.Name = req.body.Name;


//     validTeachers = new Array();
//     for (var i = 0; i < req.body.Teacher.length; i++) {
//         temp = await TeacherDB.findOne({ Email: req.body.Teacher[i] });
//         if (!temp) {
//             return res.status(204).json({ "message": `No such Teacher exists` });
//         }
//         validTeachers = [...validTeachers, temp]
//     }

//     Teacher = validTeachers



//     if (req.body?.Teacher) committee.Teacher = Teacher;

//     const result = await committee.save();
//     res.json(result);
// }


// module.exports.getAllCommittee = async (req, res) => {
//     const committees = await Committee.find();
//     if (!committees) return res.status(204).json({ 'message': 'No Committees found.' });
//     try {
//         res.json(committees);
//     }
//     catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }

// module.exports.getCommittee = async (req, res) => {
//     if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

//     const committee = await Committee.findOne({ Name: req.body.Name }).exec();
//     if (!committee) {
//         return res.status(204).json({ "message": `No committee matches Name` });
//     }
//     res.json(committee);
// }




// //--------------------------------------------------------------





