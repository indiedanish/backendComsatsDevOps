const Committee = require('../../model/CommitteeSchema');

module.exports.addCommittee = async (req, res) => {

    var { Name, Teacher } = req.body;
    if (!Name) return res.status(400).json({ 'message': 'Name is required.' });

    const duplicate = await Committee.findOne({ Name: Name }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {

        const newCommittee = await Committee.create({ Name, Teacher });
        console.log(newCommittee);

        res.status(201).json({ 'success': `New ${newCommittee} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports.deleteCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No such Committee exists` });
    }
    const result = await committee.deleteOne();
    res.json(result);
}


module.exports.updateCommittee = async (req, res) => {
    if (!req?.body?.Name) {
        return res.status(400).json({ 'message': 'Name required.' });
    }
    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No Committee matches Name` });
    }
    if (req.body?.Name) committee.Name = req.body.Name;
    if (req.body?.Teacher) committee.Teacher = req.body.Teaacher;
   
    const result = await committee.save();
    res.json(result);
}


module.exports.getAllCommittee = async (req, res) => {
    const committees = await Committee.find();
    if (!committees) return res.status(204).json({ 'message': 'No Committees found.' });
    try {
        res.json(committees);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports.getCommittee = async (req, res) => {
    if (!req?.body?.Name) return res.status(400).json({ 'message': 'Name required.' });

    const committee = await Committee.findOne({ Name: req.body.Name }).exec();
    if (!committee) {
        return res.status(204).json({ "message": `No committee matches Name` });
    }
    res.json(committee);
}




//--------------------------------------------------------------





