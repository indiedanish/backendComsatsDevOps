const RubricsCommittee = require("../../model/RubricsCommitteeSchema");
//const RubricsCommittee = require('../../model/RubricsCommitteeSchema');

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
};
