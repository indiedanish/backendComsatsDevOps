const Sprint = require('../../model/SprintSchema');
const Requirement = require('../../model/RequirementSchema');
const ProjectDB = require('../../model/ProjectSchema');


module.exports.addSprint = async (req, res) => {

    var { SprintTitle, ProjectName, Description, Requirements,  StartDate, Deadline } = req.body;
    if (!ProjectName || !Deadline || !SprintTitle) return res.status(400).json({ 'message': 'Title and Deadline are required.' });

    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName }).exec();
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    const duplicate = await Sprint.findOne({ SprintTitle: req.body.SprintTitle, Project: Project._id });
   

    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newSprint = await Sprint.create({ SprintTitle, ProjectName, Description, Requirements,  StartDate, Deadline  });
        console.log(newSprint);

        res.status(201).json({ 'success': `New ${newSprint} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.deleteSprint = async (req, res) => {
    if (!req?.body?.SprintTitle) return res.status(400).json({ 'message': 'Title required.' });

    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle }).exec();
    if (!sprint) {
        return res.status(204).json({ "message": `No such sprint exists` });
    }
    const result = await sprint.deleteOne();
    res.json(result);
}

module.exports.getSprint = async (req, res) => {

    var { SprintTitle, ProjectName } = req.body;
    if (!ProjectName || !SprintTitle) return res.status(400).json({ 'message': 'Title and Deadline are required.' });



    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle }).exec();
    if (!sprint) {
        return res.status(204).json({ "message": `No sprint matches Title` });
    }
    res.json(sprint);
}

module.exports.updateSprint = async (req, res) => {
    if (!req?.body?.SprintTitle) {
        return res.status(400).json({ 'message': 'Title is required.' });
    }
    const sprint = await Sprint.findOne({ SprintTitle: req.body.SprintTitle }).exec();
    if (!sprint) {
        return res.status(204).json({ "message": `No sprint matches Title` });
    }
    //SprintTitle, ProjectName, Description, Requirements,  StartDate, Deadline
    if (req.body?.SprintTitle) sprint.SprintTitle = req.body.SprintTitle;
    if (req.body?.ProjectName) sprint.ProjectName = req.body.ProjectName;
    if (req.body?.Deadline) sprint.Deadline = req.body.Deadline;
    if (req.body?.Description) sprint.Description = req.body.Description;
    if (req.body?.StartDate) sprint.StartDate = req.body.StartDate;
    //if (req.body?.Requirements) sprint.Requirements = req.body.Requirements;



    const result = await sprint.save();
    res.json(result);
}



