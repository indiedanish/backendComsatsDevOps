const Requirement = require('../../model/RequirementSchema');
const TeacherDB = require('../../model/TeacherSchema');
const StudentDB = require('../../model/StudentSchema');


module.exports.addRequirement = async (req, res) => {

    var { Title, Description, AssignedTo, Type, Priority, Accepted, Comments,
        File = new Array(), SubmittedFile = new Array(), DateModified, Deadline } = req.body;
    if (!Title) return res.status(400).json({ 'message': 'Title is required.' });

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


module.exports.deleteRequirement = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const reqt = await Requirement.findOne({ Title: req.body.Title }).exec();
    if (!reqt) {
        return res.status(204).json({ "message": `No such Requirement exists` });
    }
    const result = await reqt.deleteOne();
    res.json(result);
}


module.exports.updateRequirementLead = async (req, res) => {
    if (!req?.body?.Title) { //Name of Requirement
        return res.status(400).json({ 'message': 'Name required.' });
    }
    const requirement = await Requirement.findOne({ Title: req.body.Title }).exec();
    if (!requirement) {
        return res.status(204).json({ "message": `No Committee matches Name` });
    }
    if (req.body?.Description) requirement.Description = req.body.Description;

    if (req.body?.AssignedTo) { // AssignedTo = Student RegNo
        var StudentObj = await StudentDB.findOne({ RegNo: req.body.AssignedTo })
        requirement.AssignedTo = StudentObj;
    }
    if (req.body?.Type) requirement.Type = req.body.Type;
    if (req.body?.Priority) requirement.Priority = req.body.Priority;
    if (req.body?.Accepted) requirement.Accepted = req.body.Accepted;

    if (req.body?.File) requirement.File = req.body.File;
    if (req.body?.SubmittedFile) requirement.SubmittedFile = req.body.SubmittedFile;
    if (req.body?.DateModified) requirement.DateModified = req.body.DateModified;
    if (req.body?.Deadline) requirement.Deadline = req.body.Deadline;
    if (req.body?.Rename) requirement.Title = req.body.Rename;




    const result = await requirement.save();
    res.json(result);
}





module.exports.updateRequirementMember = async (req, res) => {
    if (!req?.body?.Title) { //Name of Requirement
        return res.status(400).json({ 'message': 'Name required.' });
    }
    const requirement = await Requirement.findOne({ Title: req.body.Title }).exec();
    if (!requirement) {
        return res.status(204).json({ "message": `No Committee matches Name` });
    }

    if (req.body?.Priority) requirement.Priority = req.body.Priority;
    if (req.body?.Accepted) requirement.Accepted = req.body.Accepted;

    if (req.body?.SubmittedFile) requirement.SubmittedFile = req.body.SubmittedFile;
    if (req.body?.DateModified) requirement.DateModified = req.body.DateModified;

    const result = await requirement.save();
    res.json(result);
}



module.exports.getAllRequirement = async (req, res) => {
    const requirement = await Requirement.find();
    if (!requirement) return res.status(204).json({ 'message': 'No Requirements found.' });
    try {
        res.json(requirement);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports.getRequirement = async (req, res) => {
    if (!req?.body?.Title) return res.status(400).json({ 'message': 'Title required.' });

    const requirement = await Requirement.findOne({ Title: req.body.Title }).exec();
    if (!requirement) {
        return res.status(204).json({ "message": `No requirement matches Title` });
    }
    res.json(requirement);
}




// //--------------------------------------------------------------


module.exports.addRequirementComments = async (req, res) => {

    if (!req?.body?.Title || !req?.body?.Student || !req?.body?.Content) {
        return res.status(400).json({ 'message': 'Req Title, Student RegNo and Content required.' });
    }
    const RequirementObj = await Requirement.findOne({ Title: req.body.Title }).exec();
    const StudentObj = await StudentDB.findOne({ RegNo: req.body.Student }).exec();
    if (!RequirementObj || !StudentObj) {
        return res.status(204).json({ "message": `No Requirement matches Title & No such Student` });
    }
    try {
        var AddRequirement = await Requirement.updateOne(
            { '_id': RequirementObj._id },
            { $push: { Comments: { 'Student': StudentObj, 'Content': req?.body?.Content } } },
            // false, // Upsert
            // true, // Multi
        );
        res.send(AddRequirement);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteRequirementComments = async (req, res) => {

    if (!req?.body?.Title || !req?.body?._id) {
        return res.status(400).json({ 'message': 'Req Title and Comment ID required.' });
    }
    const RequirementObj = await Requirement.findOne({ Title: req.body.Title }).exec();
    if (!RequirementObj) {
        return res.status(204).json({ "message": `No Requirement matches Title & No such Student` });
    }
    try {
        var DeleteRequirement = await Requirement.updateOne(
            { '_id': RequirementObj._id },
            { $pull: { Comments: { '_id': req?.body?._id} } },
            // false, // Upsert
            // true, // Multi
        );
        res.send(DeleteRequirement);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}




