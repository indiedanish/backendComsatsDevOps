const Project = require('../../model/ProjectSchema');
const { StudentLogin } = require('../authController');

const Student = require('../../model/StudentSchema');
const Teacher = require('../../model/TeacherSchema');
const Committee = require('../../model/CommitteeSchema');


module.exports.addProject = async (req, res) => {


    var { Name, Description, Status, Deliverable, TeamLeader, GroupMembers,
        GroupStatus, GroupSupervisor, GroupCoSupervisor, GroupCommittee, Average } = req.body;
    if (!Name) return res.status(400).json({ 'message': 'Name is required.' });

    var RegNo = TeamLeader;

    const duplicate = await Project.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        if (req.body.TeamLeader) {

            TeamLeader = await Student.findOne({ RegNo: RegNo });

            if (!TeamLeader) {
                return res.status(204).json({ "message": `No such student exists` });
            }

        }

        if (req.body.GroupSupervisor) {

            GroupSupervisor = await Teacher.findOne({ Email: GroupSupervisor });

            if (!GroupSupervisor) {
                return res.status(204).json({ "message": `No such Teacher exists` });
            }

        }

        if (req.body.GroupCoSupervisor) {
            GroupCoSupervisor = await Teacher.findOne({ Email: GroupCoSupervisor });
            if (!GroupCoSupervisor) {
                return res.status(204).json({ "message": `No such Teacher exists` });
            }

        }

        if (req.body.GroupCommittee) {
            GroupCommittee = await Committee.findOne({ Name: GroupCommittee });
            if (!GroupCoSupervisor) {
                return res.status(204).json({ "message": `No such GroupCommittee exists` });
            }

        }

        GroupMembers = TeamLeader;
        const newProject = await Project.create({
            Name, Description, Status, Deliverable, TeamLeader, GroupMembers,
            GroupStatus, GroupSupervisor, GroupCoSupervisor, GroupCommittee, Average
        });

        console.log("Hi212i")


        const project =  await Project.findOne({ Name: req.body.Name });
        if (req.body.TeamLeader) {
            const TeamLead = await Student.findOne({ RegNo: RegNo });


            if (!TeamLead) {
                console.log("Hii")
                return res.status(204).json({ "message": `No such student exists` });
            }

            var UpdateStudent = await Student.updateOne(
                { '_id': TeamLead._id },
                {  'Project': project},
            );  


        }

        res.status(201).json({ 'success': `New ${newProject} created!` });
     
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
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

    if (req.body?.TeamLeader) {

        var TeamLeader = await Student.findOne({ RegNo: req.body.TeamLeader });
        if (!TeamLeader) {
            return res.status(204).json({ "message": `No such student exists` });
        }
        project.TeamLeader = TeamLeader;

    }

    if (req.body?.GroupMembers) project.GroupMembers = [...project.GroupMembers, req.body.GroupMembers ] ;
    if (req.body?.GroupStatus) project.GroupStatus = req.body.GroupStatus;

    if (req.body?.GroupSupervisor) {
        var GroupSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupSupervisor = GroupSupervisor;

    }
    if (req.body?.GroupCoSupervisor) {
        var GroupCoSupervisor = await Teacher.findOne({ Email: req.body.GroupCoSupervisor });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such Teacher exists` });
        }
        project.GroupCoSupervisor = GroupCoSupervisor;
    }

    if (req.body?.GroupCommittee) {
        var GroupCommittee = await Committee.findOne({ Name: req.body.GroupCommittee });
        if (!GroupCoSupervisor) {
            return res.status(204).json({ "message": `No such GroupCommittee exists` });
        }
        project.GroupCommittee = GroupCommittee;
    }
    if (req.body?.Average) project.Average = req.body.Average;


    const result = await project.save();
    res.json(result);
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
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name of Project required.' });

    const project = await Project.findOne({ Name: req.body.Name }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Project matches Title` });
    }
    res.json(project);
}




//--------------------------------------------------------------





