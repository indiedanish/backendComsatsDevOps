const BugReportDB = require('../../model/BugReportSchema');
const RequirementDB = require('../../model/RequirementSchema');
const ProjectDB = require('../../model/ProjectSchema');



module.exports.addBugReport = async (req, res) => {

    var { BugReportTitle, ProjectName, Description, DateModified, DebuggingRequirement, SubmittedFile } = req.body;
    if (!BugReportTitle || !ProjectName || !DebuggingRequirement ) return res.status(400).json({ 'message': 'Title and Project required.' });
    
    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName });
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    var DebuggingRequirement = await RequirementDB.findOne({ Title: DebuggingRequirement, ProjectName : ProjectName  });
    if (!DebuggingRequirement) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    const duplicate = await BugReportDB.findOne({ BugReportTitle: req.body.BugReportTitle, Project: Project._id });


    if (duplicate) return res.sendStatus(409); //Conflict 

    try {

        const newBugReport = await BugReportDB.create({ BugReportTitle, ProjectName, Description, DateModified, DebuggingRequirement, SubmittedFile });
        console.log(newBugReport);

        res.status(201).json({ 'success': `New ${newBugReport} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.getBugReport = async (req, res) => {

    var { BugReportTitle, ProjectName } = req.body;
    if (!BugReportTitle || !ProjectName ) return res.status(400).json({ 'message': 'Title and Project required.' });

    const bugreport = await BugReportDB.findOne({ BugReportTitle: BugReportTitle, ProjectName: ProjectName });
    if (!bugreport) {
        return res.status(204).json({ "message": `No bugreport matches Title` });
    }
    res.json(bugreport);
}

module.exports.deleteBugReport = async (req, res) => {
    var { BugReportTitle, ProjectName } = req.body;
    if (!BugReportTitle || !ProjectName) return res.status(400).json({ 'message': 'Title and Project required.' });

    const bugreport = await BugReportDB.findOne({ BugReportTitle: BugReportTitle,ProjectName: ProjectName}).exec();
    if (!bugreport) {
        return res.status(204).json({ "message": `No such bugreport exists` });
    }
    const result = await bugreport.deleteOne();
    res.json(result);
}

