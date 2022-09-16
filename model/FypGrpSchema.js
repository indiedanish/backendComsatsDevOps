var mongoose = require("mongoose");
var FypGrpSchema = new mongoose.Schema({

    GroupName: {
        type: String,
        required: true,
        unique: true,
    },


    Project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'

    },
   
    TeamLeader: {
        type: String,
        required: true,
    },
    GroupMembers: [
        
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
         
    ],
    GroupStatus: {  // 0 = Pending, 1 = Approved, 2 = Rejected
        type: String,
        
    },


    GroupSupervisor: {
             type: Schema.Types.ObjectId,
             ref: 'Teacher'
    },
    GroupCoSupervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'

    },
    GroupCommittee: {
        type: Schema.Types.ObjectId,
        ref: 'Committee'
    },



});
module.exports = mongoose.model("FypGrp", FypGrpSchema);





// Committee:[ {

//     Name: {

//      type: String,
//      required: true,
//      unique: true,
//      },

//      Teacher: [
//          {
//              type: Schema.Types.ObjectId,
//              ref: 'Teacher'
//          }
//      ],
     

 
// }]