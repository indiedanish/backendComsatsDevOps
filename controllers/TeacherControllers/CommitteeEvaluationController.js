const StudentDB = require('../../model/StudentSchema');
const TeacherDB = require('../../model/TeacherSchema');

const RubricsCommittee = require("../../model/RubricsCommitteeSchema");

const EvaluationCommittee = require('../../model/EvaluationCommitteeSchema');





module.exports.getCommitteeRubrics = async (req, res) => {
    if (!req?.body?.Name) //Name of Evaluation i.e Scope, SRS, SDS
        return res.status(400).json({ message: "Name required." });

    const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name }).exec();
    if (!rubrics) {
        return res.status(204).json({ message: `No Rubrics matches name` });
    }
    res.json(rubrics);
};



module.exports.AddCommitteeEvaluation = async (req, res) => {

    var { Name, Teacher, Student, Remarks, Questions } = req.body;
    //Name of Evaluation i.e SRS, SDS, Teacher Email, Student RegNo,
    // Remarks and Questions Object

    if (!Name || !Student || !Questions || !Teacher) return res.status(400).json({
        'message': 'Name of Evaluation, Student RegNo and Questions Object required.'
    });


    var Student = await StudentDB.findOne({ RegNo: req.body.Student }).exec();
    if (!Student) {
        return res.status(204).json({ "message": `No Student matches RegNo` });
    }
    var Teacher = await TeacherDB.findOne({ Email: req.body.Teacher }).exec();
    if (!Teacher) {
        return res.status(204).json({ "message": `No Teacher matches Email` });
    }

    var std = Student._id;
    var teach = Teacher._id;


    const duplicate = await EvaluationCommittee.findOne({ Name: req.body.Name, Student: std, Teacher: teach });
    console.log(duplicate)
    if (duplicate) {
        return res.status(209).json({ "message": `Record already exists` });
    }

    try {
        const newEvaluation = await EvaluationCommittee.create({ Name, Teacher, Student, Remarks, Questions });
        console.log(newEvaluation);

        var UpdateProject = await StudentDB.updateOne({ RegNo: req.body.Student }, { $push: { CommitteeEvaluation: newEvaluation } });

        res.status(201).json({ 'success': `New ${newEvaluation} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

};