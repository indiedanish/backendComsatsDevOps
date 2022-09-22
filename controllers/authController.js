const Student = require('../model/StudentSchema');
const Teacher = require('../model/TeacherSchema');
const Admin = require('../model/AdminSchema');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//make search function



const StudentLogin = async (req, res) => {

    
    const { RegNo, Password } = req.body;
    
    if (!RegNo || !Password ) return res.status(400).json({ 'message': 'RegNo and password are required.' });

     const foundStudent = await Student.findOne({ RegNo: RegNo }).exec();

   
    if (!foundStudent) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(Password, foundStudent.Password);
        
       if (match) {
       const role = foundStudent.Role;
        // create JWTs
        // regno, pass, role
        // regno+pass+role = Access $dfadfsdfkhsdbfhsebfwjfbiwjefwibejfwbejfwbefjweb
        // regno+pass+role = Refresh $sefsdfssdgdsfgdfgdfgdfgdfgdfgdfg

    
        const refreshToken = jwt.sign(
            { "Email": foundStudent.Email,
            "Role": role
        },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundStudent.RefreshToken = refreshToken;

        const result = await foundStudent.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ role, refreshToken });

    } else {
        res.sendStatus(401);
    }

 
}

const TeacherLogin = async (req, res) => {
      
    const { Email, Password } = req.body;
    
    if (!Email || !Password ) return res.status(400).json({ 'message': 'Email and password are required.' });

     const foundTeacher = await Teacher.findOne({ Email: Email }).exec();


    if (!foundTeacher) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(Password, foundTeacher.Password);
    console.log(process.env.ACCESS_TOKEN_SECRET)
       if (match) {
  

        const role = foundTeacher.isCommittee ? "2004" : "2003";


        console.log(foundTeacher.Email)
        const refreshToken = jwt.sign(
            { "Email": foundTeacher.Email,
            "Role": role

        },
           "" + process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundTeacher.RefreshToken = refreshToken;

        const result = await foundTeacher.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ role, refreshToken });

    } else {
        res.sendStatus(401);
    }



 }

 
const AdminLogin = async (req, res) => {
      
    const { Email, Password } = req.body;
    
    if (!Email || !Password ) return res.status(400).json({ 'message': 'Email and password are required.' });


     const foundAdmin = await Admin.findOne({ Email: Email }).exec();


    if ( Email != foundAdmin.Email && Password != foundAdmin.Passoword) return res.sendStatus(401); //Unauthorized 
  
      

        const refreshToken = jwt.sign(
            { "Email": foundAdmin.Email },
           "" + process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundAdmin.RefreshToken = refreshToken;

        const result = await foundAdmin.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({refreshToken });

  



 }

module.exports = { StudentLogin , TeacherLogin, AdminLogin};