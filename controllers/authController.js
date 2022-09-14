const Student = require('../model/StudentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//make search function



const StudentLogin = async (req, res) => {

    
   
    const { RegNo, Password } = req.body;
    
    if (!RegNo || !Password ) return res.status(400).json({ 'message': 'Username and password are required.' });

     const foundStudent = await Student.findOne({ RegNo: RegNo }).exec();

   
    if (!foundStudent) return res.sendStatus(401); //Unauthorized 
    const match = await bcrypt.compare(Password, foundStudent.Password);

       if (match) {
       const role = foundStudent.Role;
        // create JWTs
        // regno, pass, role
        // regno+pass+role = Access $dfadfsdfkhsdbfhsebfwjfbiwjefwibejfwbejfwbefjweb
        // regno+pass+role = Refresh $sefsdfssdgdsfgdfgdfgdfgdfgdfgdfg

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "RegNo": foundStudent.RegNo,
                    "Role": foundStudent.Role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '59s' }
        );
        const refreshToken = jwt.sign(
            { "RegNo": foundStudent.RegNo },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user in db
        foundStudent.RefreshToken = refreshToken;

        const result = await foundStudent.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ role, accessToken });

    } else {
        res.sendStatus(401);
    }

 
}





const TeacherLogin = async (req, res) => {


 }

module.exports = { StudentLogin , TeacherLogin};