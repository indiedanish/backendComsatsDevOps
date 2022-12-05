const router = require("express").Router();
const Notification = require("../model/NotificationSchema");
const StudentDB = require('../model/StudentSchema');


//add

router.post("/", async (req, res) => {

  console.log("Hii")
  const newNotification= new Notification(req.body);
  console.log(newNotification.receiverId)



  const student = await StudentDB.findOne({ _id: newNotification.receiverId });
  if (!student) {
      return res.status(204).json({ "message": `No such student exists` });
  }

  var updateStudent = await StudentDB.updateOne(
    { _id: newNotification.receiverId },
    { $push: { Notifications: newNotification } }
);

console.log("Byee")

  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:studentId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      studentId: req.params.studentId,
    }).populate({ path: 'sender', modal: 'Student'});
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
