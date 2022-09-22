const Project = require('../../model/ProjectSchema');
const { StudentLogin } = require('../authController');

const Student = require('../../model/StudentSchema');
const Teacher = require('../../model/TeacherSchema');
const Committee = require('../../model/CommitteeSchema');

const RubricsCommittee = require("../../model/RubricsCommitteeSchema");
const RubricsSupervisor = require('../../model/RubricsSupervisorSchema');


module.exports.getCommitteeRubrics = async (req, res) => {
    if (!req?.body?.Name) //Name of Evaluation i.e Scope, SRS, SDS
      return res.status(400).json({ message: "Name required." });
  
    const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name }).exec();
    if (!rubrics) {
      return res.status(204).json({ message: `No Rubrics matches name` });
    }
    res.json(rubrics);
  };
  
  module.exports.getSupervisorRubrics = async (req, res) => {
    if (!req?.body?.Name)//Name of Evaluation i.e Scope, SRS, SDS
      return res.status(400).json({ message: "Name required." });
  
    const rubrics = await RubricsSupervisor.findOne({ Name: req.body.Name }).exec();
    if (!rubrics) {
      return res.status(204).json({ message: `No Rubrics matches name` });
    }
    res.json(rubrics);
  };
  