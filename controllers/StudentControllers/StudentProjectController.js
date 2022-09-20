const Project = require('../../model/ProjectSchema');
const Student = require('../../model/StudentSchema');


module.exports.addTeamMember = async (req, res) => {

    if (!req?.body?.Name || !req.body?.Student) return res.status(400).json({
        'message': 'Name of Project and Student Object required.'
    });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    try {
        const newTeamMember = await Project.GroupMembers.create({ Student });
       // if (req.body?.Student) project.GroupMembers.Student = req.body.Student.Role;

        console.log(newTeamMember);

        res.status(201).json({ 'success': `New ${newTeamMember} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}

module.exports.updateRole = async (req, res) => {

    if (!req?.body?.Name || !req.body?.Student) return res.status(400).json({
        'message': 'Name of Project and Student Object required.'
    });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {
        const student = await Project.GroupMembers.findOne({ Student: req.body.Student }).exec();

        if (!student) return res.status(204).json({ 'message': 'No student in the project found.' });

        if (req.body?.Student) project.GroupMembers.Student.Role = req.body.Student.Role;

        const result = await project.save();
        res.json(result);


    }

}

module.exports.deleteTeamMember = async (req, res) => {
    if (!req?.body?.Name || !req.body?.Student) return res.status(400).json({
        'message': 'Name of Project and Student Object required.'
    });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    else if (project) {
        const student = await Project.GroupMembers.findOne({ Student: req.body.Student }).exec();

        if (!student) return res.status(204).json({ 'message': 'No student in the project found.' });

        const result = await student.deleteOne();
        res.json(result);

        // Check if to delete student in the Project Schema or project in the student Schema

     


    }


   
}


//--------------------------------------------------------------





