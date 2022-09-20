const RubricsCommittee = require("../../model/RubricsCommitteeSchema");
//const RubricsCommittee = require('../../model/RubricsCommitteeSchema');

module.exports.addCommitteeRubrics = async (req, res) => {
  var { Name, Remarks, CLOs } = req.body;
  console.log(Name);
  console.log(Remarks);
  console.log(CLOs);
  if (!Name)
    return res.status(400).json({ message: "Wrong Evaluation Object" });

  const duplicate = await RubricsCommittee.findOne({ Name : Name }).exec();

  console.log("Masla 00");

  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    console.log("Masla 0");
   
    const newRubricsCommittee = await RubricsCommittee.create({ Name, Remarks, CLOs });
    console.log(newRubricsCommittee);
    console.log("Masla 1");
    res.status(201).json({ success: `New ${newRubricsCommittee} created!` });

    //res.status(201).json({ 'success': `New ${newRubricsCommittee} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
