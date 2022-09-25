const TestPlanDB = require('../../model/TestPlanSchema');
const RequirementDB = require('../../model/RequirementSchema');
const ProjectDB = require('../../model/ProjectSchema');



module.exports.addTestPlan = async (req, res) => {

    var { TestPlanTitle, ProjectName, Description, DateModified, TestingRequirement, TestPass, SubmittedFile } = req.body;
    if (!TestPlanTitle || !ProjectName || !TestingRequirement ) return res.status(400).json({ 'message': 'Title and Project required.' });
    
    var Project = await ProjectDB.findOne({ Name: req.body.ProjectName });
    if (!Project) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    var TestingRequirement = await RequirementDB.findOne({ Title: TestingRequirement, ProjectName : ProjectName  });
    if (!TestingRequirement) {
        return res.status(204).json({ "message": `No Project matches Name` });
    }

    const duplicate = await TestPlanDB.findOne({ TestPlanTitle: req.body.TestPlanTitle, Project: Project._id });


    if (duplicate) return res.sendStatus(409); //Conflict 

    try {

        const newTestPlan = await TestPlanDB.create({ TestPlanTitle,ProjectName, Description, DateModified, TestingRequirement, TestPass, SubmittedFile});
        console.log(newTestPlan);

        res.status(201).json({ 'success': `New ${newTestPlan} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.getTestPlan = async (req, res) => {

    var { TestPlanTitle, ProjectName } = req.body;
    if (!TestPlanTitle || !ProjectName ) return res.status(400).json({ 'message': 'Title and Project required.' });

    const testplan = await TestPlanDB.findOne({ TestPlanTitle: TestPlanTitle, ProjectName: ProjectName });
    if (!testplan) {
        return res.status(204).json({ "message": `No testplan matches Title` });
    }
    res.json(testplan);
}

module.exports.deleteTestPlan = async (req, res) => {
    var { TestPlanTitle, ProjectName } = req.body;
    if (!TestPlanTitle || !ProjectName) return res.status(400).json({ 'message': 'Title and Project required.' });

    const testplan = await TestPlanDB.findOne({ TestPlanTitle: TestPlanTitle,ProjectName: ProjectName}).exec();
    if (!testplan) {
        return res.status(204).json({ "message": `No such testplan exists` });
    }
    const result = await testplan.deleteOne();
    res.json(result);
}

