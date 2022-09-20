const Committee = require('../../model/CommitteeSchema');
const TeacherDB = require('../../model/TeacherSchema');

module.exports.addCommittee = async (req, res) => {

    var { Name, Teacher = new Array() } = req.body;     // Committe Name and array of teacher emails
    if (!Name) return res.status(400).json({ 'message': 'Name is required.' });

    const duplicate = await Committee.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        check = new Array();
        for (var i = 0; i < Teacher.length; i++) {
            temp = await TeacherDB.findOne({ Email: Teacher[i] });
            if (!temp) {
                return res.status(204).json({ "message": `No such Teacher exists` });
            }
            check = [...check, temp]
        }

        Teacher = check


        const newCommittee = await Committee.create({ Name, Teacher });
        console.log(newCommittee);

        res.status(201).json({ 'success': `New ${newCommittee} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No such Committee exists` });
    }
    const result = await committee.deleteOne();
    res.json(result);
}


module.exports.updateCommittee = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name required.' });
    }
    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No Committee matches Name` });
    }
    if (req.body?.Name) committee.Name = req.body.Name;


    check = new Array();
    for (var i = 0; i < req.body.Teacher.length; i++) {
        temp = await TeacherDB.findOne({ Email: req.body.Teacher[i] });
        if (!temp) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        check = [...check, temp]
    }

    Teacher = check



    if (req.body?.Teacher) committee.Teacher = Teacher;

    const result = await committee.save();
    res.json(result);
}


module.exports.getAllCommittee = async (req, res) => {
    const committees = await Committee.find();
    if (!committees) return res.status(204).json({ 'message': 'No Committees found.' });
    try {
        res.json(committees);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No committee matches Name` });
    }
    res.json(committee);
}




//--------------------------------------------------------------





