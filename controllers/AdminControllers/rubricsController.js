const RubricsCommittee = require("../../model/RubricsCommitteeSchema");
const RubricsSupervisor = require('../../model/RubricsSupervisorSchema');

module.exports.addCommitteeRubrics = async (req, res) => {
  var { Name, Remarks, CLOs } = req.body;
 
  if (!Name || ! Remarks || !CLOs) return res.status(400).json({ message: "Wrong Evaluation Object" });

  const duplicate = await RubricsCommittee.findOne({ Name : Name }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const newRubricsCommittee = await RubricsCommittee.create({ Name, Remarks, CLOs });
    console.log(newRubricsCommittee);

    res.status(201).json({ success: `New ${newRubricsCommittee} created!` });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports.addSupervisorRubrics = async (req, res) => {
  var { Name, Remarks, CLOs } = req.body;
 
  if (!Name || ! Remarks || !CLOs) return res.status(400).json({ message: "Wrong Evaluation Object" });

  const duplicate = await RubricsSupervisor.findOne({ Name : Name }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const newRubricsSupervisor = await RubricsSupervisor.create({ Name, Remarks, CLOs });
    console.log(newRubricsSupervisor);

    res.status(201).json({ success: `New ${newRubricsSupervisor} created!` });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//--------------------------------------------------------------

module.exports.deleteCommitteeRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsCommittee.findOne({ Name: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No such Rubrics exists` });
  }
  const result = await rubrics.deleteOne();
  res.json(result);
};

module.exports.deleteSupervisorRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsSupervisor.findOne({ Name: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No such Rubrics exists` });
  }
  const result = await rubrics.deleteOne();
  res.json(result);
};

//---------------------------------------------------------------

module.exports.getCommitteeRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsCommittee.findOne({ Title: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  res.json(rubrics);
};

module.exports.getSupervisorRubrics = async (req, res) => {
  if (!req?.body?.Name)
    return res.status(400).json({ message: "Name required." });

  const rubrics = await RubricsSupervisor.findOne({ Title: req.body.Name }).exec();
  if (!rubrics) {
    return res.status(204).json({ message: `No Rubrics matches name` });
  }
  res.json(rubrics);
};



