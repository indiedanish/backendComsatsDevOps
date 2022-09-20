
var mongoose = require("mongoose");
var RubricsCommitteeSchema = new mongoose.Schema({

    
        Name: {
            type: String,
            required: true,
            unique: true,
        },

        Remarks: {
            type: String,
        },

        CLOs: [

            {
                Question: [{
                    Criteria: {
                        type: String,
                    },
                    ObtainedMarks: {
                        type: Number
                    },
                    TotalMark: {
                        type: Number
                    }

                }
                ]

            }


        ],

//     SDS: {
//         Remarks: {
//             type: String,
//         },

//         CLOs: [

//             {
//                 Question: [{
//                     Criteria: {
//                         type: String,
//                     },
//                     ObtainedMarks: {
//                         type: Number
//                     },
//                     TotalMark: {
//                         type: Number
//                     }
//                 }
//                 ]

//             }


//         ],

//     },


//     Testing: {
//         Remarks: {
//             type: String,
//         },

//         CLOs: [

//             {
//                 Question: [{
//                     Criteria: {
//                         type: String,
//                     },
//                     ObtainedMarks: {
//                         type: Number
//                     },
//                     TotalMark: {
//                         type: Number
//                     }
//                 }
//                 ]

//             }


//         ],

//     },


//     Final: {
//         Remarks: {
//             type: String,
//         },

//         CLOs: [

//             {
//                 Question: [{
//                     Criteria: {
//                         type: String,
//                     },
//                     ObtainedMarks: {
//                         type: Number
//                     },
//                     TotalMark: {
//                         type: Number
//                     }
//                 }
//                 ]

//             }


//         ],

//     },


// 
}
);

module.exports = mongoose.model("RubricsCommittee", RubricsCommitteeSchema);




