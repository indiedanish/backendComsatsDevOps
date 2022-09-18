const Project = require('../../model/ProjectSchema');

module.exports.addProject = async (req, res) => {

    var { Name, Description, Status,  Deliverable, TeamLeader,  GroupMembers,
        GroupStatus, GroupSupervisor, GroupCoSupervisor,  GroupCommittee, Average } = req.body;
    if (!Name) return res.status(400).json({ 'message': 'Name is required.' });

    const duplicate = await Project.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newProject = await Project.create({ Name, Description, Status,  Deliverable, TeamLeader,  GroupMembers,
            GroupStatus, GroupSupervisor, GroupCoSupervisor,  GroupCommittee, Average });
        console.log(newProject);

        res.status(201).json({ 'success': `New ${newProject} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteProject = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No such project exists` });
    }
    const result = await project.deleteOne();
    res.json(result);
}


module.exports.updateProject = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }
    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }
    if (req.body?.Name) project.Title = req.body.Name;
    if (req.body?.Description) project.Description = req.body.Description;
    if (req.body?.Status) project.Status = req.body.Status;
    if (req.body?.Deliverable) project.Deliverable = req.body.Deliverable;
    if (req.body?.GroupMembers) project.GroupMembers = req.body.GroupMembers;
    if (req.body?.GroupStatus) project.GroupStatus = req.body.GroupStatus;
    if (req.body?.GroupSupervisor) project.GroupSupervisor = req.body.GroupSupervisor;
    if (req.body?.GroupCoSupervisor) project.GroupCoSupervisor = req.body.GroupCoSupervisor;
    if (req.body?.GroupCommittee) project.GroupCommittee = req.body.GroupCommittee;
    if (req.body?.Average) project.Average = req.body.Average;

    const result = await project.save();
    res.json(result);
}


module.exports.getAllProject = async (req, res) => {
    const projects = await Project.find();
    if (!projects) return res.status(204).json({ 'message': 'No Projects found.' });
    try {
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getProject = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Title` });
    }
    res.json(project);
}




//--------------------------------------------------------------





