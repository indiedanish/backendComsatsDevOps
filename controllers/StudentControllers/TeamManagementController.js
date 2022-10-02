const ProjectDB = require('../../model/ProjectSchema');
const StudentDB = require('../../model/StudentSchema');


module.exports.addTeamMember = async (req, res) => {

    var { Name, Student = new Array() } = req.body;
    if (!Name || !Student) return res.status(400).json({ //Teacher = new Array()
        'message': 'Name of Project and Student Array required.'
    });


    const student = await StudentDB.findOne({ RegNo: Student });


    const project = await ProjectDB.findOne({ Name: req.body.Name });
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    try {

        var astudent = await ProjectDB.updateOne(
            { '_id': project._id },
            { $push :{ GroupMembers: student } },
           
        );
    const result = await project.save();
    res.json(result);

    }
    catch (err) {
    res.status(500).json({ 'message': err.message });
}
}


module.exports.updateRole = async (req, res) => {

    if (!req?.body?.Name || !req.body?.Student || !req.body?.Role) return res.status(400).json({
        'message': 'Name of Project, RegNo of Student and Role of student required.'
    });
    const project = await ProjectDB.findOne({ Name: req.body.Name });

    if (!project) {

        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {

        const student = await StudentDB.findOne({ RegNo: req.body.Student });

        if (!student) return res.status(204).json({ 'message': 'No student in the project found.' });

        if (req.body?.Student) student.Role = req.body.Role;


        const result = await student.save();

        res.json(result);

    }
}

module.exports.deleteTeamMember = async (req, res) => {
    var { Name, Student } = req.body;
    if (!Name || !Student) return res.status(400).json({
        'message': 'Name of Project and Student RegNo required.'
    });
    const project = await ProjectDB.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {
        const student = await StudentDB.findOne({ RegNo: req.body.Student });
        var StudentID = student._id;
        console.log(StudentID)

        console.log(project.GroupMembers)

        var astudent = await ProjectDB.updateOne(
            { '_id': project._id },
            { $pull: { GroupMembers: StudentID } },
            // false, // Upsert
            // true, // Multi
        );

        res.send(astudent);

    }
}






module.exports.getTeamMembers = async (req, res) => {
    var { Name } = req.body;
    if (!Name) return res.status(400).json({
        'message': 'Name of Project required.'
    });
    const project = await ProjectDB.findOne({ Name: req.body.Name }).populate('GroupMembers')
        .populate('Requirements');


    // populate('Selected')
    //   .populate({path: 'Selected', model: 'Category',populate:{path:'EnteredCourse',model:'Course'}})

    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    res.send(project);

}
