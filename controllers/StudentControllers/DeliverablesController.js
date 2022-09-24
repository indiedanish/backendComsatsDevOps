const StudentDB = require('../../model/StudentSchema');

const DeliverableDB = require('../../model/DeliverableSchema');
const ProjectDB = require('../../model/ProjectSchema');



module.exports.addDeliverable = async (req, res) => {

    var { Title, ProjectName, File, DateModified } = req.body;
    if (!Title || !ProjectName || !File) return res.status(400).json({
        'message': 'Name of Deliverable, ProjectName and file required.'
    });
    try {

        const project = await ProjectDB.findOne({ Name: ProjectName });
        if (!project) {
            return res.status(204).json({ "message": `No Project matches Name` });
        }

        const DeliverableObj = await DeliverableDB.findOne({ Title: Title, ProjectName: ProjectName });

        if (DeliverableObj) {
            return res.status(209).json({ "message": `Record already exists` })
        };


        const newDeliverable = await DeliverableDB.create({
            Title, ProjectName, File, DateModified
        });

        var updateProject = await ProjectDB.updateOne(
            { '_id': project._id },
            { $push: { Deliverable: newDeliverable } },
        )

        res.status(201).json({ 'success': `New ${newDeliverable} created!` });


    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.updateDeliverable = async (req, res) => {

    var { Title, ProjectName, File } = req.body;
    if (!Title || !ProjectName || !File) return res.status(400).json({
        'message': 'Name of Deliverable, ProjectName and file required.'
    });

    try {
        const project = await ProjectDB.findOne({ Name: ProjectName });
        if (!project) {
            return res.status(204).json({ "message": `No Project matches Name` });
        }

        const DeliverableObj = await DeliverableDB.findOne({ Title: Title, ProjectName: ProjectName });

        if (!DeliverableObj) {
            return res.status(209).json({ "message": `Record doesn't exist` })
        };

        if (req.body?.Type) DeliverableObj.File = req.body.File;


        const result = await DeliverableObj.save();

        res.json(result);

    }

    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports.deleteDeliverable = async (req, res) => {
    var { Title, ProjectName, File } = req.body;
    if (!Title || !ProjectName) return res.status(400).json({
        'message': 'Name of Deliverable, ProjectName and file required.'
    });

    try {

        const project = await ProjectDB.findOne({ Name: ProjectName });
        if (!project) {
            return res.status(204).json({ "message": `No Project matches Name` });
        }

        const DeliverableObj = await DeliverableDB.findOne({ Title: Title, ProjectName: ProjectName });

        if (!DeliverableObj) {
            return res.status(209).json({ "message": `Record doesn't exist` })
        };

        var updateProject = await ProjectDB.updateOne(
            { '_id': project._id },
            { $pull: { Deliverable: DeliverableObj._id } },

        );

        const result = await DeliverableObj.deleteOne();
        res.json(result);

    }

    catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}


module.exports.getAllDeliverable = async (req, res) => {

    try {

        if (!req?.body?.ProjectName) { //Name of Project
            return res.status(400).json({ 'message': 'Project Name required.' });
        }
        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }
        const ProjectContent = await ProjectDB.findOne({ Name: req?.body?.ProjectName }).populate({ path: 'Deliverable' })
        res.json(ProjectContent.Deliverable);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}





module.exports.getDeliverable = async (req, res) => {
    try {
        if (!req?.body?.Title || !req?.body?.ProjectName) return res.status(400).json({ 'message': 'Title and Project Name required.' });

        const Project = await ProjectDB.findOne({ Name: req?.body?.ProjectName });

        if (!Project) {
            return res.status(209).json({ "message": `No such project exists` });
        }

        const DeliverableObj = await DeliverableDB.findOne({ Title: req?.body?.Title, ProjectName: req?.body?.ProjectName });

        if (!DeliverableObj) {
            return res.status(209).json({ "message": `Record doesn't exist` })
        };

        res.json(DeliverableObj);

    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}